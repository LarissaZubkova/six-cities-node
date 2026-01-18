import 'reflect-metadata';
import { Container } from 'inversify';
import { createRestApplicationContainer, RestApplication } from './rest/index.js';
import { Component } from './shared/types/index.js';

async function bootstrap() {
  const appContainer = Container.merge(createRestApplicationContainer());

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  application.init();
}

bootstrap();
