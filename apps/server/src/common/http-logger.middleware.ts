import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLogger implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(request: Request, response: Response, next: NextFunction) {
    const { ip, originalUrl, method } = request;
    const userAgent = request.get('user-agent') || '';

    request.on('finish', () => {
      const { statusCode, statusMessage } = response;

      const message = `${method} - ${originalUrl} - ${statusCode} - ${statusMessage} - ${userAgent} - ${ip}`;

      if (statusCode >= 500) {
        this.logger.error(message);
      } else {
        this.logger.log(message);
      }
    });

    next();
  }
}
