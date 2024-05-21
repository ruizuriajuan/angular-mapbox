import { Routes } from '@angular/router';
import { FullScreenPageComponent } from './maps/pages/full-screen-page/full-screen-page.component';
import { ZoomRangePageComponent } from './maps/pages/zoom-range-page/zoom-range-page.component';
import { MarkersPageComponent } from './maps/pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './maps/pages/properties-page/properties-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { RecoveryPageComponent } from './auth/pages/recovery-page/recovery-page.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadComponent: () => import('./auth/layout-page.component'),
        children: [
            { path: 'login', component:LoginPageComponent },
            { path: 'register', component: RegisterPageComponent },
            { path: 'recovery', component: RecoveryPageComponent },
            { path: '**', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    {
        path: 'maps',
        loadComponent: () => import('./maps/layout-page.component'),
        children: [
            { path: 'fullscreen', component: FullScreenPageComponent},
            { path: 'zoomrange', component: ZoomRangePageComponent},
            { path: 'markers', component: MarkersPageComponent},
            { path: 'properties', component: PropertiesPageComponent},
            { path: '**', redirectTo: 'fullscreen', pathMatch: 'full' }
        ]
    },

];
