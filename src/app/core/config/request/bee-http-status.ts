/**
 * BeeFramework Http 请求响应状态
 */
export class BeeHttpStatus {
  private static readonly  SUCCESS_KEY = 'success';
  private static readonly  ERROR_KEY = 'error';

  private _status: string;
  private _code: number;

  constructor(status: string, code: number) {
    this.status = status;
    this.code = code;
  }

  get status(): string {
    return this._status;
  }

  set status(status: string) {
    this._status = status;
  }

  get code(): number {
    return this._code;
  }

  set code(code: number) {
    this._code = code;
  }

  static readonly SUCCESS = new BeeHttpStatus(BeeHttpStatus.SUCCESS_KEY, 200);

  static readonly DTA_EXIST = new BeeHttpStatus(BeeHttpStatus.SUCCESS_KEY, 205);

  static readonly DATA_NOT_EXIST = new BeeHttpStatus(BeeHttpStatus.SUCCESS_KEY, 206);

  static readonly ERROR = new BeeHttpStatus(BeeHttpStatus.ERROR_KEY, 500);
  /** 授权认证失败*/
  static readonly AUTHENTICATION_FAILURE = new BeeHttpStatus(BeeHttpStatus.ERROR_KEY, 401);
}
