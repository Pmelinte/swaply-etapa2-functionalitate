import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry, something went wrong: ${error.message}` })
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

apiRoute.use(upload.single('image'))

apiRoute.post((req: any, res: NextApiResponse) => {
  const { category, title } = req.body
  const imagePath = `/uploads/${req.file.filename}`
  
  // aici ai putea salva într-o bază SQLite sau JSON simplu
  // exemplu rapid: console.log({ category, title, imagePath })

  res.status(200).json({ message: 'Object added', data: { category, title, imagePath } })
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false,
  },
}
