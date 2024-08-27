import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { UnSavedChanges } from './services/canDecativate/unSavedChanges';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./signin/signin.component').then((m) => m.SigninComponent),
    
  },
  {
      path:'access-denied',
      loadComponent:()=>import('./access-denied/access-denied.component').then((m)=>m.AccessDeniedComponent),
  },
  {
    path: 'signUp',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignUpComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./navbar/navbar.component').then((m) => m.NavbarComponent),
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    canMatch:[AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.component').then((m) => m.ProfileComponent),
        resolve:{'resolvedData' : AuthGuard},
        children: [
          {
            path: 'edit-profile/:id',
            loadComponent: () =>
              import('./edit-profile/edit-profile.component').then(
                (m) => m.EditProfileComponent
              ),
              canDeactivate:[UnSavedChanges],
              resolve:{'resolvedData' : AuthGuard},
          },
        ],
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./tasks/tasks.component').then((m) => m.TasksComponent),
      },
      {
        path:'pipes',
        loadComponent:()=>import('./pipes/pipes.component').then((m)=>m.PipeComponent)
      }
    ],
  },
];
