import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BeeWebSocketService {
  constructor() {
    if ('WebSocket' in window) {
      // alert('当前浏览器支持WebSocket协议，请放心使用！');
    } else {
      alert('当前浏览器不支持WebSocket协议，请更换浏览器！');
    }
  }

  /**
   * 创建WebSocket 链接
   * @param wsUrl
   */
  createWebSocket(wsUrl: string): WebSocket {
    return new WebSocket(wsUrl);
  }
}
