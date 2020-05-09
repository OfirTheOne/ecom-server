
import { Guardian, NotUndefined, NotNull, NotEmpty } from '@o-galaxy/guardian';

export class LogisterValidator {

    static get logisterBodyValidator() {
        const guardian = new Guardian();
        
        guardian.on({ 
            path: 'email', 
            errorMessage: 'email field in required.'
        }).add([
            NotUndefined(),
            NotNull(),
            NotEmpty()
        ])

        return guardian.toMiddleware('req.body')
    } 
}