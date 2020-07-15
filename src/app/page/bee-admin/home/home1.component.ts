import {AfterViewInit, Component, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { BlockUIService } from 'ng-block-ui';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from '@bee/core/notifications/notification.service';
import { BeeService } from '@bee/core/service/bee.service';
import UUIDClass from 'uuidjs';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html'
})
export class Home1Component implements OnInit, AfterViewInit{

  constructor(private beeService: BeeService,
              private http: HttpClient,
              private cookieService: CookieService,
              private notificationService: NotificationService,
              private bus: BlockUIService) {
    this.beeService.pageTitle = 'Home';
    this.bus.start("xixixixi", "hahahah");
  }

  ngAfterViewInit(): void {
    // this.layuiService.initTableGrid(this.gridTableId, 'https://soultable.saodiyang.com/back/poetry/dataGrid',
    //   [
    //     {type: 'checkbox', fixed: 'left'},
    //     {field: 'title', title: '诗词', fixed:'left', width: 200, sort: true, filter: true},
    //     {field: 'dynasty', title: '朝代',fixed: 'left', width: 100, sort: true, filter: true},
    //     {field: 'author', title: '作者', width: 165 , filter: true},
    //     {field: 'content', title: '内容', width: 123, filter: true},
    //     {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
    //     {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
    //     {field: 'createTime', title: '录入时间', width: 165,fixed:'right',  filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
    //   ]);

  }
  ngOnInit(): void {

  }

  gridTableId = UUIDClass.generate();
  table: Layui.ITableStatic;


  columnDefs = [
    {headerName: '商品编码', field: 'categoryId' },
    {headerName: '商品名称', field: 'name'},
    {headerName: '描述', field: 'subtitle' }
  ];

  rowData = [];

  success= ()=> {
    layer.open({
      title: '在线调试'
      ,content: '可以填写任意的layer代码'
    });
    //
    // this.beeEvents.ext();
    // this.beeEvents.eot();
    // console.log('check status data: {}', JSON.stringify(this.table.checkStatus('table1')
    // ));

    // layer.msg("ceshichengogn");
    // laydate.render({
    //   elem: '#shijian'
    // })
    // layui-o.laydate.render({
    //   elem: '#shijian'
    // });
    // this.notificationService.info('数据加载成功', '远程服务');

    // layui.use(['form', 'table','soulTable'], function () {
    //   var table = layui.table,
    //     soulTable = layui.soulTable,
    //     form = layui.form;
    //
    //   table.render({
    //     id: 'table1'
    //     ,elem: '#table1'
    //     ,url: 'https://soultable.saodiyang.com/back/poetry/dataGrid'
    //     ,height: 400
    //     ,limit: 20
    //     ,page: true
    //     ,cols: [[
    //       {type: 'checkbox', fixed: 'left'},
    //       {field: 'title', title: '诗词', fixed:'left', width: 200, sort: true, filter: true},
    //       {field: 'dynasty', title: '朝代',fixed: 'left', width: 100, sort: true, filter: true},
    //       {field: 'author', title: '作者', width: 165 , filter: true},
    //       {field: 'content', title: '内容', width: 123, filter: true},
    //       {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
    //       {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
    //       {field: 'createTime', title: '录入时间', width: 165,fixed:'right',  filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
    //     ]]
    //     ,done: function () {
    //       soulTable.render(this)
    //     }
    //   });
    //
    //   //监听排序事件
    //   table.on('sort(test)', function(obj) { //注：sort 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    //     console.log(obj.field); //当前排序的字段名
    //     console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
    //     console.log(this); //当前排序的 th 对象
    //
    //     //尽管我们的 table 自带排序功能，但并没有请求服务端。
    //     //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
    //     table.reload('idTest', {
    //       initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。
    //       , where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
    //         field: obj.field //排序字段
    //         , order: obj.type //排序方式
    //       }
    //     });
    //
    //     layer.msg('服务端排序。order by ' + obj.field + ' ' + obj.type);
    //   });
    //   form.on('submit(search)', function (data) {
    //     table.reload('table1', {
    //       where: data.field
    //     })
    //   })
    // })

  }

}
