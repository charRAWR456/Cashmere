import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent} from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { GridComponent } from './grid/grid.component';

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
    component: GridComponent
  },
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
