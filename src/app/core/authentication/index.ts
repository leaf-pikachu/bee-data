import {UserService} from '@bee/core/authentication/user.service';
import {LoginGuard} from '@bee/core/authentication/login.guard';

export const authentications = [
  UserService,
  LoginGuard
];
