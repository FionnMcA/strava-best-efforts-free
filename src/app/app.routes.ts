import { CanMatchFn, Routes, UrlTree } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthService } from './shared/services/auth.service';
import { inject } from '@angular/core';

const resultsCanMatch: CanMatchFn = (routes, segments) => {
    const authService = inject(AuthService)
    const accessToken = authService.token;
    if(accessToken){
        return true;
    }
    return authService.goToStravaAuthPage() as unknown as UrlTree | false;
}

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        title: 'Login',
    }, 
    {
        path: 'callback',
        component: CallbackComponent,
        title: 'Callback'
    },
    {
        path: 'results',
        loadComponent: () => import('./results/results.component').then(mod => mod.ResultsComponent),
        canMatch: [resultsCanMatch],
        title: 'Results'
    }
];
