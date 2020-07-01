import { EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import { isBoolean } from "ts-util-is";

import { isNullOrEmpty } from '@bee/config/utils/string-utils';
import { FormControlSupport } from '@bee/config/settings/form-control-support';
import { AedBasicOperation } from '@bee/config/interfaces/aed-basic-operation';
import { BeeOperationType } from '@bee/config/settings/bee-operation-type';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { BeeFormSecurity } from '@bee/config/security/bee-form-security';

/**
 * BeeFramework addRow / editRow / rowDetails setting
 * Basic Setting:
 *  Setup 1 Override formGroupSettings()
 *  Setup 2 Override dropDownListSettings()
 *  Setup 3 Override watchControlSettings()
 * Other Setting:
 *  Custom Setting
 *  @see AedSupport
 */
export abstract class AedSupport extends FormControlSupport implements AedBasicOperation , OnInit{
  @Input('type') operationType: BeeOperationType;

  @Input('rowId')private _rowId: string | number;
   get rowId() {return isNullOrEmpty(this._rowId) ? 0 : this._rowId}
   set rowId(rowId: string | number) {this._rowId = rowId}

  @Output('returnFn') returnFn: EventEmitter<AedReturn> = new EventEmitter<AedReturn>();

  aeFG: FormGroup;

  // 添加保存成功之后是否返回到Grid页面 （默认true）
  addSaveIsReturn = true;

  // 修改的数据
   editValue: {[key: string]: any};
   returnFresh: boolean = false;

  /**
   * @param $http
   * @param loadInfoUrl
   * @param saveUrl
   */
  protected constructor(public $http: BeeHttpService, public loadInfoUrl: string, public saveUrl: string) {
    super();
  }
  /**
   * 子类可以重写
   * **/
  ngOnInit(): void {
    this.initAED();
  }
  /***
   * 初始化AED控件
   */
   initAED() {
    //初始话FormGroup
    this.formGroupSettings();
    //初始化下拉列表数据
    this.dropDownListSettings();
    //加载初始值
    this.loadControlValue();
    //执行监听
    this.watchControlSettings();
  }
  /**
   * 执行返回，携带数据信息
   */
  aedBreak() {
    this.returnFn.emit({operationType: this.operationType, refresh: this.returnFresh});
  }
  /***
   * fcValue
   * FormControl 设置初始值以及是否禁用表单
   * @param value 默认值
   * @param disableEdit 是否允许编辑
   */
   fcValue(value: any, disableEdit: boolean = false) {
    let disabled = true;
    //是否允许编辑
    if (this.operationType === BeeOperationType.ADD || (this.operationType === BeeOperationType.EDIT && !disableEdit)) {
      disabled = false;
    }
    //返回执行数据
    return {value: value, disabled: disabled}
  }
  /**
     *
     * @param formGroup
     * @param value
     */
  initControlValue(formGroup: FormGroup, value: {[p: string]: any }) {
    this.editValue = BeeFormSecurity.bindValueToFormGroup(value, formGroup);

    this.watchControlSettings();
    // for (let key in value) {
    //
    //   if (formGroup.controls[key] != null) {
    //     formGroup.controls[key].setValue(value[key]);
    //     this.editValue = {...this.editValue, [key]: value[key]};
    //   }
    //
    // }
  }
  /**
   * 加载表单的初始数据**/
  loadControlValue() {

    if (BeeOperationType.ADD != this.operationType)
      this.$http.get(this.loadInfoUrl, this.getInfoParams(), true).subscribe(value => this.initControlValue(this.aeFG, value));

  }
  /**
   * 重置表单**/
  aedReset(formNg: FormGroupDirective) {
    formNg.resetForm();
  }
  /**
   * 获取初始表单数据参数: {rowId: '', .....}**/
   getInfoParams() {
    return {rowId: this.rowId};
  }
  /**
   * 提交后台的数据**/
   aedSaveParams(formNg: FormGroupDirective) {
    let params = {rowId: this.rowId || null, ...this.editValue,...formNg.value};

    console.info('转换前数据：', params);

    for (let key in params) {

      if (isBoolean(params[key])) {
        params[key] = params[key]? 't':'f';
      }

    }

    console.info('转换后数据：', params);

    return params;
  }
  /**
   * 提交数据**/
  aedSave(formNg: FormGroupDirective) {

    if (this.allowSave(formNg)) {
      this.$http.post(this.saveUrl, this.aedSaveParams(formNg), true).subscribe(
        (value: any) => {
          this.returnFresh = true;
          this.editValue = this.aedSaveParams(formNg);

          if (BeeOperationType.ADD === this.operationType) {
            this.rowId = value.rowId;
            this.$http.notification.success('数据添加成功！');
            if (this.addSaveIsReturn) this.aedBreak();
          } else if (BeeOperationType.EDIT === this.operationType) {
            this.$http.notification.success('数据修改成功！');
          }

        }
      )
    }
  }

  /**
   * 是否允许执行保存操作
   * Tips: 检验表单是否验证通过-值是否发生变更
   * @param formNg
   */
  allowSave(formNg: FormGroupDirective): boolean {
    return formNg.valid && formNg.touched && BeeFormSecurity.checkFormValueChange(this.editValue, formNg.value);
  }

  //region 子类必须要重写的方法
  /**
   * 初始化FormGroup
   * */
  abstract formGroupSettings();
  /**
   * 初始化下拉列表数据
   * */
  abstract dropDownListSettings();
  /**
   * 执行监听的操作
   * */
  abstract watchControlSettings();
  //endregion
}

/**
 * BeeFramework aed 返回数据
 */
export interface AedReturn {
  operationType: BeeOperationType;
  refresh: boolean;
}
