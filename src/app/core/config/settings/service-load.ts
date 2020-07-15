import { Sort } from '@bee/core/config/interfaces/ngx-datatable/sort';
import { BeePage } from '@bee/core/config/request/bee-page';

/**
 * Bee Framework 服务器数据信息设置
 */
export class ServiceLoad {
  /** 分页信息记录 **/
  page: BeePage;
  /** 排序信息记录 **/
  sorts: Sort[];
  /** 其他查询条件记录 **/
  search: {[key: string]: any};

  /**
   * 构建 ServiceLoad
   * @param currentPageNo
   * @param pageSize
   */
  constructor(currentPageNo: number, pageSize: number) {
    this.page = new BeePage(currentPageNo, pageSize);
  }
}


