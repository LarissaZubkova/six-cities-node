import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { CreateOfferRequest, OfferRdo, OfferService, ParamOfferId, UpdateOfferDto } from './index.js';
import { fillDTO } from '../../helpers/index.js';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.show});
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.delete});
    this.addRoute({path: '/:offerId', method: HttpMethod.Patch, handler: this.update});
  }

  public async show({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if(!offer) {
      throw new HttpError(
        StatusCodes.NOT_IMPLEMENTED,
        'Not implemented',
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete({params}: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    if(!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id${offerId} not found`,
        'OfferController'
      );
    }

    this.noContent(res, offer);
  }

  public async update({body, params}: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.updateById(offerId, body);

    if(!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id${offerId} not found`,
        'OfferController'
      );
    }

    this.noContent(res, fillDTO(OfferRdo, offer));
  }
}
