import { Component, ViewChild } from '@angular/core';
import { BeeService } from '../core/service/bee.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-page-2',
  templateUrl: './page-2.component.html'
})
export class Page2Component {

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  loadingIndicator = true;
  rows = [];
  temp = [];
  selected = [];

  constructor(private beeService: BeeService) {
    this.beeService.pageTitle = 'Page 2';
    this.fetch((data) => {
      // cache our list
      this.temp = [...data];

      // push our inital complete list
      this.rows = data;

      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/json/ngx-datatable-data.json`);

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(d => {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

}
