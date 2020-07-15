/**
 * BeeFramewrok ngx-datatable 相关操作接口定义
 */
export interface NgxDataTableOperation {
  // page(page: {
  //   count
  //   pageSize
  //   limit
  //   offset
  // });
  pageChange(pageNo: number);
  sort(sorts: {
    sorts
    column
    prevValue
    newValue
  });
  search();
  loadGrid(loading?: boolean);
}
