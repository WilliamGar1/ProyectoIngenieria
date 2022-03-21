import { FormGroup } from '@angular/forms';

export function passwordMatchValidator(g: FormGroup) {
    return g.get('passw').value === g.get('passw2').value ? null : { 'mismatch': true };
}

export function esContraValida(contra: string): boolean {
    let contraValida = false;
    'use strict';

    const CONTRA_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*/]).{8,}$/;

    if (contra.match(CONTRA_REGEX)) {
        contraValida = true;
    }
    return contraValida;
}