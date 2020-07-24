import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import { AuthenticationRoutingModule } from '@bee/page/authentication/authentication-routing.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, EmailConfirmComponent, LockScreenComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
