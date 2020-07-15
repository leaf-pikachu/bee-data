import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'bee-layout-menu',
  templateUrl: './layout-menu.component.html',
  styles: [
  ]
})
export class LayoutMenuComponent implements OnInit {
  @Input() orientation = 'vertical';

  @Input() menus: Menu[];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.info(this.menus);
  }

  isActive(url) {
    return this.router.isActive(url, true);
  }

  isMenuActive(url) {
    return this.router.isActive(url, false);
  }

  isMenuOpen(url) {
    return this.router.isActive(url, false) && this.orientation !== 'horizontal';
  }
}

export interface Menu {
  icon: string;
  title: string;
  clientUrl: string;
  childMenus: Menu[];
}
