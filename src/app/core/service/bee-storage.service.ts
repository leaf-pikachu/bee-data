import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BeeDataSecurity } from '@bee/core/config/security/bee-data-security';

@Injectable()
export class BeeStorageService {
  /**
   * 构造参数定义属性同时创建对象
   * @param storage
   */
  constructor(private storage: Storage) {
  }

  /**
   * 存放键值数据到 storage 中
   * @param key
   * @param value
   */
  set(key, value) {
    return this.storage.set(this.stringEncry(key), this.objectEncry(value));
  }

  /**
   * 移除相关的键 值 存储
   * @param key
   */
  remove(key) {
    return this.storage.remove(this.stringEncry(key));
  }

  /**
   * 获取缓存数据
   * @param key
   * @param acceptValue
   */
  get(key: string, acceptValue: (value) => any) {
    this.storage.get(this.stringEncry(key)).then(
      (value: string) =>  acceptValue(this.deconde(value))
    );
  }

  /**
   * 清空所有缓存数据
   */
  clear() {
    return this.storage.clear();
  }

  /**
   * 加密数据
   * @param str
   */
  stringEncry = (str: string) => {
    return BeeDataSecurity.base64Encode(str);
  }

  /**
   * 对象数据加密
   * @param value
   */
  objectEncry = (value: any) => {
    return this.stringEncry(JSON.stringify(value));
  }

  /**
   * 解密数据
   * @param str
   */
  deconde = (str: string): any => {

    if (str == null) {
      return null;
    } else {
      return JSON.parse(BeeDataSecurity.base64Decode(str));
    }

  }
}
