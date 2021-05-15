import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {SignupComponent} from './component/signup/signup.component';
import {HomeComponent} from './component/home/home.component';
import {IsConnectedGuard} from './guard/is-connected.guard';
import {PlayComponent} from './component/play/play.component';
import {EditorComponent} from './component/editor/editor.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'home', component: HomeComponent, canActivate: [IsConnectedGuard]},

  { path: 'play', component: PlayComponent, canActivate: [IsConnectedGuard]},
  { path: 'editor', component: EditorComponent, canActivate: [IsConnectedGuard]},

  // { path: '**', redirectTo: 404}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
