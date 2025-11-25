import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { LogoutComponent } from './logout/logout.component';
import { SuccessMsgComponent } from './success-msg/success-msg.component';

const routes: Routes = [

  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'success-msg',
    component: SuccessMsgComponent,
  },
  {
    path: 'errors', loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
