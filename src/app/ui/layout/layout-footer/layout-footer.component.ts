import { Component, HostBinding } from '@angular/core';
import {BeeService} from '@bee/core/service/bee.service';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './layout-footer.component.html',
  styles: [':host { display: block; }']
})
export class LayoutFooterComponent {
  @HostBinding('class.layout-footer') hostClassMain = true;

  constructor(private beeService: BeeService) {}

  currentBg() {
    return `bg-${this.beeService.layoutFooterBg}`;
  }
}
