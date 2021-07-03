import { GameSaloonComponent } from './component/play/game-saloon/game-saloon.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { IsConnectedGuard } from './guard/is-connected.guard';
import { PlayComponent } from './component/play/play.component';
import { EditorComponent } from './component/editor/editor.component';
import { AdminComponent } from './component/admin/admin.component';
import { IsAdminGuard } from './guard/is-admin.guard';
import { ExerciseComponent } from './component/play/exercises/exercise/exercise.component';
import { ProfileComponent } from './component/profile/profile.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { RankComponent } from './component/rank/rank.component';
import { LobbyComponent } from './component/lobby/lobby.component';
import { GameComponent } from './component/play/games/game/game.component';
import { ExercisesComponent } from './component/play/exercises/exercises.component';
import { GamesComponent } from './component/play/games/games.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'home', component: HomeComponent, canActivate: [IsConnectedGuard] },

  { path: 'play', component: PlayComponent, canActivate: [IsConnectedGuard] },

  { path: 'play/exercises', component: ExercisesComponent, canActivate: [IsConnectedGuard] },
  { path: 'play/exercise/:id', component: ExerciseComponent, canActivate: [IsConnectedGuard] },

  { path: 'play/games', component: GamesComponent, canActivate: [IsConnectedGuard] },
  { path: 'play/game/:id', component: GameComponent, canActivate: [IsConnectedGuard] },

  { path: 'play/game-saloon/:id', component: GameSaloonComponent, canActivate: [IsConnectedGuard] },

  { path: 'editor', component: EditorComponent, canActivate: [IsConnectedGuard] },

  { path: 'lobby', component: LobbyComponent, canActivate: [IsConnectedGuard] },

  { path: 'rank', component: RankComponent, canActivate: [IsConnectedGuard] },

  { path: 'profile', component: ProfileComponent, canActivate: [IsConnectedGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [IsAdminGuard] },

  { path: 'not-found', component: NotFoundComponent, canActivate: [IsConnectedGuard] },
  { path: '**', redirectTo: '/not-found' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
