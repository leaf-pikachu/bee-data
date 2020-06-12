import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UniversalValidators } from 'ngx-validators';

import { AedSupport } from '@bee/config/aed/aed-support';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { BeeDictionaryConstantService } from '@bee/core/service/bee-dictionary-constant.service';
import { BeeRequired } from '@bee/config/validator/bee-required';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html'
})
export class ModuleComponent extends AedSupport{

  constructor($http: BeeHttpService, private ct: BeeDictionaryConstantService, private fb: FormBuilder) {
    super($http, '', '');
  }

  ngOnInit(): void {
  }

  showPageTypes: any[];
  moduleLevels: any[] = [{text: '一级模块', id: 1}, {text: '二级模块', id: 2}, {text: '三级模块', id: 3}];
  systems: any[];
  dropDownListSettings() {
    this.ct.loadSystems(value => this.systems = value);
    this.ct.loadConstants('SHOW-PAGE-TYPE', value => this.showPageTypes = value);
  }

  formGroupSettings() {
    this.aeFG = this.fb.group({
      numberOrder: [this.fcValue(null, false), [BeeRequired.requiredText(), UniversalValidators.isNumber]],
      systemRowId: [this.fcValue(null, true), [BeeRequired.requiredSelect()]],
      moduleLevel: [this.fcValue(1, true), [BeeRequired.requiredSelect(), UniversalValidators.isNumber]],
      parentModuleRowId: [this.fcValue(null, false)],
      moduleEnName: [this.fcValue(null, true), [BeeRequired.requiredText(), UniversalValidators.maxLength(150)]],
      moduleChName: [this.fcValue(null, true), [BeeRequired.requiredText(), UniversalValidators.maxLength(150)]],
      moduleURI: [this.fcValue(null, true), [BeeRequired.requiredText(), UniversalValidators.maxLength(50)]],
      listPageType: [this.fcValue(null, true), [BeeRequired.requiredSelect()]],
      editPageType: [this.fcValue(null, true), [BeeRequired.requiredSelect()]],
      mainModuleSwitch: [this.fcValue('t', false)],
      moduleShowSwitch: [this.fcValue('t', false)],
      toolbarShowSwitch: [this.fcValue('t', false)],
      operationShowSwitch: [this.fcValue('t', false)],
      otherOperationShowSwitch: [this.fcValue('t', false)],
      moduleDesc: [null]
    });
  }

  parentModuleShow: boolean = false;
  parentModules: any[];
  watchControlSettings() {
    let moduleLevel = this.aeFG.controls.moduleLevel.value || 0;
    let systemRowId = this.aeFG.controls.systemRowId.value || 0;

    // if (moduleLevel > 1 && systemRowId >0) {
    //   this.aeFG.addControl('parentModuleRowId', this.fb.control(this.fcValue(null, false), [BeeRequired.requiredSelect(), UniversalValidators.isNumber]));
    //   this.parentModuleShow = !this.parentModuleShow;
    // } else {
    //   this.parentModules = [];
    //   this.parentModuleShow = false;
    //   this.aeFG.removeControl('parentModuleRowId');
    // }
  }

}
