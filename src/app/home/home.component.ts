import { Component } from '@angular/core';
import { BeeService } from '../core/service/bee.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as util from 'util';
import { NotificationService } from '@bee/core/notifications/notification.service';
import {BlockUIService} from 'ng-block-ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private beeService: BeeService,
              private http: HttpClient,
              private cookieService: CookieService,
              private notificationService: NotificationService,
              private bus: BlockUIService,) {
    this.beeService.pageTitle = 'Home';
    this.bus.start("xixixixi", "hahahah");

    util.log('nihao {}');
    // util.types.isAnyArrayBuffer(this.cookieService);
    cookieService.set('mmall_login_token', '03aafbac-8a4f-467a-a18c-302c38310f25');
    const httpOptions = {
      headers: new HttpHeaders({
        'mmall_login_token' : '03aafbac-8a4f-467a-a18c-302c38310f25'
      })
    };
    this.http.get("/data/manage/product/list.do", httpOptions).subscribe((value:any) => {
      this.rowData = value.data.list;
      this.notificationService.success('数据加载成功', '远程服务');
    });
  }

  columnDefs = [
    {headerName: '商品编码', field: 'categoryId' },
    {headerName: '商品名称', field: 'name'},
    {headerName: '描述', field: 'subtitle' }
  ];

  rowData = [];

  success= ()=> {
    this.notificationService.info('数据加载成功', '远程服务');
  }

}
