import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file } = req.body; // trebuie să primească Base64 sau URL temporar

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: 'swaply_uploads',
    });

    res.status(200).json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
}
