import { GridBasicOperationSetting } from '@bee/core/config/interfaces/grid-basic-operation';

/**
 * Bee Framework Config
 */
export class BeeConfig {

  /**
   * bee work loading key name
   */
  static readonly LOADING_KEY_NAME: string = "BEE_WORK_LOADING";
}

/**
 * SweetAlert2 默认配置
 */
export const swalOptional = {
  buttonsStyling: false,
  confirmButtonClass: 'btn btn-primary',
  cancelButtonClass: 'btn btn-default'
};

/**
 * 数据删除是确定弹框
 */
export const swalDeleteSureSetting =
  {

    title:'你确定要删除吗?',
    icon:'warning',
    showCancelButton:true,
    confirmButtonText:'确定',
    cancelButtonText:'取消',
    showCloseButton: true,
    customClass: {
      confirmButton:'btn btn-lg btn-warning',
      cancelButton: 'btn btn-lg btn-default'
    },
    buttonsStyling: false
};

/**
 *
 */
export const gridBasicOperationSetting: GridBasicOperationSetting = {
  add: {
    title: '新建',
    btnClass: 'btn icon-btn btn-outline-primary',
    iconClass: 'ion ion-ios-add'
  },
  edit: {
    title: '修改',
    btnClass: 'btn btn-xs icon-btn btn-outline-success borderless',
    iconClass: 'far fa-edit'
  },
  details: {
    title: '详情',
    btnClass: 'btn btn-xs icon-btn btn-outline-info borderless',
    iconClass: 'fas fa-search'
  },
  deleted: {
    title: '删除',
    btnClass: 'btn btn-xs icon-btn btn-outline-danger borderless',
    iconClass: 'far fa-trash-alt'
  }
};
