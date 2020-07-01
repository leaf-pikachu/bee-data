import { Injectable } from '@angular/core';
import { Observable, Observer, Subject} from 'rxjs';
import { environment } from '@bee/environment';
import { NotificationService } from '@bee/core/notifications/notification.service';
import { BeeWebSocketService } from '@bee/core/websocket/bee-websocket.service';


@Injectable({
  providedIn: 'root'
})
export class SystemWebSocketService {
  private ws: WebSocket;

  constructor(private $webSocket: BeeWebSocketService, private notification: NotificationService) { }

  /**
   * 创建System WebSocket
   * @param wsUrl
   * @param nodeId
   */
  crateSystemWebSocket(wsUrl: string, nodeId: any): Subject<MessageEvent> {
    wsUrl =  environment.beeframework.wsapi + wsUrl;
    this.ws = this.$webSocket.createWebSocket(wsUrl);

    this.ws.onopen = () => {
      this.notification.info('已订阅系统服务广播！');
    };

    let observable = new Observable((obs: Observer<MessageEvent>) => {
      this.ws.onmessage = obs.next.bind(obs);
      this.ws.onerror = obs.error.bind(obs);
      this.ws.onclose = obs.complete.bind(obs);
      return this.ws.onclose.bind(this.ws);
    });


    let observer = {
      next: (data: any) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(data);
        }
      }
    };

    return Subject.create(observer, observable);
  }

  /**
   * 关闭System WebSocket
   */
  closeSystemWebSocket() {
    this.ws.close();
  }
}
