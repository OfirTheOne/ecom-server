
import { guardToMiddleware } from '@o-galaxy/ether/common/convert/guard-to-middleware'
import { AuthTokenVerificationGuard } from '../guards/auth-token-verification.guard';


export const AuthTokenVerification = guardToMiddleware(AuthTokenVerificationGuard)