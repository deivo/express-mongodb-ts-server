import HttpException from "../exceptions/HttpException";
import { Request, Response, NextFunction } from "express";
import statusCodes from "http-status-codes";
const errorMiddleware = (
    error: HttpException,
    _request: Request,
    response: Response,
    _next: NextFunction
) => {
    response.status(error.status || statusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: error.message,
        errors: error.errors,
    });
};
export default errorMiddleware;