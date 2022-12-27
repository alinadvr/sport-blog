import { NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";

interface userDataType {
  id: string;
  nickname: string;
  description: string;
  oldImage: string;
  image?: formidable.File;
  title?: never;
  categoryId?: never;
  text?: never;
  authorId?: never;
}

interface postDataType {
  id: string;
  title: string;
  categoryId: string;
  text: string;
  image: formidable.File;
  oldImage: string;
  authorId: string;
  nickname?: never;
  description?: never;
}

export const getFormData = (
  req: NextApiRequest,
  folder?: string
): Promise<userDataType | postDataType> => {
  const options: formidable.Options = {};
  if (folder) {
    options.uploadDir = path.join(process.cwd(), `/public/images/${folder}`);
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      // @ts-ignore
      resolve({ ...fields, ...files });
    });
  });
};
