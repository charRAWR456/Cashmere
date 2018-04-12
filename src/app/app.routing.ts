import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent} from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { GridComponent } from './grid/grid.component';
import { SignupComponent } from './signup/signup.component';
import { ModalComponent } from './modal/modal.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationGuard } from './services/authentication-guard.service'

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'grid',
    component: GridComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'modal',
    component: ModalComponent
  },
  {
    path: 'profile',
    component: ProfileComponent, canActivate: [AuthenticationGuard]
  }

];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
