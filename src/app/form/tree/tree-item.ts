export class TreeItem {
  id: string;
  name: string;
  parent: string;
  children: TreeItem[];
  isLoaded: boolean;
  isOpen: boolean;
  get hasChildren() {
    return this.children && this.children.length > 0;
  }
  selected: boolean;

  constructor(id: string, name: string, parent: string = null) {
    this.id = id;
    this.name = name;
    this.parent = parent;
  }

  itemSelected(item: TreeItem) {
    if (this.id !== item.id) {
      this.selected = false;
    }
    if (this.children) {
      this.children.forEach(it => {
        it.itemSelected(item);
      })
    }
  }
}
