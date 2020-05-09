import { Module } from '@o-galaxy/ether/core';

import { ClientModule } from './v1/client/client.module';
import { AdminModule } from './v1/admin/admin.module';

import { AuthHeaderGuard } from './v1/common/guards/auth-header.guard';

@Module({
    path: '/',
    guards: [
        // AuthHeaderGuard
    ],
    modules: [
        AdminModule,
        ClientModule
    ]
}) 
export class ApiModule { }