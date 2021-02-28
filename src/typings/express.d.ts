import { IUserDocument } from "../models/user";
declare global {
    namespace Express {
        export interface Request {
            currentUser?: IUserDocument | null;
            file: Multer.File
        }
    }
}