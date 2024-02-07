import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from '@/shared/routes';
import AppError from '@/shared/errors/AppError';
import uploandsConfig from '@/config/uploands';
import Logger from '@/utils/wisntonLogger';
import swaggerUI from 'swagger-ui-express'
import swaggerDoc from '@/swagger.json';
import rateLimiter from '@/shared/http/middlewares/rateLimeter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use('/files', express.static(uploandsConfig.directory));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(routes);

app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  };
  Logger.error(`[ERROR] ${request.method} - ${request.url} -  ${error}`);
  return response.status(500).json({
    status: 'error',
    message: `Internal server error ${error}`
  });
});

app.listen(3333, () => {
  Logger.info(`Server running on port ${process.env.PORT}`);
  Logger.info(`Swagger running on port http://localhost:${process.env.PORT}/api-docs/`);
});