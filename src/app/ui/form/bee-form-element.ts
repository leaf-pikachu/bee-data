import { AbstractControlOptions, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import {BeeFormTools} from '@bee/core/config/validator/bee-form-tools';

export interface BeeFormElement {
  title: string;
  key: string;
  type: 'bee-input' | 'bee-select' | 'bee-switch'| string;
  groupId: number;
  formState: any;
  /**
   * 下拉框列表数据
   */
  items?: any[];
  bindLabel?: string;
  bindValue?: any;
  required?: boolean;
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
  loadData?: (dataSetter: (value: any) => void)=>void;
}

export interface ElementState {
  elementGroup?: FormGroup
  title: string,
  key: string;
  formState?: any;
  placeholder?: string;
  items?: any[];
  bindLabel?: string;
  bindValue?: any;
  required?: boolean;
  type?: 'text' | 'date' | 'number'| 'file';
  color?: any;
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
  loadData?: (dataSetter: (value: any) => void)=>void;
}

export function elementStateSegment(formBuilder: FormBuilder, elementState: ElementState): FormControl {
  if (elementState) {
    let beeRFC = formBuilder.control(elementState.formState, elementState.validatorOrOpts, elementState.asyncValidator)
    elementState.elementGroup.addControl(elementState.key, beeRFC);
    elementState.placeholder = elementState.placeholder || '';
    elementState.type = elementState.type || 'text';
    elementState.bindLabel = elementState.bindLabel || 'text';
    elementState.bindValue = elementState.bindValue || 'id';
    return beeRFC;
  } else {
    console.error("请配置此Element State");
  }
}
