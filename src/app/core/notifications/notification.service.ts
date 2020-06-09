import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalConfig } from 'ngx-toastr/toastr/toastr-config';

import { NotificationType } from '@bee/core/notifications/notification-type';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly globalToastrConfig: GlobalConfig;

  constructor(private toast: ToastrService) {
    this.globalToastrConfig = this.toast.toastrConfig;
  }

  public success = (msg: string, title?: string)=> {
    this.toast.toastrConfig= this.globalToastrConfig;
    this.toast.toastrConfig.autoDismiss = true;
    this.toast.toastrConfig.progressBar = true;
    this.toast.toastrConfig.enableHtml = true;
    this.toast.toastrConfig.newestOnTop = true;
    this.toast.toastrConfig.preventDuplicates = false;//预防重复
    this.toast.toastrConfig.resetTimeoutOnDuplicate = false; //重复是否重置超时时间
    this.toast.toastrConfig.closeButton = false;//是否显示关闭按钮
    this.custom(NotificationType.TOASTR_SUCCESS, msg, title);
  };

  public info = (msg: string, title?: string)=> {
    this.custom(NotificationType.TOASTR_INFO, msg, title, null);

  };

  public warning = (msg: string, title?: string)=> {
    this.custom(NotificationType.TOASTR_WARNING, msg, title, null);

  };

  public error = (msg: string, title?: string)=> {
      this.custom(NotificationType.TOASTR_ERROR, msg, title, null);
  };

  /**
   * 自定义提示类型
   * @param type
   * @param msg
   * @param title
   * @param operation
   * @see https://github.com/scttcper/ngx-toastr
   */
  private custom = (type: string, msg: string, title: string, operation?:{}) => {
    this.toast[type](msg, title, operation);
  }
}

