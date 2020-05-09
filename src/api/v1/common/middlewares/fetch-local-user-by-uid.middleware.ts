


import { middlewareFactory } from '@o-galaxy/ether/common'
import { UserRepository } from '../../../../dl/mongodb/user/user.repository';

export const FetchLocalUserByUid = middlewareFactory(
    async (req, res, next) => {

        const userRepository = new UserRepository();
        const { uid } = res.locals;
        if(uid) {
            const user = await userRepository.getUserByUid(uid)
            const userId = user._id;
            res.locals = { user, userId, ...res.locals }
        }
        return next();
    }
);
