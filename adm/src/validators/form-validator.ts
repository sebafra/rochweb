import { FormControl } from '@angular/forms';

export class FormValidator {

   static isValidMailFormat(control: FormControl){
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        // if (!EMAIL_REGEXP.test(control.value))) {
        //     return { "Please provide a valid email": true };
        // }
        return EMAIL_REGEXP.test(control.value) ? null : {
          isValidMailFormat: {
            valid: false
          }
        };

        //return null;
    }
   static isValidPasswordFormat(control: FormControl){
        let PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

        return PASSWORD_REGEXP.test(control.value) ? null : {
          isValidPasswordFormat: {
            valid: false
          }
        };

        //return null;
    }

}
