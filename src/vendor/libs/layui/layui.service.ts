import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayuiService {

  constructor() {
    layui.config({
      dir: 'assets/vendor/layui/',
      base: 'assets/vendor/layui-soul-table/'
    }).extend({
      soulTable: 'ext/soulTable',
      tableChild: 'ext/tableChild',
      tableMerge: 'ext/tableMerge',
      tableFilter: 'ext/tableFilter',
      excel: 'ext/excel',
    });
    window['laytable'] = layui.table;
  }

  initTableGrid(id: string, url: string, columns: any[]) {
    let options: any = {
      id: id
      ,elem: `#${id}`
      ,url: url
      ,height: 400
      ,limit: 20
      ,page: true
      ,toolbar: true
      ,cols: [columns],
      done: function() {
      }
    };
    laytable.render(options);
  }
}
