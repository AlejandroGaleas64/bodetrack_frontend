import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralRoutingModule } from './general-routing.module';
import { ListComponent } from './cargos/list/list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    ListComponent
  ]
})
export class GeneralModule { }
