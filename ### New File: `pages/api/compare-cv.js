import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { openai } from '../../lib/openai'; // Assuming you have an OpenAI client set up

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: 'File upload failed' });
            }

            const cvFile = files.cv[0];
            const cvText = await readFile(cvFile.filepath); // Function to read the CV file content

            const comparison = await compareWithJobOffer(cvText, fields.jobOfferId); // Function to compare CV with job offer

            res.status(200).json({ comparison });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

const readFile = async (filepath) => {
    // Implement file reading logic here
};

const compareWithJobOffer = async (cvText, jobOfferId) => {
    // Implement comparison logic using OpenAI API
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content: `Compare the following CV with the job offer ID ${jobOfferId}: ${cvText}` },
        ],
    });

    return response.data.choices[0].message.content;
};

export default handler;
