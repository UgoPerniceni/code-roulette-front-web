import { ChartOptions, ChartType } from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/User';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  step = 0;
  hide = true;
  user: User;
  formGroup: FormGroup;
  dataSource;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr: any[] = ctx.chart.data.datasets[0].data;
          dataArr.map((data: number) => {
            sum += data;
          });
          return (value * 100 / sum).toFixed(2) + '%';
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

  constructor(private router: Router, private userService: UserService, private formBuild: FormBuilder) { }

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: User) => {
      this.user = user;
      console.log(this.user);

      this.formGroup = this.formBuild.group({
        firstName: [user.firstName],
        lastName: [user.lastName],
        email: [user.email, [Validators.email]],
        userName: [user.userName],
        password: ['', Validators.minLength(6)],
        confirmPassword: ['', Validators.minLength(6)],
        birthDate: [user.birthDate],
      }, {
        validator: MustMatch('password', 'confirmPassword')
      });


      this.pieChartData = [this.user.gamesPlayed - this.user.gamesWon, this.user.gamesWon];
      this.pieChartLabels = ['Games lost  ', 'Games won  '];
      this.pieChartColors = [{
        backgroundColor: ['rgba(200,0,0,0.3)', '#009879']
      },];
    });

  }
  onSubmit(): any {
    if (this.formGroup.valueChanges && this.formGroup.valid) {
      const updatedUser: User = this.formGroup.value;
      updatedUser.id = this.user.id;

      console.log(updatedUser);

      this.userService.updateUser(updatedUser).subscribe(
        (_: any) => {
          this.nextStep();
        }, (Error: any) => {
          // Handler
        }
      );
    }
  }

}
