import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './auth/auth.routes';
import { LoginComponent } from './auth/pages/login/login.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import ('./auth/auth.routes').then((r) => r.AUTH_ROUTES)
    },
    {
        path: 'inicio',
        loadChildren: () => import ('./content/content.routes').then((r) => r.CONTENT_ROUTES)
    },
    {
        path: '',
        redirectTo : 'auth',
        pathMatch: 'full'
    }
];
