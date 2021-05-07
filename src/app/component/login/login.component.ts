import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  public hidePassword = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }

  onSubmit(): any {
    if (this.form.valid){
      this.authService.login(this.form.value).subscribe(
        (data: any) => {
          if (data && data.status === 201){
            this.router.navigateByUrl('/').then();
            console.log('Successfully logged.');
          }
        }, (Error: any) => {
          // Handler
        }
      );
    }
  }


}
