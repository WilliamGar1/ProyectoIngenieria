import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(g: FormGroup) {
    return g.get('passw').value === g.get('passw2').value ? null : { 'mismatch': true };
}