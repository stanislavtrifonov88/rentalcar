import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { CarRentalSystemError } from '../exceptions/carRental-system.error';

@Catch(CarRentalSystemError)
export class CarRentalSystemErrorFilter implements ExceptionFilter {
  public catch(exception: CarRentalSystemError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.code).json({
      status: exception.code,
      error: exception.message,
    });
  }
}
