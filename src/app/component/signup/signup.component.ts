import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';

export function MustMatch(controlName: string, matchingControlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  signUpValid = false;
  public hidePassword = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      birthDate: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {}

  get f(): any { return this.signUpForm.controls; }

  onSubmit(): any {
    if (this.signUpForm.valid){
      console.log(this.signUpForm.value);
      const email = this.signUpForm.controls.email.value;
      this.authService.signUp(this.signUpForm.value).subscribe(
        (data: any) => {
          console.log(data);
          if (data && data.status === 201){
            this.router.navigate(['/login'], {queryParams: {email}}).then();
            console.log('Successfully Sign up.');
          }
        }, (Error: any) => {
          // Handler
        }
      );
    }
  }

}
