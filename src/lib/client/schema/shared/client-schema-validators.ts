import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

import { Client } from '../../shared/client.interfaces';
import { ClientSchemaEtat, ClientSchemaType } from './client-schema.enums';
import { ClientSchema } from './client-schema.interfaces';

export function validateOnlyOneLSE(control: FormControl, client: Client): ValidationErrors | null {
  const schemaType = control.value;
  if (schemaType !== ClientSchemaType.LSE) { return null; }

  const otherLSESchema = client.schemas.find((schema: ClientSchema) => {
    return schema.type === ClientSchemaType.LSE;
  });
  return otherLSESchema === undefined ? null : {
    onlyOneLSE: ''
  };
}

export function validateAnnee(control: FormGroup): null {
  const schemaAnneeControl = control.controls['annee'];
  const schemaAnnee = schemaAnneeControl.value;

  const schemaTypeControl = control.controls['type'];
  const schemaType = schemaTypeControl.value;

  schemaAnneeControl.updateValueAndValidity({onlySelf: true});

  const requireAnnee = [ClientSchemaType.ADO, ClientSchemaType.PLP];
  // An etat is required for schemas of type EPA
  if (!schemaAnnee && requireAnnee.indexOf(schemaType) >= 0) {
    schemaAnneeControl.setErrors({required: ''});
  }

  return null;
}

export function validateEtatEPA(control: FormGroup, client: Client): null {
  const schemaEtatControl = control.controls['etat'];
  const schemaEtat = schemaEtatControl.value;

  const schemaTypeControl = control.controls['type'];
  const schemaType = schemaTypeControl.value;

  schemaEtatControl.updateValueAndValidity({onlySelf: true});

  // An etat is required for schemas of type EPA
  if (!schemaEtat && schemaType === ClientSchemaType.EPA) {
    schemaEtatControl.setErrors({required: ''});
    return null;
  }

  // Only EPA are allowed to have an etat
  if (schemaEtat && schemaType !== ClientSchemaType.EPA) {
    schemaEtatControl.setErrors({etatRequiredByEPA: ''});
    return null;
  }

  // Only one schema with an etat of 'ENTRAI' or VALIDE' allowed per client
  const onlyOneOf = [ClientSchemaEtat.ENTRAI, ClientSchemaEtat.VALIDE];
  if (onlyOneOf.indexOf(schemaEtat) < 0) { return null; }

  const otherSchema = client.schemas.find((schema: ClientSchema) => {
    return onlyOneOf.indexOf(schema.etat) >= 0;
  });

  if (otherSchema !== undefined) {
    schemaEtatControl.setErrors({onlyOneEPA: ''});
  }

  return null;
}
