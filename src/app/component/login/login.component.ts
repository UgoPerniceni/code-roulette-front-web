import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid = false;
  public hidePassword = true;

  public credentialsInvalid = false;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.route.queryParams.subscribe( params => {
      console.log(params);
      this.form.controls.email.setValue(params.email);
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
        }, (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.snackBar.open('Credentials incorrect !', 'OK');
            this.form.reset();
          } else {
            this.snackBar.open('Server error ' + error.status, 'OK');
          }
        }
      );
    }
  }


}
