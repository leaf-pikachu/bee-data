import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ToolbarComponent } from '@bee/ui/table/toolbar/toolbar.component';
import { TableColumnComponent } from '@bee/ui/table/toolbar/table-column/table-column.component';



@NgModule({
  declarations: [ToolbarComponent, TableColumnComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbTooltipModule,
  ], exports: [ToolbarComponent, TableColumnComponent]
})
export class BeeToolbarModule { }
