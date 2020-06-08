import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class BeeService {
  constructor(private titleService:Title, private storage: Storage) {
    this.storage.set('zhangyu', 'woani').then(value => console.info(value));
  }

  /**
   * 设置页面title
   * @param title
   */
  set pageTitle(title: string) {
    this.titleService.setTitle(title)
  }

  /**
   * 检查当前layout是否是rtl布局
   */
  get isRTL(): boolean {
    return document.documentElement.getAttribute('dir') === 'rtl' ||
      document.body.getAttribute('dir') === 'rtl';
  }

  /**
   * 检查当前浏览器是否是IE10
   */
  get isIE10(): boolean {
    return typeof document['documentMode'] === 'number' && document['documentMode'] === 10;
  }

  // Layout navbar color
  get layoutNavbarBg() {
    return 'navbar-theme';
  }

  // Layout sidenav color
  get layoutSidenavBg() {
    return 'sidenav-theme';
  }

  // Layout footer color
  get layoutFooterBg() {
    return 'footer-theme';
  }

  // Animate scrollTop
  scrollTop(to: number, duration: number, element = document.scrollingElement || document.documentElement) {
    if (element.scrollTop === to) { return; }
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();

    // t = current time; b = start value; c = change in value; d = duration
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) { return c / 2 * t * t + b; }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animateScroll = () => {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10);
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };

    animateScroll();
  }
}
