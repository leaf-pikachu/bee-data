import { Component, OnInit } from '@angular/core';
import { AedSupport } from '@bee/core/config/aed/aed-support';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import {FormBuilder} from '@angular/forms';
import {BeeRequired} from '@bee/core/config/validator/bee-required';
import {UniversalValidators} from 'ngx-validators';

@Component({
  selector: 'bee-table-aed',
  templateUrl: './table-aed.component.html',
  styleUrls: ['./table-aed.component.scss']
})
export class TableAedComponent extends AedSupport{

  constructor($http: BeeHttpService, private formBuilder: FormBuilder) {
    super($http, '', '');


  }

  formGroupSettings() {
    this.setFormElementState([{
      title: '排序号',
      key: 'orderNo',
      formState: this.formState(null, false),
      validatorOrOpts: [BeeRequired.requiredFlag, UniversalValidators.isNumber]
    }, {
      title: '表名称（CH）',
      key: 'chName',
      formState: this.formState(null, false),
      validatorOrOpts: [BeeRequired.requiredFlag]
    }, {
      title: '表名称（EN）',
      key: 'enName',
      formState: this.formState(null, false),
      validatorOrOpts: [BeeRequired.requiredFlag]
    }, {
      title: '描述',
      key: 'dataDesc',
      formState: this.formState('', false),
      validatorOrOpts: []
    }]);
  }

  dropDownListSettings() {
  }

  watchControlSettings() {
  }

}
