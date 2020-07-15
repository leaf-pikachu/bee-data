import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { AedSupport } from '@bee/core/config/aed/aed-support';


/**
 * BeeFramework Add/Edit/Details Modal Show Setting
 */
export abstract class AedModalSupport extends AedSupport {
  /**
   * @param $http
   * @param loadInfoUrl
   * @param saveUrl
   */
  protected constructor(public activityModal: NgbActiveModal, $http: BeeHttpService, loadInfoUrl: string, saveUrl: string) {
    super($http, loadInfoUrl, saveUrl);
  }

  /**
   * 执行返回，携带数据信息
   */
  aedBreak() {
    this.activityModal.close({operationType: this.operationType, refresh: this.returnFresh});
  }
}
