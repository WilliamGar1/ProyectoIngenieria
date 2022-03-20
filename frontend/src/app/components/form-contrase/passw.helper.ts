import { Injectable }    from '@angular/core';

export function esContraseñaValida(contra: string):boolean {
    let contraValida = false;
      'use strict';

const CONTRA_REGEX =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*/]).{8,}$/;

      if (contra.match(CONTRA_REGEX)){
        contraValida = true;
      }
    return contraValida;
}