import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// page routing
import { AuthRoutingModule } from './auth-routing.module';
import { ErrorsModule } from './errors/errors.module';

// otp module
import { NgOtpInputModule } from 'ng-otp-input';

// Component

import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LogoutComponent } from './logout/logout.component';
import { SuccessMsgComponent } from './success-msg/success-msg.component';


@NgModule({
  declarations: [
    LockscreenComponent,
    LogoutComponent,
    SuccessMsgComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ErrorsModule,
    NgOtpInputModule
  ]
})
export class AuthModule { }
