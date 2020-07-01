import {Component, Input, OnInit} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';

@Component({
  selector: 'bee-tree-select',
  templateUrl: './tree-select.component.html',
  styles: []
})
export class TreeSelectComponent implements OnInit {

  /**
   * NgForm instance
   */
  @Input() beeForm: NgForm;

  /**
   * Bee Reactive FormControl instance
   */
  @Input() beeRFC: FormControl;
  /**
   *  label title
   */
  @Input() labelTitle: string;
  @Input() items: any[];
  @Input() bindLabel: string;
  @Input() bindValue: string;
  @Input() bindChildren: string;
  @Input() multiple: boolean;
  @Input() name: string;
  @Input() expandMode: string;
  @Input() placeholder: string;
  @Input() filterPlaceholder: string;
  @Input() allowParentSelection: boolean;
  @Input() allowFilter: boolean;
  @Input() filterCaseSensitive: boolean;
  @Input() disabled: boolean;


  @Input() color: string;
  isRequired: boolean;

  constructor() { }

  ngOnInit() {
    this.initializeProperties();
  }

  protected initializeProperties(): void {
    this.isRequired = false;
    this.placeholder = this.placeholder || "请选择...";
    this.bindValue = this.bindValue || 'id';
    this.bindLabel = this.bindLabel || 'text';
    this.bindChildren = this.bindChildren || 'children';
    this.expandMode = this.expandMode || 'ALL';
    this.multiple = this.multiple || false;
    this.filterPlaceholder = this.filterPlaceholder || '快速查找.....';
    this.allowParentSelection = this.allowParentSelection || true;
    this.allowFilter = this.allowFilter || true;
    this.filterCaseSensitive = this.filterCaseSensitive || true;
    this.disabled = this.disabled || false;

    this.name = this.name || '' + Date.now();

    // this.maxLength = this.maxLength || null;
    // this.color = this.color || MaterialColorConfig.basic;

    // validator function returns object only contains requiredText property.
    // Whatever how many validators you've set.
    // We just want to get the validators from the FromControl instead of the duplicate @Input parameter.
    // By now Google only provides setValidators method. But no getValidators method.
    // More rowDetails check on https://github.com/angular/angular/issues/13461

    let defaultValue = this.beeRFC.value;

    if (defaultValue) this.beeRFC.setValue(null);
    let validator = this.beeRFC.validator ? this.beeRFC.validator(this.beeRFC) : null;
    if (defaultValue) this.beeRFC.setValue(defaultValue);

    this.isRequired = validator && validator.hasOwnProperty('required');
  }
}
