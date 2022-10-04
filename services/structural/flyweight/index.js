import {AccountStorage} from "./account-storage.js";

export class FlyweightService {
    constructor() {
        this.accountStorage = new AccountStorage()
    }

    getSerializedAccounts() {
        return this.accountStorage.getSerializedAccounts()
    }

    create(nickname, avatarName) {
        this.accountStorage.create(nickname, avatarName)
    }
}