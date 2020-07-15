import {Component, TemplateRef, ViewChild} from '@angular/core';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { GridSupport } from '@bee/core/config/grid/grid-support';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent extends GridSupport {

  @ViewChild('moduleIconTemplate', {static: true})
  moduleIconTemplate: TemplateRef<any>

  constructor(beeHttpService: BeeHttpService) {
    super(beeHttpService, 'admin/module/loadGrid', '');
  }

  initColumns() {
    this.columns = [{
      name: '模块级别',
      prop: 'moduleLevel',
      sortable: true,
      showColumn: false,
      disableChange: true
    }, {
      name: '系统名称',
      prop: 'systemRowId',
      sortable: false,
      showColumn: true,
    }, {
      name: '上级模块',
      prop: 'parentModuleRowId',
      sortable: false,
      showColumn: true
    }, {
      name: '模块英文名称',
      prop: 'enName',
      showColumn: true,
      sortable: false
    }, {
      name: '模块中文名称',
      prop: 'chName',
      showColumn: true,
      sortable: false
    }, {
      name: 'Icon',
      prop: 'icon',
      sortable: false,
      showColumn: true,
      cellTemplate: this.moduleIconTemplate
    }, {
      name: '主模块',
      prop: 'mainModule',
      sortable: false,
      showColumn: true
    }, {
      name: '菜单显示',
      prop: 'showModule',
      sortable: false,
      showColumn: true
    }];
  }
}
