import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'match',
    pathMatch: 'full',
  },
  {
    path: 'match',
    loadComponent: () => import('./match/match.page').then( m => m.MatchPage)
  },
  {
    path: 'match-stats',
    loadComponent: () => import('./match-stats/match-stats.page').then( m => m.MatchStatsPage)
  },
];
