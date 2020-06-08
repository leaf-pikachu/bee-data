import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'sidenav-block', // tslint:disable-line
  template: `
  <ng-content></ng-content>
  `
})
export class SidenavBlockComponent {
  @HostBinding('class.sidenav-block') hostClassMain = true;
  @HostBinding('class.d-block') hostClassBlock = true;
}
