import { Component } from '@angular/core';
import { BeeService } from '../core/bee.service';

@Component({
  selector: 'app-page-2',
  templateUrl: './page-2.component.html'
})
export class Page2Component {

  constructor(private beeService: BeeService) {
    this.beeService.pageTitle = 'Page 2';
  }

}
