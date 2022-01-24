import express from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization || '';
    const token = authorizationHeader.split(' ')[1];
    // eslint-disable-next-line no-unused-vars
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET || '');
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

export default verifyAuthToken;
