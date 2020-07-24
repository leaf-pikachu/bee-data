/**
 * 条件类型接口定义
 */
export interface ConditionType {
  /**
   * 条件类型
   */
  readonly type: string;
  /**
   * 条件名称
   */
  readonly text: string;
  /**
   * 条件ICON
   */
  readonly icon?: string;
}

const eq: ConditionType = {type: 'eq', text: '等于', icon: '='};
const ne: ConditionType = {type: 'ne', text: '不等于', icon: '≠'};
const lt: ConditionType = {type: 'lt', text: '小于', icon: '<'};
const gt: ConditionType = {type: 'gt', text: '大于', icon: '>'};
const le: ConditionType = {type: 'le', text: '小于等于', icon: '<='};
const ge: ConditionType = {type: 'ge', text: '大于等于', icon: '>='};
const like: ConditionType = {type: 'like', text: '模糊匹配', icon: '**'};

export const commonConditionTypes: ConditionType[] = [eq, ne];
export const stringConditionTypes: ConditionType[] = [...commonConditionTypes, like];
export const numberConditionTypes: ConditionType[] = [...commonConditionTypes, lt, gt, le, ge];
