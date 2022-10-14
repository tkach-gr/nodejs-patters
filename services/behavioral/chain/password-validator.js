import {Validator} from "./validator.js";

export class PasswordValidator extends Validator {
    validate(credentials) {
        const {login, pass} = credentials

        for(const user of this.users) {
            if (user.login === login && user.pass === pass) {
                return super.validate(credentials)
            }
        }

        throw new Error('invalid pass')
    }
}