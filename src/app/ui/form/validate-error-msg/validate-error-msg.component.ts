import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { validatorKeys } from '@bee/core/config/validator/validator-config';

@Component({
  selector: 'bee-validate-error-msg',
  templateUrl: './validate-error-msg.component.html'
})
export class ValidateErrorMsgComponent implements OnInit {
  /**
   * validateForm instance
   */
  @Input() validateForm: NgForm;
  /**
   * validateFormControl instance
   */
  @Input() validateFormControl: FormControl;
  /**
   *  label title
   */
  @Input() title: string;

  errorKeys = validatorKeys;

  constructor() { }

  ngOnInit() {
    // this.validateFormControl.hasError();
    // this.validateFormControl.errors != null;
  }

}
