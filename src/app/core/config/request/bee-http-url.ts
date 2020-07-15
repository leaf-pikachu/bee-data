/**
 *  BeeFramework http url constants
 */
export class BeeHttpUrl {

  /**
   * System Module Use URL
   */
  static readonly system = {
    constant: {
      // Constant Save (常量保存)
      save: '/dictionary/constant/aeSave',
      // Constant EnName Check (检查常量是否已经存在)
      check: '/dictionary/constant/check',
      // Constant Edit (常量信息修改）
      edit: '/dictionary/constant/aeSave',
      // Constant Delete (常量删除)
      delete: '/system/constant/delete'
    },
    development: {
      save: 'development/system/aeSave'
    }
  };
}
