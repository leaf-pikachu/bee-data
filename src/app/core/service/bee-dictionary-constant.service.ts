import { Injectable } from '@angular/core';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { BeeStorageService } from '@bee/core/service/bee-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BeeDictionaryConstantService {

  constructor(public $http: BeeHttpService, private $storage: BeeStorageService) { }

  /**
   * 加载常量
   * @param parent
   * @param acceptProcess
   */
  loadConstants(parent: number | string, acceptProcess: (value) => void) {
    parent = '' + parent;

    this.serveOrClientLoad(parent, '/dictionary/constant/' + parent, {}, acceptProcess);

    // this.$storage.get(parent, value => serveOrClientLoad(value));
  }

  /**
   * 加载开发系统数据
   * @param acceptProcess
   */
  loadSystems(acceptProcess: (value) => {}) {
    let key = 'SYSTEMS_DEVELOPMENT_DATA';
    this.serveOrClientLoad(key, '/development/system/loadSelect', {}, acceptProcess);
  }

  /**
   * 客户端或服务端加载数据
   * @param key           存放客户端KEY
   * @param url           服务端请求的URL
   * @param params        服务端请求数据
   * @param acceptProcess 数据回传函数操作
   */
   serveOrClientLoad(key: string, url: string, params: {}, acceptProcess: (value) => void) {
    let loadData = (clientResult: any, key: string | number, url: string, params: {}, acceptProcess: (value) => void) => {

      if (clientResult == null) {
        this.$http.get(url, params, false).subscribe(
          (value: any) => {
            this.$storage.set(key, value);
            acceptProcess(value);
          }
        );
      } else {
        acceptProcess(clientResult);
      }

    };
    this.$storage.get(key, value => loadData(value, key, url, {}, acceptProcess));
  }

  /**
   * 服务器端加载数据
   * @param url
   * @param params
   * @param acceptProcess
   */
  serveLoad(url: string, params: {}, acceptProcess: (value) => any) {
    this.$http.get(url, params, false).subscribe(
      (value: any) => {
        acceptProcess(value);
      });
  }
}
