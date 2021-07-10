import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';

import { ClipboardModule } from '@angular/cdk/clipboard';

import { PlayComponent } from './component/play/play.component';
import { EditorComponent } from './component/editor/editor.component';
import { AdminComponent } from './component/admin/admin.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ExerciseComponent } from './component/play/exercises/exercise/exercise.component';
import { ProfileComponent } from './component/profile/profile.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { RankComponent } from './component/rank/rank.component';
import { LobbyComponent } from './component/lobby/lobby.component';
import { LobbyDialogComponent } from './component/lobby/lobby-dialog-create/lobby-dialog.component';
import { LobbyDialogJoinComponent } from './component/lobby/lobby-dialog-join/lobby-dialog-join.component';
import { GameComponent } from './component/play/games/game/game.component';
import { ExercisesComponent } from './component/play/exercises/exercises.component';
import { GamesComponent } from './component/play/games/games.component';
import { CompilationDialogComponent } from './component/play/games/game/compilation-dialog/compilation-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PlayComponent,
    EditorComponent,
    AdminComponent,
    ExerciseComponent,
    ProfileComponent,
    NotFoundComponent,
    RankComponent,
    LobbyComponent,
    LobbyDialogComponent,
    LobbyDialogJoinComponent,
    GameComponent,
    ExercisesComponent,
    GamesComponent,
    CompilationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    CodemirrorModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatExpansionModule,
    ClipboardModule,
    ChartsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http);
}
