import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./patient-data/patient-data.component').then(m => m.PatientDataComponent)
  }
];
