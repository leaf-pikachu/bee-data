import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { beeValueChanges } from '@bee/core/config/watch/value-changes';

/**
 * BeeFramework FormControl 先关功能的预定
 */
export class FormControlSupport {
  readonly formGroupClass = 'form-group col-md-6';

  /**
   * 预先设定FormControl 值改变间隔时间处理
   * @param formControl
   * @param dueTime 间隔时间
   */
  protected nativeWatch(formControl: AbstractControl, dueTime: number = 500): Observable<any> {
    return beeValueChanges(formControl.valueChanges, dueTime);
  }

  /**
   * 监听FormControl 值改变时对应的处理
   * @param formControl
   * @param next 订阅成功处理
   * @param error 订阅失败处理
   * @param complete 最终处理
   * @param dueTime 间隔时长
   */
  protected watchControl(
                         formControl: AbstractControl,
                         next: (value: any) => void ,
                         error?: (error: any) => void,
                         complete?: () => void,
                         dueTime: number = 500) {
    return beeValueChanges(formControl.valueChanges, dueTime).subscribe(next, error, complete);
  }


}
