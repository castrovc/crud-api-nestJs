import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(message: string, statusCode?: HttpStatus, ok: boolean = false) {
    console.log(statusCode);
    const finalStatusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    super({ ok, message, status: finalStatusCode }, finalStatusCode);
  }
}
