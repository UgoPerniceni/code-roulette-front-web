import { ChartOptions, ChartType } from 'chart.js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../model/User';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Label } from 'ng2-charts';



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
export interface TableHeaders {
  elo: number;
  rank: number;
  gamesPlayed: number;
  gamesWon: number;
  correctCompilations: number;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  step = 0;
  hide = true;
  user: User
  formGroup: FormGroup;
  isUserUpdated = false;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource;
  sum = 0;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr: any[] = ctx.chart.data.datasets[0].data;
          dataArr.map((data: number) => {
            sum += data;
          });
          let percentage = (value * 100 / sum).toFixed(2) + "%";
          return percentage;
        },
        color: '#fff',
      }
    }
  };

  public pieChartLabels: Label[] = ['Games lost', 'Games won'];
  public pieChartData: number[] = [100, 200];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend: true;
  public pieChartColors;


  constructor(private router: Router, private userService: UserService, private formBuild: FormBuilder, private authService: AuthService) {

    this.formGroup = this.formBuild.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.email]],
      userName: [''],
      password: ['', Validators.minLength(6)],
      confirmPassword: ['', Validators.minLength(6)],
      birthDate: [''],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: User) => {
      this.user = user;
      console.log(this.user);
      const ELEMENT_DATA: TableHeaders[] = [
        { elo: user.elo, rank: 1, gamesPlayed: 2, gamesWon: 10, correctCompilations: 1 },];
      this.dataSource = ELEMENT_DATA;
    });

  }
  onSubmit(): any {
    if (this.isUserUpdated && this.formGroup.valid) {
      const updatedUser = this.getUpdatedUser();
      this.userService.updateUser(updatedUser).subscribe(
        (data: any) => {
          window.location.reload();
          this.nextStep();
        }, (Error: any) => {
          // Handler
        }
      );
    }
  }
  ngAfterViewInit(): void {
    this.formGroup.controls.firstName.setValue(this.user.firstName);
    this.formGroup.controls.lastName.setValue(this.user.lastName);
    this.formGroup.controls.email.setValue(this.user.email);
    this.formGroup.controls.birthDate.setValue(this.user.birthDate);
    this.formGroup.controls.userName.setValue(this.user.userName);

    this.pieChartData = [this.user.gamesPlayed - this.user.gamesWon, this.user.gamesWon];
    this.pieChartLabels = ['Games lost  ', 'Games won  '];
    this.pieChartColors = [{
      backgroundColor: ['rgba(200,0,0,0.3)', '#009879']
    },];
    this.onChanges();
  }

  getUpdatedUser(): User {
    const updatedUser = this.user;

    updatedUser.email = this.formGroup.controls.email.value != this.user.email
      ? this.formGroup.controls.email.value
      : this.user.email;

    updatedUser.userName = this.formGroup.controls.userName.value != this.user.userName
      ? this.formGroup.controls.userName.value
      : this.user.userName;

    updatedUser.firstName = this.formGroup.controls.firstName.value != this.user.firstName
      ? this.formGroup.controls.firstName.value
      : this.user.firstName;

    updatedUser.lastName = this.formGroup.controls.lastName.value != this.user.lastName
      ? this.formGroup.controls.lastName.value
      : this.user.lastName;
    updatedUser.birthDate = this.formGroup.controls.birthDate.value != this.user.birthDate
      ? this.formGroup.controls.birthDate.value
      : this.user.birthDate;
    //Handle password by checking if the old is correct
    return updatedUser;
  }
  onChanges(): void {
    this.formGroup.valueChanges.subscribe(val => {
      this.isUserUpdated = true;
    });
  }



}
