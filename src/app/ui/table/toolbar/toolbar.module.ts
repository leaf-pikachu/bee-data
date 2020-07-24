import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import {NgbAccordionModule, NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

import { ToolbarComponent } from '@bee/ui/table/toolbar/toolbar.component';
import { TableColumnComponent } from '@bee/ui/table/toolbar/table-column/table-column.component';
import { AdvancedQueryComponent } from './advanced-query/advanced-query.component';
import { QueryGroupComponent } from './advanced-query/query-group/query-group.component';
import { QueryConditionComponent } from './advanced-query/query-condition/query-condition.component';
import {NgSelectModule} from '@ng-select/ng-select';



@NgModule({
  declarations: [ToolbarComponent, TableColumnComponent, AdvancedQueryComponent, QueryGroupComponent, QueryConditionComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgbDropdownModule,
        NgbTooltipModule,
        NgbAccordionModule,
        ReactiveFormsModule,
        NgSelectModule,
    ], exports: [ToolbarComponent, TableColumnComponent]
})
export class BeeToolbarModule { }
