import { FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

/**
 * BeeFramework addRow/editRow/rowDetails 基础操作
 */
export interface AedBasicOperation {
  /** 返回操作 **/
  aedBreak();
  /** 重置表单操作 **/
  aedReset();
  /** 保存表单操作**/
  aedSave();
  /** 加载FormControl Value 初始化值**/
  loadControlValue();
  /** 初始化FormGroup **/
  formGroupSettings();
  /** 初始化下拉框数据 **/
  dropDownListSettings();
  /** 观察监听 FormControl **/
  watchControlSettings();
}
