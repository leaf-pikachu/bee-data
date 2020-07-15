import { Component, OnInit } from '@angular/core';
import {AedSupport} from '@bee/core/config/aed/aed-support';
import {BeeHttpService} from '@bee/core/service/bee-http.service';
import {BeeDictionaryConstantService} from '@bee/core/service/bee-dictionary-constant.service';
import {FormBuilder} from '@angular/forms';
import {BeeOperationType} from '@bee/core/config/settings/bee-operation-type';
import {BeeRequired} from '@bee/core/config/validator/bee-required';
import {UniversalValidators} from 'ngx-validators';

@Component({
  selector: 'bee-module-aed',
  templateUrl: './module-aed.component.html',
  styleUrls: ['./module-aed.component.scss']
})
export class ModuleAedComponent extends AedSupport {

  constructor($http: BeeHttpService, private ct: BeeDictionaryConstantService, private fb: FormBuilder) {
    super($http, '/system/module/loadInfo', '/admin/module/save');
    this.operationType = BeeOperationType.ADD;
  }

  formGroupSettings() {
    this.setFormElementState(
      [
        {
          key: 'orderNum',
          title: '排序号',
          formState: this.formState(null, false),
          placeholder: '请填写排序号...',
          validatorOrOpts: [BeeRequired.requiredFlag, UniversalValidators.isNumber]
        } , {
        key: 'systemRowId',
        title: '所属系统',
        formState: this.formState(null, false),
        bindLabel: 'chName',
        bindValue: 'rowId',
        items: [{chName: 'bee-admin', rowId: 10000}],
        validatorOrOpts: BeeRequired.requiredSelect()
      } , {
        key: 'moduleLevel',
        title: '模块级别',
        formState: this.formState(null, true),
        items: [{text: '一级模块', id: 1}, {text: '二级模块', id: 2}, {text: '三级模块', id: 3}],
        validatorOrOpts:  [BeeRequired.requiredSelect(), UniversalValidators.isNumber]
      } , {
        key: 'parentModuleRowId',
        title: '上级模块',
        formState: this.formState(null, true),
        validatorOrOpts:  [BeeRequired.requiredSelect(), UniversalValidators.isNumber]
      } , {
        key: 'enName',
        title: '英文名',
        formState: this.formState(null, true),
        validatorOrOpts:  [BeeRequired.requiredSelect(), UniversalValidators.maxLength(150)]
      } , {
        key: 'chName',
        title: '中文名',
        formState: this.formState(null, true),
        validatorOrOpts:  [BeeRequired.requiredSelect(), UniversalValidators.maxLength(150)]
      } , {
        key: 'icon',
        title: '菜单Icon',
        formState: this.formState(null, true),
        validatorOrOpts:  [BeeRequired.requiredSelect(), UniversalValidators.maxLength(50)]
      } , {
        key: 'serviceUrl',
        title: 'Service Url',
        formState: this.formState(null, true),
        validatorOrOpts:  [BeeRequired.requiredFlag, UniversalValidators.maxLength(50)]
      } , {
        key: 'clientUrl',
        title: 'Client Url',
        formState: this.formState(null, true),
        validatorOrOpts:  [BeeRequired.requiredFlag, UniversalValidators.maxLength(50)]
      } , {
        key: 'listPageType',
        title: 'Grid页面显示方式',
        formState: this.formState(null, true),
        validatorOrOpts:  [BeeRequired.requiredSelect()],
        bindValue: 'enName',
        bindLabel: 'chName',
        items: [{chName: '嵌套', enName: 'SPT-QT'}, {chName: '弹框', enName: 'SPT-TK'}]
      } , {
        key: 'editPageType',
        title: 'AED页面显示方式',
        formState: this.formState(null, true),
        validatorOrOpts:  [BeeRequired.requiredSelect()],
        bindValue: 'enName',
        bindLabel: 'chName',
        items: [{chName: '嵌套', enName: 'SPT-QT'}, {chName: '弹框', enName: 'SPT-TK'}]
      } , {
        key: 'mainModuleSwitch',
        title: '主模块',
        formState: this.formState('t', true)
      } , {
        key: 'showSwitch',
        title: '菜单模块',
        formState: this.formState('t', true)
      } , {
        key: 'toolbarShowSwitch',
        title: '工具栏',
        formState: this.formState('t', true)
      } , {
        key: 'operationShowSwitch',
        title: '基本操作',
        formState: this.formState('t', true)
      } , {
        key: 'otherOperationShowSwitch',
        title: '其他操作',
        formState: this.formState('t', true)
      } , {
        key: 'dataDesc',
        title: '模块描述',
        formState: this.formState(null, false)
      }]
    );
  }

  dropDownListSettings() {

  }

  watchControlSettings() {
    this.setElementWatch('systemRowId', value => this.watchParentModule());
    this.setElementWatch('moduleLevel', value => this.watchParentModule());
  }

  parentModuleShow: boolean = false;
  watchParentModule() {
    let moduleLevel = this.aeFG.controls.moduleLevel.value || 0;
    let systemRowId = this.aeFG.controls.systemRowId.value || 0;

    if (moduleLevel > 1 && systemRowId >0 && !this.parentModuleShow) {
      this.parentModuleShow = !this.parentModuleShow;
    } else if (this.parentModuleShow && (moduleLevel <= 1 || systemRowId <= 0)) {
      this.parentModuleShow = false;
      this.aeFG.removeControl('parentModuleRowId');
    }
  }
}
