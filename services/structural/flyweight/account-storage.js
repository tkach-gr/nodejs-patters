import {AvatarFactory} from "./avatar-factory.js";
import {Account} from "./account.js";

export class AccountStorage {
    constructor() {
        this.storage = []
        this.avatarFactory = new AvatarFactory()
    }

    getSerializedAccounts() {
        return this.storage.map(item => ({
          nickname: item.nickname,
          avatar: item.avatar.serialize()
        }))
    }

    create(nickname, avatarName) {
        const avatar = this.avatarFactory.getAvatar(avatarName)
        const account = new Account(nickname, avatar)
        this.storage.push(account)
    }
}