import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { TreeService } from '@bee/ui/form/tree/tree.service';
import { TreeItem } from '@bee/ui/form/tree/tree-item';

@Component({
  selector: 'bee-tree-view',
  templateUrl: './tree-view.component.html'
})
export class TreeViewComponent implements OnInit, OnDestroy {

  @Output() load: EventEmitter<null> = new EventEmitter();
  @Output() loadBranch: EventEmitter<string> = new EventEmitter<string>();
  @Output() loadPeers: EventEmitter<string> = new EventEmitter<string>();

  private _treeSelect: TreeItem;

  _items: Array<any>;

  @Input()
  get items() {
    return this._items;
  }
  set items(value) {
    this._items = [];
    let rootItem = new TreeItem(null, '..', '');
    rootItem.children = [];
    rootItem.isOpen = true;
    this._items.push(rootItem);
    if (value && value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        this.addItemToArray(value[i], rootItem.children);
      }
    }
    if (this._select && !this._treeSelect) {
      this._findSelectedItem();
    }
  }

  private addItemToArray(item: any, array: TreeItem[]) {
    const treeItem = new TreeItem(item['id'], item['name'], item['parent']);
    if (item['children']) {
      treeItem.children = [];
      for (let i = 0; i < item['children'].length; i++) {
        this.addItemToArray(item['children'][i], treeItem.children);
      }
    }
    array.push(treeItem);
  }

  @Input() lazyLoad: boolean = true;

  private _select: any;

  @Input()
  get select() {
    return this._select;
  }
  set select(value) {
    this._select = value;
    this._findSelectedItem();
  }

  @Output() selectChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();

  private getItem(id, array) {
    if (!array) return null;
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return array[i];
      }
      if (array[i].children) {
        const childResult = this.getItem(id, array[i].children);
        if (childResult) return childResult;
      }
    }
    return null;
  }
  private _findSelectedItem() {
    if (!this._select) {
      this._treeSelect = null;
      return;
    }
    if (this._treeSelect && this._treeSelect.id === this._select['id']) {
      return;
    }
    this._treeSelect = null;
    if (!this._select) {
      return;
    }
    if (!this._items || this._items.length === 0) return;
    const item = this.getItem(this._select['id'], this._items);

    if (item) {
      this._treeSelect = item;
      this._treeSelect.selected = true;
      this._select = this._treeSelect;
      this.selectChange.emit(this._select);
      this.itemSelected.emit(this._select);
      let curParent = this.findParent(item.parent, this._items);
      while (curParent) {
        curParent.isOpen = true;
        curParent = this.findParent(curParent.parent, this._items);
      }

    }
    if (!this._treeSelect && this.lazyLoad && this._select['parent']) {
      this.loadBranch.emit(this._select['parent']);
    }
  }

  private branchLoaded(parents: Array<any>) {
    if (!(parents && parents instanceof Array &&  parents.length > 0)) return;
    for (let i = 0; i < parents.length; i++) {
      if (parents[i].parent) {
        const parent = new TreeItem(parents[i]['id'], parents[i]['name'], parents[i]['parent']);
        const superParent = this.findParent(parent.parent, this._items);
        if (!superParent) continue;
        if (!superParent.children) {
          superParent.children = [];
        }
        superParent.children.push(parent);
        this.loadPeers.emit(parent.id);
      } else {
        let found = false;
        let array = this._items;
        if (this._items.length > 0 && !this._items[0].id && this._items[0].children) {
          array = this._items[0].children;
        }
        for (let j = 0; j < array.length; j++) {
          if (array[i].id === parents[i]['id']) {
            found = true;
            break;
          }
        }

        if (!found) {
          array.push(new TreeItem(parents[i]['id'], parents[i]['name']));
        }
      }
    }
    this.loadPeers.emit(parents[parents.length - 1].id);
  }

  private findParent(id: string, items) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id === id) {
        return item;
      }
      if (item.children) {
        const parent =  this.findParent(id, item.children);
        if (parent) {
          return parent;
        }
      }
    }
    return null;
  }

  private peersLoaded(peers: Array<any>) {
    if (!peers || peers.length === 0) return;
    const parent = this.findParent(peers[0].parent, this._items);
    if (!parent) return;
    parent.children = peers.map(item => {
      const treeItem = new TreeItem(item['id'], item['name'], item['parent']);
      if (this._select && !this._treeSelect) {
        if (this._select['id'] === treeItem.id) {
          treeItem.selected = true;
          this._treeSelect = treeItem;
          this._select = treeItem;
          this.selectChange.emit(this._select);
          this.itemSelected.emit(this._select);
          let curParent = parent;
          while (curParent) {
            curParent.isOpen = true;
            curParent = this.findParent(curParent.parent, this._items);
          }

        }
      }
      return treeItem;
    });
    parent.isLoaded = true;
  }


  filter: string;

  private branchLoadSub: Subscription;
  private peersLoadSub: Subscription;

  constructor(protected loaderServcie: TreeService) { }

  ngOnInit() {
    this.branchLoadSub = this.loaderServcie.branchLoadEvent.subscribe(values => {
      this.branchLoaded(values);

    });
    this.peersLoadSub = this.loaderServcie.peersLoadEvent.subscribe(values => {
      this.peersLoaded(values);
    });
    this.load.emit();
  }


  ngOnDestroy() {
    if (this.branchLoadSub) {
      this.branchLoadSub.unsubscribe();
    }
    if (this.peersLoadSub) {
      this.peersLoadSub.unsubscribe();
    }
  }

  itemSelected_($event: any) {
    if (this.selectChange) {
      this.selectChange.emit($event.item);
      this.itemSelected.emit($event.item);
    }
    if (this._items) {
      this._items.forEach(it => {
        it.itemSelected($event.item);
      })
    }
    this._treeSelect = $event.item;
    this._select = this._treeSelect;
  }

  itemLoad(item: TreeItem) {
    if (this.lazyLoad) {
      this.loadPeers.emit(item.id);
    } else {
      item.isLoaded = true;
    }
  }

}
