import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators'
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page.component',
  standalone: false,
  templateUrl: './register-page.component.html',
  styles: ``,
})
export class RegisterPageComponent {

  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidatorService
  ){
    this.myForm = this.fb.group({
      name: ['', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern)] ],
      // email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ], [ new EmailValidator() ] ],
      email: ['', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ], [ this.emailValidator ] ],
      username: ['', [ Validators.required, this.validatorsService.cantBeStrider ] ],
      password: ['', [ Validators.required, Validators.minLength(6) ] ],
      password2: ['', [ Validators.required ] ],
    }, {
      validators: [ this.validatorsService.isfieldOneEqualFieldTwo('password', 'password2')]
    }
  )};

  isValidField ( field: string ){
    return this.validatorsService.isvalidField(this.myForm, field);
  }

  onSubmit(): void {
    this.myForm.markAllAsTouched();
  }

}
