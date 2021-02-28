"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = exports.login = exports.register = exports.validate = void 0;
const validator_1 = require("../utils/validator");
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = req.headers['authorization'];
    if (authorization) {
        const token = authorization.split(' ')[1];
        if (token) {
            try {
                const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
                const user = yield user_1.User.findById(payload.id);
                if (user) {
                    res.json({
                        success: true,
                        data: user.toJSON()
                    });
                }
                else {
                    next(new HttpException_1.default(http_status_codes_1.default.UNAUTHORIZED, `用户不合法!`));
                }
            }
            catch (error) {
                next(new HttpException_1.default(http_status_codes_1.default.UNAUTHORIZED, `token不合法!`));
            }
        }
        else {
            next(new HttpException_1.default(http_status_codes_1.default.UNAUTHORIZED, `token未提供!`));
        }
    }
    else {
        next(new HttpException_1.default(http_status_codes_1.default.UNAUTHORIZED, `authorization未提供!`));
    }
});
exports.validate = validate;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, password, confirmPassword, email, addresses } = req.body;
        const { valid, errors } = validator_1.validateRegisterInput(username, password, confirmPassword, email);
        if (!valid) {
            throw new HttpException_1.default(http_status_codes_1.default.UNPROCESSABLE_ENTITY, `参数验证失败!`, errors);
        }
        let user = new user_1.User({
            username,
            email,
            password,
            addresses
        });
        let oldUser = yield user_1.User.findOne({ username: user.username });
        if (oldUser) {
            throw new HttpException_1.default(http_status_codes_1.default.UNPROCESSABLE_ENTITY, `用户名重复!`);
        }
        yield user.save();
        let token = user.generateToken();
        res.json({
            success: true,
            data: { token }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { username, password } = req.body;
        let user = yield user_1.User.login(username, password);
        if (user) {
            let token = user.generateToken();
            res.json({
                success: true,
                data: {
                    token
                }
            });
        }
        else {
            throw new HttpException_1.default(http_status_codes_1.default.UNAUTHORIZED, `登录失败`);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const uploadAvatar = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    let { userId } = req.body;
    let domain = process.env.DOMAIN || `${req.protocol}://${req.headers.host}`;
    let avatar = `${domain}/uploads/${req.file.filename}`;
    yield user_1.User.updateOne({ _id: userId }, { avatar });
    res.send({ success: true, data: avatar });
});
exports.uploadAvatar = uploadAvatar;
//# sourceMappingURL=user.js.map