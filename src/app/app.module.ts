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

//Pipes and Services
import { AuthenticationService } from './services/authentication.service';


//Components
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    LoginComponent,
    WelcomeComponent,
    NavbarComponent
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
