import { ValidatorFn,AbstractControl,ValidationErrors } from "@angular/forms";
export const passwordValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pass = control.get('pass');
    const passConfirm = control.get('passConfirm');
    if(pass&&passConfirm) return (pass.value === passConfirm.value) ? null : { identityRevealed: true }
    return null
  };