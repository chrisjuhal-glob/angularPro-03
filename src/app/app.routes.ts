import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'issues',
        loadComponent: () => import('./modules/issues/pages/issue-list/issue-list')
    },
    {
        path: 'issue/:number',
        loadComponent: () => import('./modules/issues/pages/issue-page/issue-page')
    },
    {
        path: '**',
        redirectTo: 'issues'
    }
];
