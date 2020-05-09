import { LogModel } from './log.model';
import { Request, Response, response } from 'express';

export class LogRepository {



	/**
	 * Gets relevant data from the request, creates a new log on db , saves the id on locals
	 *
	 * @param {string} logId
	 * @param {number} status
	 * @param {string} [error]
	 * @returns {void}
	 * @throws {MongoErrorException}
	 * @memberof LogController
	 */
	public async create(req: Request, res: Response) {
		const user = res.locals.uid;
		const route = req.path;
		const http = req.method;
		const body = req.body ? JSON.stringify(req.body) : undefined;
		const query = req.query ? JSON.stringify(req.query) : undefined;

		const newLog = new LogModel({
			user, route, http, body, query, platform: res.locals.platform, version: res.locals.appVersion, timezone: res.locals.appTimezone
		});

		try {
			const savedLog = await newLog.save();
			res.locals.logId = savedLog._id.toString();
			return;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Set status and error to a existing log.
	 *
	 * @param {string} logId
	 * @param {number} status
	 * @param {string} [error]
	 * @returns {void}
	 * @throws {MongoErrorException}
	 * @memberof LogController
	 */
	public async updateStatusAndResponse(logId: string, status: number, error?: string, error_custom_code?: number) {
		const respError = error ? JSON.stringify(error) : undefined;
		try {
			await LogModel.findOneAndUpdate({ _id: logId },
				{
					$set: {
						resp_status: status,
						error: respError,
						error_custom_code,
						hasError: true
					}
				});
			return;
		} catch (error) {
			throw error;
		}
	}

}
