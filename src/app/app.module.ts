//MODULES
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Pipes and Services
import { AuthenticationService } from './services/authentication.service';

import * as firebase from 'firebase/app';

//Components
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routing } from './app.routing';
import { GameComponent } from './game/game.component';
import { EnemyComponent } from './enemy/enemy.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    LoginComponent,
    WelcomeComponent,
    NavbarComponent,
    GameComponent,
    EnemyComponent,
    SignupComponent,
    ModalComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Routing,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
