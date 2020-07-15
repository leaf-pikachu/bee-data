import { AfterViewInit, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { isBoolean } from "ts-util-is";
import { isNullOrEmpty } from '@bee/core/config/utils/string-utils';
import { FormControlSupport } from '@bee/core/config/settings/form-control-support';
import { AedBasicOperation } from '@bee/core/config/interfaces/aed-basic-operation';
import { BeeOperationType } from '@bee/core/config/settings/bee-operation-type';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { BeeFormSecurity } from '@bee/core/config/security/bee-form-security';
import { BeeFormElement, ElementState } from '@bee/ui/form/bee-form-element';

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
export abstract class AedSupport extends FormControlSupport implements AedBasicOperation , OnInit, AfterViewInit{

  @Input('type') operationType: BeeOperationType;
  @Input('rowId')private _rowId: string | number;
  get rowId() {return isNullOrEmpty(this._rowId) ? 0 : this._rowId}
  set rowId(rowId: string | number) {this._rowId = rowId}
  @Output('returnFn') returnFn: EventEmitter<AedReturn> = new EventEmitter<AedReturn>();

  // region 表单元素处理
  /**
   * FormGroup 表单数据控制器
   */
  aeFG: FormGroup = new FormGroup({});
  formElements: BeeFormElement[];
  formElementStates: {[key: string]: ElementState} = {};
  // endregion

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

  setFormElement(elements: BeeFormElement[], options?: AbstractControlOptions | { [p: string]: any } | null) {
    this.formElements = elements;
  }

  setFormElementState(elementStates: ElementState[]) {
    for (let element of elementStates) {
      element.elementGroup = this.aeFG;
      this.formElementStates[element.key] = element;
    }
  }

  /**
   * 子类可以重写
   * **/
  ngOnInit(): void {
    this.initAED();
  }

  /**
   * 页面元素初始化结束 执行的相关动作
   */
  ngAfterViewInit(): void {

    //执行监听
    this.watchControlSettings();
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

  }

  /***
   * fcValue
   * FormControl 设置初始值以及是否禁用表单
   * @param value 默认值
   * @param disableEdit 是否允许编辑
   */
  formState(value: any, disableEdit: boolean = false) {
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
  }

  setElementWatch(elementKey: string, watchFn: (value: any) => void) {
    this.watchControl(this.aeFG.controls[elementKey], watchFn);
  }
  /**
   * 加载表单的初始数据**/
  loadControlValue() {
    if (BeeOperationType.ADD != this.operationType) {
      this.$http
        .get(this.loadInfoUrl, this.getInfoParams(), true)
        .subscribe(value => BeeFormSecurity.bindValueToFormGroup(value, this.aeFG));
    }
  }

  /**
   * 执行返回，携带数据信息
   */
  aedBreak() {
    this.returnFn.emit({operationType: this.operationType, refresh: this.returnFresh});
  }

  /**
   * 重置表单**/
  aedReset() {
    this.aeFG.reset();
  }
  /**
   * 获取初始表单数据参数: {rowId: '', .....}**/
  getInfoParams() {
    return {rowId: this.rowId};
  }

  /**
   * 提交后台的数据**/
  aedSaveParams() {
    let params = {rowId: this.rowId || null, ...this.editValue,...this.aeFG.value};

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
  aedSave() {

    if (this.allowSave()) {
      this.$http.post(this.saveUrl, this.aedSaveParams(), true).subscribe(
        (value: any) => {
          this.returnFresh = true;
          this.editValue = this.aedSaveParams();

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
   */
  allowSave(): boolean {
    return this.aeFG.valid && this.aeFG.touched && BeeFormSecurity.checkFormValueChange(this.editValue, this.aeFG.value);
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
