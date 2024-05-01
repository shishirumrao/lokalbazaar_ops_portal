import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { SecuredComponent } from './secured/secured.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [

    {
        path: '',
        redirectTo: '/u/dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        component: PublicComponent,
        children: [
            {
                path: 'sign-in',
                loadChildren: () => import('./public/auth/auth.module').then(m => m.AuthPageModule)
            }
        ],
    },

    {
        path: 'u',
        // canActivate: [AuthGuard],
        component: SecuredComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./secured/dashboard/dashboard.module').then(m => m.DashboardPageModule)
            },
            {
                path: 'master/city',
                loadChildren: () => import('./secured/masters/city-master/city-master.module').then(m => m.CityMasterPageModule)
            },
        ]
    }



];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
