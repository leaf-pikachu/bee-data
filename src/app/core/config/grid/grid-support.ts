import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { TableColumn } from '@swimlane/ngx-datatable';
import { NgxDataTableSupport } from '@bee/core/config/grid/data-table/ngx-data-table-support';
import { GridExtendOperation } from '@bee/core/config/interfaces/grid-extend-operation';
import { BeeOperationType } from '@bee/core/config/settings/bee-operation-type';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { environment } from '@bee/environment';
import { gridBasicOperationSetting, swalDeleteSureSetting } from '@bee/core/config/bee-config';
import { AedReturn } from '@bee/core/config/aed/aed-support';
import Swal from 'sweetalert2';

/**
 * BeeFramework Data Grid Operation Setting
 * Setup 1. override initColumns()
 */
export abstract class GridSupport extends NgxDataTableSupport implements GridExtendOperation, OnInit{

  @ViewChild('operationTemplate', { static: true })
  operationTemplate: TemplateRef<any>;

  operationColumn: TableColumn;
  gridSupportInstance: GridSupport;
  /**
   * Grid 基础操作
   */
  gridBasicOperation = gridBasicOperationSetting;

  /** 是否显示 AED (addRow/editRow/rowDetails) */
  showAED = false;

  /** 数据操作类型 */
  operationType: BeeOperationType;

  /** 数据标识符 */
  dataFlag: string | number;

  /**
   *
   * @param $http BeeHttpService 实例
   * @param loadUrl 加载数据url
   * @param deleteUrl 删除数据url
   */
  protected constructor(public $http: BeeHttpService, public loadUrl: string, public deleteUrl: string) {
    super();
    console.log(" constructor 操作：", this.operationTemplate)
  }

  addRow() {

    if (!environment.production)
      console.info('执行添加操作....');

    this.operationType = BeeOperationType.ADD;
    this.showAED = true;
  }

  editRow(row: any) {

    Swal.fire<boolean>({
      icon: 'warning', // 弹框类型
      title: '注销帐号', //标题
      text: "注销后将无法恢复，请谨慎操作！", //显示内容

      confirmButtonColor: '#3085d6',// 确定按钮的 颜色
      confirmButtonText: '确定',// 确定按钮的 文字
      showCancelButton: true, // 是否显示取消按钮
      cancelButtonColor: '#d33', // 取消按钮的 颜色
      cancelButtonText: "取消", // 取消按钮的 文字

      focusCancel: true, // 是否聚焦 取消按钮
      reverseButtons: true  // 是否 反转 两个按钮的位置 默认是  左边 确定  右边 取消
    }).then((isConfirm) => {
        //判断 是否 点击的 确定按钮
        if (isConfirm.value) {
          Swal.fire("成功", "点击了确定", "success");
        } else {
          Swal.fire("取消", "点击了取消", "error");
        }
    });
    // if (!environment.production)
    //   console.info('执行修改操作 {}....', row);
    //
    // this.operationType = BeeOperationType.EDIT;
    // this.dataFlag = row.rowId;
    // this.showAED = true;

  }

  rowDetails(row: any) {

    if (!environment.production)
      console.info('执行详情操作 {}....', row);

    this.operationType = BeeOperationType.DETAILS;
    this.dataFlag = row.rowId;
    this.showAED = true;
  }

  /**
   * 删除提示弹框配置
   * @param row
   */
  deletedConfirm(row: any) {
    return swalDeleteSureSetting;
  }

  /**
   *  删除数据， 可已重写！
   * Tips: 为了更好的使用请参考一下使用！
   * @param row
   */
  deletedRow(row: any) {

    if (!environment.production)
      console.info('执行删除操作 {}....', row);

    this.$http.get(this.deleteUrl, this.deleteParam(row), true).subscribe((value: boolean) => {

      if (value === true) {
        this.$http.notification.success('删除成功！');
        this.loadGrid(true);
      } else {
        this.$http.notification.error('删除失败！');
      }

    })
  }

  /**
   * 删除数据传递先关数据到服务器
   * @param row
   */
  deleteParam(row: any) {
    return {rowId: row.rowId}
  }

  loadGrid(loading?: boolean) {

    if (!environment.production)
      console.info('执行GridOperationSetting加载数据操作....', this.getPostParams());

    this.$http.post(this.loadUrl, this.getPostParams(), loading).subscribe(
      (value: any) => {
          this.loadSetting.page.totalRecord = value.totalRecord;
          this.loadSetting.page.result = value.result;
          this.loadGridComplete();
      }
    );
  }

  /**
   * loadGrid 加载完成执行的操作
   */
  protected loadGridComplete() {}

  returnOperation(aedReturn: AedReturn) {

    if (!environment.production)
      console.info('执行返回数据操作....');

    this.showAED = false;
    this.dataFlag = null;

    if (aedReturn != null && aedReturn.refresh === true) {

      if (aedReturn.operationType === BeeOperationType.ADD) {
        this.loadSetting.page.currentPageNo = 0;
        this.loadSetting.search = null;
        this.loadSetting.sorts = null;
      }

      this.loadGrid();
    }

  }

  protected getPostParams(): any {
    if (this.loadSetting.sorts) {
      this.loadSetting.sorts.forEach(value => {
        value.field = value.prop;
        value.mode = value.dir;
      });
    }
    return {
      'pageNo': this.loadSetting.page.currentPageNo,
      'pageSize': this.loadSetting.page.pageSize,
      'search' :this.loadSetting.search,
      // 'sorts': this.loadSetting.sorts
    };
  }

  abstract initColumns();

  /**
   * 子类重写给方法时需要先执行父的ngOnIt() ;
   *  * super.ngOnIt();
   */
  ngOnInit(): void {
    this.initColumns();
    console.log(" ngOnInit 操作：", this.operationTemplate);
    // this.operationColumn = {
    //   name: '操作',
    //   canAutoResize: false,
    //   draggable: false,
    //   cellTemplate: this.operationTemplate,
    //   resizeable: false,
    //   sortable: false,
    //   width: 130
    // };
    // this.columns.push(this.operationColumn);
    this.loadGrid(this.initLoading)
  }

  ngOnDestroy(): void {
  }
}
