import { Module } from '@o-galaxy/ether/core';
import { LogisterController } from './logister.controller'

@Module({

    controllers: [
        LogisterController
    ]
}) 
export class LogisterModule { }