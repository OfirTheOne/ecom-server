import { build } from '@o-galaxy/ether/common'
import { ApiModule } from './api.module';
 
export const apiRouter = build(ApiModule);