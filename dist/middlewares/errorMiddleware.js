"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const errorMiddleware = (error, _request, response, _next) => {
    response.status(error.status || http_status_codes_1.default.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: error.message,
        errors: error.errors,
    });
};
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map