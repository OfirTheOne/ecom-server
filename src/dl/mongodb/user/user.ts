
export interface User {
    email:  string
    uid:    Array<string>
    profile_data: {
        first_name: string, 
        last_name: string, 
    },
    is_anon: boolean
    finish_onboarding: boolean
    notification: boolean
    device_token:  Array<string>
}


// toModel<User, typeof User>(User, 'users');
