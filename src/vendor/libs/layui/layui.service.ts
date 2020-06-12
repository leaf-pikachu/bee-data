import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayuiService {

  private _laydate: Layui.ILayDateStatic;
  get laydate() {
    return this._laydate;
  }
  constructor() {
    // 构建使用模块
    // layui.use('laydate', )
  }
}
