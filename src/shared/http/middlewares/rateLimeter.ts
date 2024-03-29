import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@/shared/errors/AppError';
import Redis from 'ioredis';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {

  try {
    await limiter.consume(request.ip as string);

    return next();
  } catch (err) {
    throw new AppError('Too many requests', 429);
  };
};
