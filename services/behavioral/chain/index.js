import {LoginValidator} from "./login-validator.js";
import {PasswordValidator} from "./password-validator.js";

export class ChainService {
    constructor() {
        const users = [
            {
                login: 'user',
                pass: '123456',
            },
            {
                login: 'admin',
                pass: 'qwerty',
            },
        ]

        this.validator = new LoginValidator(users)
        this.validator.setNext(new PasswordValidator(users))
    }

    login(credentials) {
        const isValid = this.validator.validate(credentials)
        if (!isValid) {
            return false
        }

        return true
    }
}