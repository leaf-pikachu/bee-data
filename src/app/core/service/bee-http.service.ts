import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BlockUIService } from 'ng-block-ui';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, finalize, filter, map, timeout } from 'rxjs/operators';

import { BeeStorageService } from '@bee/core/service/bee-storage.service';
import { environment } from '@bee/environment';
import { NotificationService } from '@bee/core/notifications/notification.service';
import { HttpRequestMethod } from '@bee/core/config/request/http-request-method';
import { BeeConfig } from '@bee/core/config/bee-config';
import { BeeHttpStatus } from '@bee/core/config/request/bee-http-status';


@Injectable()
export class BeeHttpService {
  baseUrl = environment.beeframework.api;

  constructor(
    private $httpClient: HttpClient,
    private router: Router,
    public notification: NotificationService,
    private bus: BlockUIService,
    private locationStorage: BeeStorageService) {
  }

  /**
   * 获取 HttpClient 实例对象
   */
  get httpClient(): HttpClient {
    return this.$httpClient;
  }

  /**
   * Combines the provided base url and relative url.
   * Does NOT use HttpInterceptor to achieve this goal because we want to
   * make the code logic clear and in one place.
   * @param baseUrl The base url for current http request.
   * @param url The relative url string.
   * @returns The full url.
   */
  combineUrl(baseUrl: string, url: string): string {
    if (baseUrl && baseUrl !== '') {
      // Converts the input url to lower case just in case.
      // url = url.toLowerCase();

      // Checks if the input url already has a leading slash.
      if (!url.startsWith('/')) {
        // Appends the leading slash if needed.
        url = '/' + url;
      }

      // Checks if the input url already starts with the base url.
      if (url.startsWith(baseUrl)) {
        // If already contains the base url.
        return url;
      } else {
        // Appends the base url if needed.
        return baseUrl + url;
      }
    } else {
      return url;
    }
  }

  /**
   * Combines the relative url with default base url.
   * @param url The relative url string.
   * @returns The full url.
   */
  combineUrlWithDefault(url: string): string {
    return this.combineUrl(this.baseUrl, url);
  }

  /**
   * Creates the customized http request header.
   * @returns Headers instance with customized data.
   */
  createRequestHeader(): HttpHeaders {
    let headers = new HttpHeaders();

    // Sets headers here e.g.
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');

    // if (this.tokenService.hasAccessToken) {
    //   headers = headers.append('Authorization', `Bearer ${this.tokenService.activeAccessToken}`);
    // }

    return headers;
  }

  /**
   * Gets the remote server data.
   * @param url The remote server relative url. The base url will be appended automatically.
   * @param params The parameters for getting data.
   * @param loading loading ui
   * @returns The Observable result returned by HttpClient.
   */
  get<T>(url: string, params: any = {}, loading?: boolean): Observable<T> {
    return this.processHttpRequestWithTokenCheck<T>(HttpRequestMethod.GET, this.baseUrl, url, params, false);
  }

  /**
   * Posts the data to the remote server.
   * @param url The remote server relative url. The base url will be appended automatically.
   * @param body The body data for posting data.
   * @param loading loading ui
   * @returns The Observable result returned by HttpClient.
   */
  post<T>(url: string, body: any = {}, loading?: boolean): Observable<T> {
    return this.processHttpRequestWithTokenCheck<T>(HttpRequestMethod.POST, this.baseUrl, url, body, loading);
  }

  /**
   * Processes the http request by attaching it with other operators. This method will check the local token.
   * If the local access token expired the refresh token request will be raised before the user request.
   * Once the new access token is retrieved the user request will contiune.
   * @param httpMethod The string of the http method. Use HttpMethodConstant as the parameter.
   * @param baseUrl The string of http request base url.
   * @param url The string of current requesting url.
   * @param data The params for http get and body for http post.
   * @param loading loading ui
   * @returns The same Observable result with HttpClient.
   */
  private processHttpRequestWithTokenCheck<T>(httpMethod: string, baseUrl: string, url: string, data: any, loading?: boolean): Observable<T> {
    //TODO process httpRequest with token check
    return this.makeRequest(httpMethod, baseUrl, url, data, loading);
  }

  /**
   * Makes the http request.
   * @param httpMethod The string of the http method. Use HttpMethodConstant as the parameter.
   * @param baseUrl The string of http request base url.
   * @param url The string of current requesting url.
   * @param data The params for http get and body for http post.
   * @param loading true/false
   * @returns The same Observable result with HttpClient.
   */
  private makeRequest<T>(httpMethod: string, baseUrl: string, url: string, data: any = {}, loading?: boolean): Observable<T> {
    if (httpMethod === HttpRequestMethod.GET) {
      return this.makeGetRequest(baseUrl, url, data, loading);
    } else if (httpMethod === HttpRequestMethod.POST) {
      return this.makePostRequest(baseUrl, url, data, loading);
    }
  }

  /**
   * Makes a http get request to remote server by using the provided url. The base url will be auto appended if needed.
   * @param url The remote server relative url. The base url will be appended automatically if needed.
   * @param params The parameters for getting data.
   * @param loading true/false
   * @returns The Observable result returned by HttpClient.
   */
  private makeGetRequest<T>(baseUrl: string, url: string, params: any = {}, loading?: boolean): Observable<T> {
    // Prepares the HttpParams.
    let inputParams = this.prepareHttpParams(params);

    // Appends the base url if needed.
    url = this.combineUrl(baseUrl, url);

    return this.processHttpRequest<T>(this.httpClient.get<T>(url, {
      headers: this.createRequestHeader(),
      params: inputParams
    }), loading);
  }

