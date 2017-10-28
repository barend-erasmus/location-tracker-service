// Imports
import * as express from 'express';
import { config } from './../config';

export class HomeRouter {

    public static async index(req: express.Request, res: express.Response) {
        res.render('home');
    }
}
