import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators'

@Component({
  selector: 'app-register-page.component',
  standalone: false,
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {

  public myForm: FormGroup;

  constructor( private fb: FormBuilder){
    this.myForm = this.fb.group({
      name: ['', [ Validators.required, Validators.pattern( customValidators.firstNameAndLastnamePattern)] ],
      email: ['', [ Validators.required, Validators.pattern( customValidators.emailPattern ) ] ],
      username: ['', [ Validators.required, customValidators.cantBeStrider ] ],
      password: ['', [ Validators.required, Validators.minLength(6) ] ],
      password2: ['', [ Validators.required ] ],
    })
  }

  inValidField ( field: string ){
    // todo: obtener validacion desde un serviciob
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched();
  }

}
