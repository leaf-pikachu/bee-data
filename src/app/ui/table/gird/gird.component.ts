import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild }  from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { swalDeleteSureSetting } from '@bee/core/config/bee-config';
import { GridTableColumn } from '@bee/core/config/grid/data-table/grid-table-column';
import { TableColumn } from '@swimlane/ngx-datatable';
import { GridSupport } from '@bee/core/config/grid/grid-support';

@Component({
  selector: 'bee-gird',
  templateUrl: './gird.component.html',
  styleUrls: ['./gird.component.scss']
})
export class GirdComponent implements OnInit {
  @ViewChild('operationTemplate', { static: true }) operationTemplate: TemplateRef<any>;
  @Input() gridSupportInstance: GridSupport;
  @Input('moreOperation') moreOperationTemplate: ContextMenuComponent;
  tableColumns: TableColumn[] = [];
  gridTableColumns: GridTableColumn[] = [];

  ngOnInit(): void {
    if (!this.gridSupportInstance) {
      console.error('gridSupportInstance: GridSupport 请提供对应的实例');
    }
    this.initColumn();
  }

  /**
   * 初始化显示列
   */
  initColumn() {
    if (this.gridSupportInstance.columns) {
      this.gridTableColumns = this.gridSupportInstance.columns.concat({
        name: '操作',
        canAutoResize: false,
        draggable: false,
        cellTemplate: this.operationTemplate,
        resizeable: false,
        sortable: false,
        width: 130,
        showColumn: true,
        disableChange: true
      });
      // this.gridSupportInstance.columns.forEach(gridTableColumn => this.gridTableColumns.push(gridTableColumn));

      // this.gridTableColumns.push({
      //   name: '操作',
      //   canAutoResize: false,
      //   draggable: false,
      //   cellTemplate: this.operationTemplate,
      //   resizeable: false,
      //   sortable: false,
      //   width: 130,
      //   showColumn: true,
      //   disableChange: true
      // });

      this.gridTableColumns.forEach(gridTableColumn => {
        if (gridTableColumn.showColumn) {
          this.tableColumns.push(gridTableColumn);
        }
      });
    }
  }

  /**
   * 删除提示弹框配置
   * @param row
   */
  deletedConfirm(row: any) {
    return swalDeleteSureSetting;
  }

}
