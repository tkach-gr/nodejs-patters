import {Form} from "./form.js";

export class MediatorService {
    constructor() {
        this.form = new Form()
    }

    getState() {
        return this.form.getState()
    }

    updateState(login, pass, rememberMe) {
        this.form.updateState(login, pass, rememberMe)
    }

    resetState() {
        this.form.resetForm()
    }
}