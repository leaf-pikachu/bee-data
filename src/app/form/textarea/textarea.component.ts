import {Component, Input, OnInit} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {BeeRequired} from '@bee/config/validator/bee-required';
import {BeeFormTools} from '@bee/config/validator/bee-form-tools';

@Component({
  selector: 'bee-textarea',
  templateUrl: './textarea.component.html',
  styles: []
})
export class TextareaComponent implements OnInit {
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
  @Input() name: string;
  @Input() placeholder: string;
  @Input() color: string;
  @Input() rows: string;

  isRequired: boolean;

  constructor() { }

  ngOnInit() {
    this.initializeProperties();
  }

  protected initializeProperties(): void {
    this.isRequired = false;
    this.placeholder = this.placeholder || '';
    this.rows = this.rows || '3';
    // this.maxLength = this.maxLength || null;
    // this.color = this.color || MaterialColorConfig.basic;

    // validator function returns object only contains requiredText property.
    // Whatever how many validators you've set.
    // We just want to get the validators from the FromControl instead of the duplicate @Input parameter.
    // By now Google only provides setValidators method. But no getValidators method.
    // More rowDetails check on https://github.com/angular/angular/issues/13461
    this.isRequired = BeeFormTools.checkRequired(this.beeRFC);
  }
}
