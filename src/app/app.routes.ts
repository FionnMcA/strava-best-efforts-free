import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { ResultsComponent } from './results/results.component';

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
        component: ResultsComponent,
        title: 'Results'
    }
];
