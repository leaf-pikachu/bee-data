import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BeeService } from '@bee/core/service/bee.service';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { GridSupport } from '@bee/core/config/grid/grid-support';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: [
    './icon.component.scss'
  ]
})
export class IconComponent extends GridSupport{
  @ViewChild('moduleIconTemplate', {static: true})
  moduleIconTemplate: TemplateRef<any>

  constructor(private beeService: BeeService, $http: BeeHttpService) {
    super($http, '/admin/module/icons', '');
    this.beeService.pageTitle = '系统Icons';
    this.gridSupportInstance = this;
  }

  initColumns() {
    this.columns = [{
      name: 'Type',
      prop: 'type',
      showColumn: true,
      sortable: true

    }, {
      name: 'Icon Code',
      prop: 'code',
      showColumn: true,
      sortable: true
    }, {
      name: 'Icon',
      prop: 'code',
      sortable: false,
      showColumn: true,
      cellTemplate: this.moduleIconTemplate
    }];
  }
}
