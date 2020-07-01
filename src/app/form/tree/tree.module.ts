import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//region Plugins Module import start
//endregion Plugins Module import end

//region BeeFramework start
//module import
import { TreeService } from '@bee/form/tree/tree.service';

//directive import

//component import
import { TreeViewComponent } from '@bee/form/tree/tree-view/tree-view.component';
import { Ng2TreeSelectComponent } from '@bee/form/tree/tree-select/tree-select.component';
import { TreeNodeComponent } from '@bee/form/tree/tree-node/tree-node.component';

//endregion BeeFramework end


@NgModule({
  declarations: [
    TreeNodeComponent,
    TreeViewComponent,
    Ng2TreeSelectComponent
  ],
  imports: [
    CommonModule
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
