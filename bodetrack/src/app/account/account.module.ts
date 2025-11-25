import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

// Page Route
import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';

// Component
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
