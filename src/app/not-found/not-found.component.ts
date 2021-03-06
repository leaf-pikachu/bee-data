import { Component } from '@angular/core';
import { BeeService } from '../core/bee.service';
import { BeeThemeService } from '@bee/core/theme/bee-theme.service';

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
