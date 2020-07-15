import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { GridTableColumn } from '@bee/core/config/grid/data-table/grid-table-column';

@Component({
  selector: 'bee-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() columns: GridTableColumn[];
  @Output() showColumnsEvent = new EventEmitter<TableColumn[]>();

  constructor() { }

  ngOnInit(): void {
  }

}
