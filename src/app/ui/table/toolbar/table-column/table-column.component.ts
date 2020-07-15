import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { TableColumn } from '@swimlane/ngx-datatable';

import { GridTableColumn } from '@bee/core/config/grid/data-table/grid-table-column';

@Component({
  selector: 'bee-toolbar-table-column',
  templateUrl: './table-column.component.html',
  styleUrls: ['./table-column.component.scss']
})
export class TableColumnComponent implements OnInit {
  @Input() columns: GridTableColumn[];
  @Output() showColumnsEvent = new EventEmitter<TableColumn[]>();
  toolbarColumnChange = new EventEmitter<{event: Event, item: GridTableColumn}>();

  constructor() { }

  ngOnInit(): void {
    this.toolbarColumnChange.pipe(
      filter((data: { event, item }) => {
        data.item.showColumn = data.event.target.checked;
        return true;
      }),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(() => this.segmentTableColumn());
  }

  segmentTableColumn() {
    if (this.columns && this.columns.length > 0) {
      let tableColumns:TableColumn[] = [];
      this.columns.forEach(gridTableColumn => {
        if (gridTableColumn.showColumn) {
          tableColumns.push(gridTableColumn);
        }
      });
      this.showColumnsEvent.emit(tableColumns);
    }
  }
}
