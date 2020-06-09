import { Md5 } from 'ts-md5';
import { Buffer } from 'buffer';

/**
 * BeeFramework数据安全加解密
 */
export class BeeDataSecurity {
  static readonly ENCODING: BufferEncoding = 'base64';

  /**
   * Md5加密
   * Tips: 数据不可逆
   * @param encryptionStr
   */
  static md5(encryptionStr: string): string {
    return Md5.hashStr(encryptionStr).toString();
  }

  /**
   * base64加密再md5加密
   * Tips: 数据不可逆
   * @param encryptionStr
   */
  static base64ToMd5(encryptionStr: string): string {
    return this.md5(this.base64Encode(encryptionStr));
  }

  /**
   * md5加密再base64加密
   * Tips: 数据不可逆
   * @param encryptionStr
   */
  static md5ToBase64(encryptionStr: string): string {
    return this.base64Encode(this.md5(encryptionStr));
  }

  /**
   * Base64加密
   * @param encryptionStr
   */
  static base64Encode(encryptionStr: string): string {
    return new Buffer(encryptionStr).toString(this.ENCODING);
  }

  /**
   * Base64解密
   * @param decodeStr
   */
  static base64Decode(decodeStr: string): string {

    return new Buffer(decodeStr, this.ENCODING).toString();
  }
}
