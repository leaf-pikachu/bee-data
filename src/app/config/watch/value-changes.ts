import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators'

/**
 * 连续流操作设置间隔时间
 * @param watchEvent 监听的流对象
 * @param dueTime 间隔时常默认（500ms）
 */
export function beeValueChanges(watchEvent: Observable<any>, dueTime?: number): Observable<any> {
  return watchEvent.pipe(debounceTime(dueTime || 500),
    distinctUntilChanged());
}
