import {Avatar} from "./avatar.js";

export class AvatarFactory {
    constructor() {
        this._storage = new Map()
    }

    getAvatar(name) {
        const match = this._storage.get(name)
        if (match) {
            return match
        }

        // retrieve a heavy file from system
        const avatar = new Avatar(name)

        this._storage.set(name, avatar)
        return avatar
    }
}