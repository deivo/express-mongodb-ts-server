import mongoose, { Schema, Model, Document, HookNextFunction } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../typings/jwt';
import bcrypt from 'bcryptjs';
export interface IUserDocument extends Document {
    username: string,
    password: string,
    email: string;
    avatar: string;
    generateToken: () => string
}
const UserSchema: Schema<IUserDocument> = new Schema({
    username: {
        type: String,
        required: [true, '用户名不能为空'],
        minlength: [6, '最小长度不能少于6位'],
        maxlength: [12, '最大长度不能大于12位']
    },
    password: String,
    avatar: String,
    email: {
        type: String,
        validate: {
            validator: validator.isEmail
        },
        trim: true,
    }
}, {
    timestamps: true, toJSON: {
        transform(_doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
});

UserSchema.methods.generateToken = function (): string {
    let payload: UserPayload = ({ id: this._id });
    return jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });
}
UserSchema.pre<IUserDocument>('save', async function (next: HookNextFunction) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});
UserSchema.static('login', async function (this: any, username: string, password: string): Promise<IUserDocument | null> {
    let user: IUserDocument | null = await this.model('User').findOne({ username });
    if (user) {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
            return user;
        } else {
            return null;
        }
    }
    return user;
});
interface IUserModel<T extends Document> extends Model<T> {
    login: (username: string, password: string) => IUserDocument | null
}
export const User: IUserModel<IUserDocument> = mongoose.model<IUserDocument, IUserModel<IUserDocument>>('User', UserSchema);