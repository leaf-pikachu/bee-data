import { Injectable } from '@angular/core';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { Router } from '@angular/router';
import { BeeStorageService } from '@bee/core/service/bee-storage.service';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'

import { SystemWebSocketService } from '@bee/core/websocket/system-websocket.service';
import { NotificationService } from '@bee/core/notifications/notification.service';
import { BeeHttpStatus } from '@bee/core/config/request/bee-http-status';

const defaultUser = {
  isLogin: false
};

@Injectable()
export class UserService {
  user$ = new BehaviorSubject({...defaultUser});

  constructor(
    private $http: BeeHttpService,
    private route: Router,
    private beeStorage: BeeStorageService,
    private notification: NotificationService,
    private systemWebSocket: SystemWebSocketService) {
    this.sessionUser();
  }

  get user() {
    return this.user$;
  }

  sessionUser() {
    const userInfoString = sessionStorage.getItem('USER_LOGIN_SESSION_KEY');

    if (userInfoString) {
      this.user$.next(JSON.parse(userInfoString));
    }
  }

  login(params) {
    this.$http.post('/authentication/login3', {
      loginNo: params.email,
      loginPsd: params.password
    }, true).subscribe(
      (value: any) => {

        if (value.code === BeeHttpStatus.AUTHENTICATION_FAILURE.code) {
          this.notification.warning(value.data, '登录失败');
          return;
        }

        this.user$.next({
          ...value.user,
          isLogin: true
        });

        this.beeStorage.get('USER_LOGIN_RETURNED_URL_KEY', (url: string) => {
          this.route.navigateByUrl(url || '/work').then(r => console.info(r));
        });

        this.systemWebSocket.
        crateSystemWebSocket(`/system/${value.user.rowId}`, params.email)
          .map((response: MessageEvent): string => {
          return response.data;
        }).subscribe(
          value => this.notification.info(value, '系统广播提示！')
        );
      }
    );
  }

  public logout() {
    this.user$.next({...defaultUser});
  }
}
