import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { TreeItem } from "../tree-item";

@Component({
  selector: 'ng-tree-node',
  templateUrl: './tree-node.component.html'
})
export class TreeNodeComponent implements OnInit, OnDestroy {

  @Input() item: TreeItem;
  @Output() itemLoad = new EventEmitter<TreeItem>();
  @Output() select = new EventEmitter<TreeItem>();

  private _over: boolean = false;

  private loadSubscription: Subscription;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.loadSubscription) {
      this.loadSubscription.unsubscribe();
    }
  }

  private loadItem() {
    if (this.item.isOpen && !this.item.isLoaded) {
      if (this.itemLoad) {
        this.itemLoad.emit(this.item);
      }
    }
  }

  toggleOpen($event) {
    $event.stopPropagation();
    this.item.isOpen = !this.item.isOpen;
    this.loadItem();
  }

  open($event) {
    this._over = true;
    if ($event)
      $event.stopPropagation();
    setTimeout(_ => {
      if (this._over) {
        this.item.isOpen = true;
        this.loadItem();
      }
    }, 1000);
  }

  close($event) {
    this._over = false;
    if ($event)
      $event.stopPropagation();
    // $event.stopPropagation();
    if (this.item.id !== null) {
      setTimeout( _ => {
        if (!this._over) {
          this.item.isOpen = false;
        }
      }, 1000);
    }

  }

  itemSelected($event: any) {
    if (!$event.item) $event.item = this.item;
    if (this.select) {
      this.select.emit($event);
    }
    if (this.item.id === $event.item.id) {
      this.item.selected = true;
    }
    this.item.itemSelected($event.item);
  }

  itemLoading(item: TreeItem) {
    if (this.itemLoad) {
      this.itemLoad.emit(item);
    }
  }

}
