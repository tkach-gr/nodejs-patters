import {Mediator} from "./mediator.js";
import {Input} from "./input.js";
import {Switch} from "./switch.js";
import {Button} from "./button.js";

export class Form extends Mediator {
    constructor() {
        super()

        this.loginInput = new Input(this)
        this.passInput = new Input(this)
        this.rememberMeSwitch = new Switch(this)
        this.resetButton = new Button(this)

        this.onUpdateForm()
    }


    notify(sender, event) {
        if (sender === this.loginInput) {
            if (event === 'input') {
                this.onUpdateForm()
            }
        } else if (sender === this.passInput) {
            if (event === 'input') {
                this.onUpdateForm()
            }
        } else if (sender === this.rememberMeSwitch) {
            if (event === 'input') {
                this.onUpdateForm()
            }
        } else if (sender === this.resetButton) {
            if (event === 'click') {
                this.onResetButtonClick()
            }
        }
    }

    onResetButtonClick() {
        this.loginInput.value = ''
        this.passInput.value = ''
        this.rememberMeSwitch.value = false

        this.onUpdateForm()
    }

    onUpdateForm() {
        const validValue = this.loginInput.value
            || this.passInput.value
            || this.rememberMeSwitch.value

        this.resetButton.isDisabled = !validValue
    }

    getState() {
        return {
            login: this.loginInput.value,
            pass: this.passInput.value,
            rememberMe: this.rememberMeSwitch.value,
            isResetDisabled: this.resetButton.isDisabled,
        }
    }

    updateState(login, pass, rememberMe) {
        this.loginInput.input(login)
        this.passInput.input(pass)
        this.rememberMeSwitch.input(rememberMe)
    }

    resetForm() {
        this.resetButton.click()
    }
}