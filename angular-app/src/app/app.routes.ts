import { Routes } from '@angular/router';
import { authGuard, adminGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },
  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'empresa/info',
        loadComponent: () => import('./components/company/company-info/company-info.component').then(m => m.CompanyInfoComponent)
      },
      {
        path: 'empresa/ubicacion',
        loadComponent: () => import('./components/company/location/location.component').then(m => m.LocationComponent)
      },
      {
        path: 'empleados',
        loadComponent: () => import('./components/employees/employee-list/employee-list.component').then(m => m.EmployeeListComponent),
        canActivate: [adminGuard]
      },
      {
        path: 'empleados/nuevo',
        loadComponent: () => import('./components/employees/employee-form/employee-form.component').then(m => m.EmployeeFormComponent),
        canActivate: [adminGuard]
      },
      {
        path: 'empleados/mi-historial',
        loadComponent: () => import('./components/employees/my-history/my-history.component').then(m => m.MyHistoryComponent)
      },
      {
        path: 'empleados/:id',
        loadComponent: () => import('./components/employees/employee-detail/employee-detail.component').then(m => m.EmployeeDetailComponent),
        canActivate: [adminGuard]
      },
      {
        path: 'empleados/:id/editar',
        loadComponent: () => import('./components/employees/employee-form/employee-form.component').then(m => m.EmployeeFormComponent),
        canActivate: [adminGuard]
      },
      {
        path: 'contactos',
        loadComponent: () => import('./components/contacts/contacts.component').then(m => m.ContactsComponent)
      },
      {
        path: 'admin/usuarios',
        loadComponent: () => import('./components/admin/user-management/user-management.component').then(m => m.UserManagementComponent),
        canActivate: [adminGuard]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
