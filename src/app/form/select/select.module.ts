import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

//region Plugins Module import start
import { NgSelectModule} from '@ng-select/ng-select';
import { TreeSelectDefaultOptions } from 'ngx-tree-select';
//endregion Plugins Module import end

//region BeeFramework start
//module import

//directive import

//component import

import { TreeSelectComponent } from '@bee/form/select/tree-select/tree-select.component';
import { SelectComponent } from '@bee/form/select/select.component';
import { ValidateErrorMsgModule } from '@bee/form/validate-error-msg/validate-error-msg.module';
//endregion BeeFramework end

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

    NgSelectModule,
    // NgxTreeSelectModule.forRoot(ngxTreeSelectOperation),

    ValidateErrorMsgModule
  ],
  exports: [
    NgSelectModule,
    SelectComponent,
    TreeSelectComponent,
  ],
  providers: []
})
export class SelectModule { }
