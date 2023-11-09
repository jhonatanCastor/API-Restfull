import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth"

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  respose: Response,
  next: NextFunction
): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.')
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      uid: sub,
    }

    return next();
  } catch {
    throw new AppError("Invalid JWT Token")
  }
}