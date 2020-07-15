import { validatorKeys } from '@bee/core/config/validator/validator-config';

/**
 * BeeFramework 检测错误信息
 * @param errorMsg 错误信息 默认（已注册！）
 */
export function beeCheckError(errorMsg?: string) {
  return {[validatorKeys.beeCheck]: errorMsg || '已注册！'}
}
