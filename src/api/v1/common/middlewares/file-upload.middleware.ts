


import { middlewareFactory } from '@o-galaxy/ether/common'

import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const storage = multer.diskStorage({ destination: 'upload-admin' })

export const UploadFile = ((fileName: string) => middlewareFactory(
    multer( { storage }).single(fileName)
)());


export const ReadFile = (localsFieldName: string) => (middlewareFactory(
    async (req, res, next) => {
        try {
            const {filename, destination}  = req.file;
            const fileBuffer = await readFileAsync(path.resolve(destination, filename));
            res.locals[localsFieldName] = fileBuffer;
            next();
            
        } catch (error) {
            return next(error);
        }
    }
)())