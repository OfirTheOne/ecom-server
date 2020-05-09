import { NextFunction, Request, Response } from 'express';
import { LogRepository } from '../dl/mongodb/logs/log.repository';
// import {}

const logRepository = new LogRepository()
export async function errorMiddleware(error: any, request: Request, response: Response, next: NextFunction) {
	const status = error.status || 500;
	const message = Array.isArray(error) ? 
		error.map(e => e.message).join('\n') : 
		(error.message || 'Something went wrong');
	try {
		await logRepository.updateStatusAndResponse(response.locals.logId, status, message);


		let logResponse = {
			status,
			message,
			logId: response.locals.logId
		};

		// remove error message in production
		if (process.env.NODE_ENV == 'production') {
			delete logResponse.message;
		}

		response
			.status(status)
			.send(logResponse)
	} catch (err) {
		response.status(err.status).send(err);
	}

}
