/**
 * 分页信息
 */
export class BeePage {
  /** 当前页下标 从0开始 **/
  currentPageNo: number;
  /** 当前页的数据量 **/
  pageSize: number;
  /** 当前可加载数据总量**/
  totalRecord: number = 0;
  /** 当前页面的数据 **/
  result: any[];

  /**
   * 构建 BeePage 实例
   * @param currentPageNo
   * @param pageSize
   */
  constructor(currentPageNo: number, pageSize: number) {
    this.currentPageNo = currentPageNo;
    this.pageSize = pageSize;
  }

}
