import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccessControlGuard } from './shared/guards/accesscontrol.service';

export const ROUTES: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AccessControlGuard]},
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
