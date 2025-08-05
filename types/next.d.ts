import type { File } from 'multer';

declare module 'next' {
  interface NextApiRequest {
    file?: File;
    files?: File[];
  }
}
