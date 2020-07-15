import { Component } from '@angular/core';
import { BeeService } from '../../core/service/bee.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['not-found.component.css']
})
export class NotFoundComponent {

  constructor(private beeService: BeeService) {
    this.beeService.pageTitle = '404 Not Found';
  }

}
