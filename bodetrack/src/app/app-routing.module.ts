import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { LayoutComponent } from './layouts/layout.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Rutas protegidas - requieren autenticación
  { 
    path: '', 
    component: LayoutComponent, 
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuard]
  },
  
  // Rutas de autenticación - NO requieren autenticación
  { 
    path: 'auth', 
    component: AuthlayoutComponent, 
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  
  // Ruta wildcard - redirige a la raíz (que está protegida)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
