
import { Request, Response, NextFunction } from "express";
import { Controller, Get, Put, Post } from "@o-galaxy/ether/core";
import { LogisterHandler } from "./logister.handler";
import { LogisterValidator } from "./logister.validator";

@Controller({ path: '/logister' })
export class LogisterController {


	constructor(private logisterHandler: LogisterHandler) { }

	@Post('/', LogisterValidator.logisterBodyValidator)
	async logister(req: Request, res: Response, next: NextFunction) {
		
		try {
			const uid = res.locals.uid;
			const {email, payload} = req.body;
			const user = await this.logisterHandler.logister(uid, email, payload);
			
			return res.send({user});
		} catch (error) {
			next(error)
		}
	}


	@Post('/anon')
	async anonLogister(req: Request, res: Response, next: NextFunction) {
		try {
			const { uid } = res.locals;

			const user = await this.logisterHandler.anonLogister(uid);
			return res.send(user)
		} catch (error) {
			next(error);
		}
	}
}

