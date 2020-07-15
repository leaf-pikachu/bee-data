/**
 * BeeFramework Grid基础操作 （添加、修改、详情、查询加载）
 * @since 1.0.0 查询加载移除 扩展到其他datatables插件中
 * @see
 */
export interface GridBasicOperation {
  addRow();
  editRow(row: any);
  rowDetails(row: any);
  deletedRow(row: any);
  // loadGrid();
}
export interface GridBasicOperationSetting {
  add: OperationBtnSetting;
  edit: OperationBtnSetting;
  details: OperationBtnSetting;
  deleted: OperationBtnSetting;
}
export interface OperationBtnSetting {
  /** 提示信息 **/
  title: string;
  /** btn class **/
  btnClass: string;
  /** icon class**/
  iconClass: string
}
