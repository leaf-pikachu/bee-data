import {AfterViewChecked, AfterViewInit, HostBinding} from '@angular/core';

import { TableColumn } from '@swimlane/ngx-datatable';
import { FormControlSupport } from '@bee/config/settings/form-control-support';
import { NgxDataTableOperation } from '@bee/config/interfaces/ngx-datatable/ngx-data-table-operation';
import { ServiceLoad } from '@bee/config/settings/service-load';
import { environment } from '@bee/environment';
import { $ } from 'protractor';


/**
 * BeeFramework use ngx-datatable settings
 */
export class NgxDataTableSupport extends FormControlSupport implements NgxDataTableOperation, AfterViewInit, AfterViewChecked{

   loadSetting: ServiceLoad = new ServiceLoad(0, 10);
   columns: TableColumn[] = [];
   columnMode: 'standard' | 'flex' | 'force' = 'force';
   externalPaging: boolean = true;
   externalSorting: boolean = true;
   footerHeight: number = 50;
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

  page(page: { count; pageSize; limit; offset }) {

    if (!environment.production)
      console.info('执行分页操作....', page);

    this.loadSetting.page.currentPageNo = page.offset;
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
    this.loadSetting.page.currentPageNo = 0;
    this.loadGrid(true);
  }

  loadGrid(loading?: boolean) {

    if (!environment.production)
      console.info('执行NgxDataTableSetting加载数据操作....');
  }

  ngAfterViewInit(): void {
    let dataTableHeight = $('ngx-datatable').height();
    let dataTableHeaderHeight = $('datatable-header').height() | 0;
    let dataTableFooterHeight = $('datatable-footer').height() | 0;
    let dataTableBodyMinHeight = (dataTableHeight - dataTableHeaderHeight - dataTableFooterHeight) + 'px';
    $('datatable-body').css('min-height', dataTableBodyMinHeight);
  }

  ngAfterViewChecked(): void {

  }
}
