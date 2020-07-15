import { isArray, isNullOrUndefined, isString } from 'util';


/**
 * 将传入的字符传首字符小写
 * @param convertValue
 */
export function initialLowercase(convertValue: string) {

  if (isNullOrEmpty(convertValue)) return '';

  if (convertValue != null && convertValue.trim().length == 1) return convertValue.toLocaleLowerCase();

  if (convertValue != null && convertValue.trim().length > 1) return convertValue.substr(0,1).toLocaleLowerCase() + convertValue.substr(1);
}

export function lowercase(convertValue: string) {
  if (convertValue != null || convertValue.trim().length == 0) return '';
}

/**
 * 判断当前传入对象是否为空
 * @param checkValue
 */
export function isNullOrEmpty(checkValue: any) {

  if (isNullOrUndefined(checkValue)) return true;

  let flag = false;
  if (isString(checkValue) && checkValue.toString().trim().length == 0) flag = true;
  if (isArray(checkValue) &&  checkValue.length == 0) flag = true;
  return flag;
}
