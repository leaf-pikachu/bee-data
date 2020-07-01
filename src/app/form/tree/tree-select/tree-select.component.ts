import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TreeViewComponent } from '@bee/form/tree/tree-view/tree-view.component';
import { TreeService } from '@bee/form/tree/tree.service';

@Component({
  selector: 'bee-tree-select2',
  templateUrl: './tree-select.component.html'
})
export class Ng2TreeSelectComponent extends TreeViewComponent implements OnInit, OnDestroy {

  constructor(protected loaderServcie: TreeService) {
    super(loaderServcie);
  }

  @Input() alignRight: boolean;
  @Input() dropup: boolean;

  ngOnInit() {
    super.ngOnInit();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
