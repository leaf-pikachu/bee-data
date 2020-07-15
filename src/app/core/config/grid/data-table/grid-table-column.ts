import { TableColumn } from '@swimlane/ngx-datatable';

export interface GridTableColumn extends TableColumn{
  /**
   * 是否显示此列
   */
  showColumn?: boolean;
  /**
   * 是否禁止操作此列
   */
  disableChange?: boolean;
}
