export class Validator {
    constructor(users) {
        this.next = null
        this.users = users
    }

    setNext(next) {
        this.next = next

        return this
    }

    validate(credentials) {
        if (this.next) {
            return this.next.validate(credentials)
        }

        return true
    }
}