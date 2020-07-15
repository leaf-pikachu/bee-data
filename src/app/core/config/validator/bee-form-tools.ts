import { FormControl } from '@angular/forms';
import { validatorKeys } from '@bee/core/config/validator/validator-config';

/**
 * 验证工具
 */
export class BeeFormTools {
  /**
   * 判断当前 FormControl 是否为必填或是必选项目
   * @param beeRFC FormControl
   * @see FormControl
   * @return true / false
   */
  static checkRequired(beeRFC: FormControl): boolean {
    const defaultValue = beeRFC.value;
    if (defaultValue) {
      beeRFC.setValue(null);
    }
    // validator function returns object only contains requiredText property.
    // Whatever how many validators you've set.
    // We just want to get the validators from the FromControl instead of the duplicate @Input parameter.
    // By now Google only provides setValidators method. But no getValidators method.
    // More rowDetails check on https://github.com/angular/angular/issues/13461
    const validator = beeRFC.validator ? beeRFC.validator(beeRFC) : null;

    if (defaultValue) {
      beeRFC.setValue(defaultValue);
    }

    return validator && (validator.hasOwnProperty(validatorKeys.ngRequired) || validator.hasOwnProperty(validatorKeys.beeRequired));
  }
}
