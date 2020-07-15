import { AfterViewInit } from '@angular/core';

import { NgxDataTableOperation } from '@bee/core/config/interfaces/ngx-datatable/ngx-data-table-operation';
import { ServiceLoad } from '@bee/core/config/settings/service-load';
import { environment } from '@bee/environment';
import { GridTableColumn } from '@bee/core/config/grid/data-table/grid-table-column';


/**
 * BeeFramework use ngx-datatable settings
 */
export class NgxDataTableSupport implements NgxDataTableOperation, AfterViewInit{

   loadSetting: ServiceLoad = new ServiceLoad(0, 10);
   columns: GridTableColumn[] = null;
   columnMode: 'standard' | 'flex' | 'force' = 'force';
   externalPaging: boolean = false;
   externalSorting: boolean = true;
   footerHeight: number | 'auto' = 'auto';
   reOrderAble: boolean = true;
   loadingIndicator: boolean = false;
   sortType: 'single' | 'multi' = 'multi';
   initLoading: boolean = true;
   virtualization: boolean = false;
   scrollbarV: boolean = false;

  // Setting Data Table height
   rowHeight = 40;
   tableMainHeight = 430;
   tableHeaderMainHeight = 50;
   tableBodyMainHeight = 360;
   tableFooterMainHeight = 50;

  pageChange(pageNo: number) {
    if (!environment.production)
      console.info('执行分页操作....', pageNo);
    this.loadSetting.page.currentPageNo = pageNo;
    this.loadGrid(true);
  }

  search() {

    if (!environment.production)
      console.info('执行搜索操作....');

    this.loadSetting.page.currentPageNo = 0;
    this.loadSetting.sorts = null;
    this.loadGrid(true);
  }

  sort(sorts: { sorts; column; prevValue; newValue }) {

    if (!environment.production)
      console.info('执行排序操作....', sorts);

    this.loadSetting.sorts = sorts.sorts;
    //初始化当前页为0
    // this.loadSetting.page.currentPageNo = 1;
    this.loadGrid(true);
  }

  loadGrid(loading?: boolean) {

    if (!environment.production)
      console.info('执行NgxDataTableSetting加载数据操作....');
  }

  ngAfterViewInit(): void {
    // let dataTableHeight = $('ngx-datatable').height();
    // let dataTableHeaderHeight = $('datatable-header').height() | 0;
    // let dataTableFooterHeight = $('datatable-footer').height() | 0;
    // let dataTableBodyMinHeight = (dataTableHeight - dataTableHeaderHeight - dataTableFooterHeight) + 'px';
    // $('datatable-body').css('min-height', dataTableBodyMinHeight);
  }
}
