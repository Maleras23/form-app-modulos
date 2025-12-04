import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Person {
  gender: 'M' | 'F';
  wantNotificaitions: boolean;
}

@Component({
  selector: 'app-switches-page.component',
  standalone: false,
  templateUrl: './switches-page.component.html',
  styles: ``,
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup;

  public person: Person = {
    gender: 'F',
    wantNotificaitions: false,
  }

  constructor( private fb: FormBuilder){
    this.myForm = this.fb.group({
      gender: ['M', [Validators.required] ],
      wantNotifications: [ true, [Validators.required] ],
      termsAndConditions: [ false, [Validators.requiredTrue]]
    })
  }
  ngOnInit(): void {
    this.myForm.reset( this.person)
  }

  isValidField( field: string ): boolean | null{
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  onSave(){
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return
    }
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;

    this.myForm.reset({
      gender: 'M',
      wantNotifications: true,
      termsAndConditions: false,
    })
    return;
  }

}
