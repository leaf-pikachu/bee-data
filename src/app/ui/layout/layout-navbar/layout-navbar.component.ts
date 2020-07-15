import { Component, Input, HostBinding } from '@angular/core';
import { BeeService } from '@bee/core/service/bee.service';
import { LayoutService } from '@bee/ui/layout/layout.service';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarComponent {
  isExpanded = false;
  isRTL: boolean;

  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') hostClassMain = true;

  constructor(private beeService: BeeService, private layoutService: LayoutService) {
    this.isRTL = beeService.isRTL;
  }

  currentBg() {
    return `bg-${this.beeService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }
}
