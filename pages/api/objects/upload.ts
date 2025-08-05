import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const chunks: Uint8Array[] = [];
    for await (const chunk of req) {
      chunks.append(chunk as Uint8Array);
    }
    const buffer = Buffer.concat(chunks);
    const base64Data = `data:image/jpeg;base64,${buffer.toString('base64')}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(base64Data, {
      folder: 'swaply',
    });

    res.status(200).json({ url: uploadResponse.secure_url });
  } catch (err) {
    res.status(500).json({ error: 'Upload to Cloudinary failed' });
  }
}
