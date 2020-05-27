import * as env from 'dotenv';
env.config();

import "reflect-metadata";

import '../../dl/mongodb/connection-init';     // apply connection for mongo
// import '../internal/cron/job-dispatcher';   // trigger cron jobs

