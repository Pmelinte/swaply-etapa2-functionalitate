import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configurăm destinația unde vor fi salvate imaginile
const upload = multer({ dest: 'uploads/' });

export const config = {
  api: {
    bodyParser: false, // Dezactivăm bodyParser pentru Multer
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    upload.single('file')(req as any, res as any, (err: any) => {
      if (err) {
        res.status(500).json({ error: 'Upload failed', details: err.message });
        return reject(err);
      }
      res.status(200).json({ message: 'File uploaded successfully', file: req.file });
      return resolve();
    });
  });
}
