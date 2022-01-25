import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../verifyAuthToken';


dotenv.config();
const TOKEN = process.env.TOKEN_FOR_TESTING;

describe('Test verifyAuthToken function', () => {
  const next = () => {};
  beforeEach(function () {
    spyOn(jwt, 'verify');
  });

  it('expect jwt.verify to be called', () => {
    const mockRequest = {
        headers: {
            authorization: TOKEN,
        }
    };

    verifyAuthToken(mockRequest as Request, {} as Response, next);
    expect(jwt.verify).toHaveBeenCalled();
  });
});
