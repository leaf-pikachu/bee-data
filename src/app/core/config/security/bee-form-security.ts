import { FormGroup } from '@angular/forms';

export class BeeFormSecurity {

  /**
   * 动态表单赋值
   * @param value
   * @param fg
   */
  static bindValueToFormGroup(value: {[key: string]: any}, fg: FormGroup): {[key: string]: any} {
    let currentFGValue: {[key: string]: any} = {};

    for (let key in value) {

      if (fg.controls[key] != null) {
        fg.controls[key].setValue(value[key]);
        currentFGValue = {...currentFGValue, [key]: value[key]};
      }

    }

    return currentFGValue;
  }

  /**
   * 检查表单值是否变更
   * @param oldValue
   * @param newValue
   */
  static checkFormValueChange(oldValue: {[key: string]: any}, newValue: {[key: string]: any}): boolean {

    if (!oldValue)
      return true;

    for (let key in newValue) {

      if (newValue[key] != oldValue[key])
        return true;

    }

    return false;
  }
}
