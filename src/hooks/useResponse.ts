import { Response } from 'express';
import { StatusCodes } from '../type/statusCode';

type useResponse = () => {
  Error: (res: Response, statusMessage: string, status: StatusCodes, whose: WhoseError) => void;
  Json: (res: Response, status: StatusCodes, json: object) => void;
  Send: (res: Response, status: StatusCodes, send: string | boolean | number) => void;
};

type Error = (res: Response, statusMessage: string, status: StatusCodes, whose: WhoseError) => void;

type Json = (res: Response, status: StatusCodes, json: object) => void;
type Send = (res: Response, status: StatusCodes, send: string | boolean | number) => void;

export enum WhoseError {
  web = 'Web Error.',
  server = 'Server Error.',
}

const useResponse: useResponse = () => {
  const Error: Error = (res, statusMessage, status, whose) => {
    res.statusMessage = `${whose} ${statusMessage}`;
    res.status(status).end();
  };

  const Json: Json = (res, status, json) => {
    res.status(status).json(json).end();
  };

  const Send: Send = (res, status, send) => {
    res.status(status).send(send).end();
  };

  return { Error, Json, Send };
};

export default useResponse;
