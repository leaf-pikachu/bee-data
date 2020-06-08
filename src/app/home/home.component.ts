import { Component } from '@angular/core';
import { BeeService } from '../core/bee.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as util from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private beeService: BeeService, private http: HttpClient, private cookieService: CookieService) {
    this.beeService.pageTitle = 'Home';

    util.log('nihao {}');
    util.types.isAnyArrayBuffer(this.cookieService)
    cookieService.set('mmall_login_token', '025923f0-8c4e-4557-9685-168c49e412ae');
    const httpOptions = {
      headers: new HttpHeaders({
        'mmall_login_token' : '025923f0-8c4e-4557-9685-168c49e412ae'
      })
    };
    this.http.get("/data/manage/product/list.do", httpOptions).subscribe((value:any) => {
      this.rowData = value.data.list;
    })
  }

  columnDefs = [
    {headerName: '商品编码', field: 'categoryId', width:'30%' },
    {headerName: '商品名称', field: 'name', width:'40%' },
    {headerName: '描述', field: 'subtitle', width:'30%' }
  ];

  rowData = [];


}
