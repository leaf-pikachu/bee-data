/**
 * BeeFramework addRow/editRow/rowDetails 基础操作
 */
import { FormGroup, NgForm } from '@angular/forms';

export interface AedBasicOperation {
  /** 返回操作 **/
  aedBreak();
  /** 重置表单操作 **/
  aedReset(formNg: NgForm);
  /** 保存表单操作**/
  aedSave(formNg: NgForm);
  /** 加载FormControl Value 初始化值**/
  loadControlValue();
  /** 初始化FormGroup **/
  formGroupSettings();
  /** 初始化 FormControl Value 值**/
  initControlValue(formGroup: FormGroup,value:  {[key: string]: any});
  /** 初始化下拉框数据 **/
  dropDownListSettings();
  /** 观察监听 FormControl **/
  watchControlSettings();
}