  /**
   * Makes a http get request to remote server by using the provided url. The base url will be auto appended if needed.
   * @param url The remote server relative url. The base url will be appended automatically if needed.
   * @param params The parameters for getting data.
   * @param loading true/false
   * @returns The Observable result returned by HttpClient.
   */
  private makePostRequest<T>(baseUrl: string, url: string, body: any = {}, loading?: boolean): Observable<T> {
    // Appends the base url if needed.
    url = this.combineUrl(baseUrl, url);

    return this.processHttpRequest<T>(this.httpClient.post<T>(url, body, {
      headers: this.createRequestHeader()
    }), loading);
  }

  /**
   * Processes the http request by attaching it with other operators.
   * @param result The Observable result returned by HttpClient.
   * @param loading
   * @returns The same Observable result with HttpClient.
   */
  private processHttpRequest<T>(result: Observable<T>, loading?: boolean): Observable<T> {
    this.loadingStart(loading);

    // RxJS tap operator, which looks at the observable values, does something with those values,
    // and passes them along. The tap call back doesn't touch the values themselves.
    // Decreases the pending http request count when request starts. This is for display loading icon.
    return result.pipe(
      timeout(6000),
      filter(this.httpRequestSuccessFilter),
      map((value: any) => {
        if (!value.data && value.data!=false)
          return value.msg;

        if ( value.code === BeeHttpStatus.AUTHENTICATION_FAILURE.code) return value;

        return value.data;
      }),
      catchError(this.httpRequestErrorHandle),
      finalize(() => this.loadingEnd(loading)));
  }

  /**
   * 加载等待
   * @param loading true/false
   */
  loadingStart = (loading?: boolean): void => {
    // this.notification.success('信息正在加载.....');
    if (loading) {
    this.bus.start(BeeConfig.LOADING_KEY_NAME);
    }
  }

  /**
   * 取消加载等待
   * @param loading true/false
   */
  loadingEnd = (loading?: boolean): void => {
    if (loading) {
    this.bus.stop(BeeConfig.LOADING_KEY_NAME);
    }
    // PfLayer.close(index);
  }


  /**
   * 全局配置请求一场处理
   * @param error 异常信息
   */
  httpRequestErrorHandle = (error: HttpErrorResponse): Observable<never> => {
    // this.notification.error(error.statusText, error.status);

    // console.error('全局异常处理：', error);
    //
    switch (error.status) {
      case 401:
        this.notification.error(`${error.error.msg}`, `${error.status}`);
        this.router.navigateByUrl('/');
        break;
      case 504:
        this.notification.warning('网络异常！请检查一下网络是否已连接。。。。', `${error.status} - ${error.statusText}`)
        break;
      case 500:
        this.notification.warning( '服务产生错误，工程师正在紧急修复！', error.status.toString());
        break;
      default:

        if (error instanceof TimeoutError) {
          this.notification.warning('服务器繁忙请求超时，请稍后再试。。。。', `505 - 请求超时`)
        } else {
          this.notification.error(`未知异常: ${error.status + ' - ' + error.statusText}`);
        }

    }
    return throwError(
      `捕获运行时异常，请联系管理员！${JSON.stringify(error)}`
    );
  }

  /**
   * 全局配置请求成功数据过滤
   * @param res
   */
  httpRequestSuccessFilter = (res: any): boolean => {
    // TODO httpRequest success filter
    // if (res.status === BeeHttpStatus.SUCCESS.status) {

      if (
        res.code === BeeHttpStatus.DATA_NOT_EXIST.code ||
        res.code === BeeHttpStatus.DTA_EXIST.code
      )
        this.notification.warning(res.msg);

      return true;

    // }

    // if (res.status)
  };

  /**
   * 获取服务器的绝对请求路径
   * @param url 请求的相对路径
   */
  serviceUrl = (url: string): string => {
    if (url.indexOf('http') >= 0) {
      return url;
    }

    if (!url.startsWith('/') && !url.startsWith('\\')) {
      url += '/';
    } else if (url.startsWith('\\')) {
      url = url.replace('\\', '/');
    }

    return environment.beeframework.api + url;
  };


  /**
   * Creates the customized http request header.
   * @returns Headers instance with customized data.
   */
  requestJsonHeader = (): HttpHeaders => {
    let headers = new HttpHeaders();

    // Sets headers here e.g.
    headers = headers.append('Content-Type', 'application/json');
    // headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Accept', 'application/json');

    // if (this.tokenService.hasAccessToken) {
    //   headers = headers.append('Authorization', `Bearer ${this.tokenService.activeAccessToken}`);
    // }

    return headers;
  };

  /**
   * Prepares the HttpParams based on the provided parameter object.
   * @param params The provided parameter object.
   * @returns HttpParams instance.
   */
  prepareHttpParams = (params: any = {}): HttpParams => {
    // Prepares the HttpParams.
    let inputParams = new HttpParams();

    if (params) {
      for (let key in params) {
        inputParams = inputParams.set(key, JSON.stringify(params[key]));
      }
    }

    return inputParams;
  };
}
