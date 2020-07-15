import { AbstractControl, ValidatorFn } from '@angular/forms';
import { validatorKeys } from '@bee/core/config/validator/validator-config';

/**
 * bee framework 自定义验证器助手类
 */
export class BeeRequired {

  /**
   * 必填必选项
   * @param type text | select
   * @param errorMsg
   * @see validatorKeys.beeRequired
   */
  static required(type: 'text' | 'select', errorMsg?: string): ValidatorFn {
    switch (type) {
      case 'text':
        return this.requiredMsg(errorMsg);
      case 'select':
        return this.requiredSelect(errorMsg);
    }
  }
  /**
   * 文本框必填项
   * @param errorMsg
   * @see validatorKeys.beeRequired
   */
  static requiredMsg(errorMsg?: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any} => {
      if (control.value)  {
        return null;
      } else {
        return {[validatorKeys.beeRequired] : errorMsg || '此为必填项，不可为空！'};
      }
    } ;
  }

  static requiredFlag = (control: AbstractControl): {[key: string]: any} => {
    if (control.value)  {
      return null;
    } else {
      return {[validatorKeys.beeRequired] : '此为必填项，不可为空！'};
    }
  }

  /**
   * 下拉框必选项
   * @param errorMsg
   * @see validatorKeys.beeRequired
   */
  static requiredSelect(errorMsg?: string): any {
    return (control: AbstractControl): {[key: string]: any} => {
      if (control.value) {
        return null;
      } else {
        return {[validatorKeys.beeRequired]: errorMsg || '此为必选项，请选择！'};
      }
    };
  }
}
