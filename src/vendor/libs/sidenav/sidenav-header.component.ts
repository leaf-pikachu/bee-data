import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'sidenav-header', // tslint:disable-line
  template: `
  <ng-content></ng-content>
  `
})
export class SidenavHeaderComponent {
  @HostBinding('class.sidenav-header') hostClassMain = true;
  @HostBinding('class.d-block') hostClassBlock = true;
}
