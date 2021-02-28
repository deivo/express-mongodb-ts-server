"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterInput = void 0;
const validator_1 = __importDefault(require("validator"));
const validateRegisterInput = (username, password, confirmPassword, email) => {
    let errors = {};
    if (username == undefined || validator_1.default.isEmpty(username)) {
        errors.username = "用户名不能为空";
    }
    if (password == undefined || validator_1.default.isEmpty(password)) {
        errors.password = "密码不能为空";
    }
    if (confirmPassword == undefined || validator_1.default.isEmpty(confirmPassword)) {
        errors.password = "确认密码不能为空";
    }
    if (!validator_1.default.equals(password, confirmPassword)) {
        errors.confirmPassword = "确认密码和密码不相等";
    }
    if (email == undefined || validator_1.default.isEmpty(password)) {
        errors.email = "邮箱不能为空";
    }
    if (!validator_1.default.isEmail(email)) {
        errors.email = "邮箱格式必须合法";
    }
    return { errors, valid: Object.keys(errors).length == 0 };
};
exports.validateRegisterInput = validateRegisterInput;
//# sourceMappingURL=validator.js.map