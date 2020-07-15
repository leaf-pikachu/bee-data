/**
 * BeeFramework 数据操作类型
 */
export class BeeOperationType {
  static readonly ADD = new BeeOperationType(201, '添加');
  static readonly EDIT = new BeeOperationType(202, '修改');
  static readonly DETAILS = new BeeOperationType(203, '详情');

  /**
   * BeeOperationType 构造函数
   * @param code 操作类型Code
   * @param desc 操作类型描述
   */
  constructor(public code: number, public desc: string){}
}
