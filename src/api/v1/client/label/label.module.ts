import { Module } from '@o-galaxy/ether/core';
import { LabelController } from './label.controller'

@Module({

    path: '/',
    controllers: [
        LabelController
    ]
}) 
export class LabelModule { }