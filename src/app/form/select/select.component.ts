import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { BeeFormTools } from '@bee/config/validator/bee-form-tools';

@Component({
  selector: 'bee-select',
  templateUrl: './select.component.html',
  styleUrls: [
    '../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class SelectComponent implements OnInit {
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
  @Input() placeholder: string;
  @Input() color: string;
  isRequired: boolean = false;

  constructor() { }

  ngOnInit() {
    this.initializeProperties();
  }

  protected initializeProperties(): void {
    this.placeholder = this.placeholder || '';
    this.bindValue = this.bindValue || 'id';
    this.bindLabel = this.bindLabel || 'text';
    // this.maxLength = this.maxLength || null;
    // this.color = this.color || MaterialColorConfig.basic;
    this.isRequired = BeeFormTools.checkRequired(this.beeRFC);
  }
}
