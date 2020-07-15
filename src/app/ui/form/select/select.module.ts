import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgSelectModule} from '@ng-select/ng-select';
import { TreeSelectDefaultOptions } from 'ngx-tree-select';

import { TreeSelectComponent } from '@bee/ui/form/select/tree-select/tree-select.component';
import { SelectComponent } from '@bee/ui/form/select/select.component';
import { BasicCommonModule } from '@bee/ui/form/basic-common/basic-common.module';

const ngxTreeSelectOperation : TreeSelectDefaultOptions = {
  allowFilter: true,
  filterPlaceholder: '快速查找.....',
  maxVisibleItemCount: 5,
  allowParentSelection: true,
  idField: 'id',
  textField: 'text',
  childrenField: 'children',
  filterCaseSensitive: false,
  expandMode: '666',
};

@NgModule({
  declarations: [
    SelectComponent,
    TreeSelectComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicCommonModule,
    NgSelectModule,
    // NgxTreeSelectModule.forRoot(ngxTreeSelectOperation),
  ],
  exports: [
    NgSelectModule,
    SelectComponent,
    TreeSelectComponent,
  ],
  providers: []
})
export class SelectModule { }
