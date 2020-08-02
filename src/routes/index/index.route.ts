import * as pizza from "@alex-sandri/pizza-utilities";
import { ClasseViva } from "@alex-sandri/classeviva-api";

pizza.ServiceWorker.register();

pizza.ServiceWorker.listen("updateready", pizza.ServiceWorker.update);

const signInForm = <HTMLFormElement>document.querySelector("form");

const uidInput = <HTMLInputElement>document.querySelector("#uid");
const pwdInput = <HTMLInputElement>document.querySelector("#pwd");

signInForm.addEventListener("submit", async e =>
{
    e.preventDefault();

    await ClasseViva.createSession(uidInput.value, pwdInput.value);
});