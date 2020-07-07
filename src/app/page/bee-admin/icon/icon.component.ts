import { Component, OnInit } from '@angular/core';
import { BeeService } from '@bee/core/service/bee.service';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: [
    './icon.component.scss'
  ]
})
export class IconComponent implements OnInit {
  icons: any[];

  constructor(private beeService: BeeService, private $http: BeeHttpService) {
    this.beeService.pageTitle = '系统Icons';

    this.$http.post('/admin/module/icons', {
      pageNo: 1,
      pageSize: 500
    }, false).subscribe((data: any) => this.icons = data.result);
  }

  getIconClass(icon) {
    return `.${icon[0]}.fa-${icon[1]}`;
  }

  search($event) {
    $event.pipe(debounceTime(500), distinctUntilChanged());
    const val = String($event.target.value).replace(/^\s+|\s+$/g, '');

    if (!val) {
      // this.icons = iconList.slice(0);
      return;
    }

  }

  ngOnInit(): void {
  }

}
