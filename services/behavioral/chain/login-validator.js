import {Validator} from "./validator.js";

export class LoginValidator extends Validator {
    validate(credentials) {
        const {login} = credentials
        for(const user of this.users) {
            if (user.login === login) {
                return super.validate(credentials)
            }
        }

        throw new Error('invalid login')
    }
}