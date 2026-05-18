import { inject, injectable } from 'inversify';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { ApplicationError, ExceptionFilter } from '../index.js';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../errors/validation.error.js';
import { StatusCodes } from 'http-status-codes';
import { createErrorObject } from '../../../helpers/index.js';

@injectable()
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, next: NextFunction): void {
    if(!(error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error.message}`, error);

    error.details.forEach(
      (errorField) => this.logger.warn(`[${errorField.property}] = ${errorField.messages}`)
    );

    res.status(StatusCodes.BAD_REQUEST).json(createErrorObject(ApplicationError.ValidationError, error.message, error.details));
  }
}
