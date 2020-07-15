import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeService } from '@bee/ui/form/tree/tree.service';
import { TreeViewComponent } from '@bee/ui/form/tree/tree-view/tree-view.component';
import { Ng2TreeSelectComponent } from '@bee/ui/form/tree/tree-select/tree-select.component';
import { TreeNodeComponent } from '@bee/ui/form/tree/tree-node/tree-node.component';
import { LabelComponent } from '@bee/ui/form/basic-common/label/label.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    TreeNodeComponent,
    TreeViewComponent,
    Ng2TreeSelectComponent,
    LabelComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TreeNodeComponent,
    TreeViewComponent,
    Ng2TreeSelectComponent
  ],
  providers: [
    TreeService
  ]
})
export class TreeModule { }
