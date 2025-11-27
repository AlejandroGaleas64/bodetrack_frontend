import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent as EntradasListComponent } from './entradas/list/list.component';
import { ListComponent as SalidasListComponent } from './salidas/list/list.component';

const routes: Routes = [
  {
    path: 'entradas/list',
    component: EntradasListComponent
  },
  {
    path: 'salidas/list',
    component: SalidasListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
