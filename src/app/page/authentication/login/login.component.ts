import { Component } from '@angular/core';
import { BeeService } from '@bee/core/service/bee.service';

@Component({
  selector: 'bee-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private appService: BeeService) {
    this.appService.pageTitle = 'Login v3 - Pages';
  }

  credentials = {
    email: '',
    password: '',
    rememberMe: false
  };


}
