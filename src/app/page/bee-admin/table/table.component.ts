import { Component, OnInit } from '@angular/core';
import { GridSupport } from '@bee/core/config/grid/grid-support';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import {BeeOperationType} from '@bee/core/config/settings/bee-operation-type';

@Component({
  selector: 'bee-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends GridSupport {
  constructor($http: BeeHttpService) {
    super($http, '', '');
    this.operationType = BeeOperationType.ADD;
  }

  initColumns() {
  }


  ngOnInit(): void {
  }

}
