import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./patient-data/patient-data.component').then(m => m.PatientDataComponent)
  },
  {
    path: 'valve-data',
    loadComponent: () =>
      import('./valve-data/valve-data.component').then(m => m.ValveDataComponent)
  },
  {
    path: 'valveList',
    loadComponent: () =>
      import('./valve-list/valve-list.component').then(m => m.ValveListComponent)
  }
];
