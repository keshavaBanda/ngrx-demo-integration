import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { IUser } from "../../core/models/user.model";

export function duplicateEmailValidator(
  getUsers: () => IUser[],
  getCurrentUserId: () => string | number | undefined
): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.value) {
      return null;
    }

    const email = control.value.trim().toLowerCase();

    const duplicate = getUsers().some(user => {

      const isCurrentUser =
        getCurrentUserId() !== undefined &&
        user.id === getCurrentUserId();

      return !isCurrentUser &&
        user.email.trim().toLowerCase() === email;
    });

    return duplicate
      ? { duplicateEmail: true }
      : null;
  };
}
