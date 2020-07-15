import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { validatorKeys } from '@bee/core/config/validator/validator-config';

@Component({
  selector: 'bee-error-msg',
  templateUrl: './error-msg.component.html'
})
export class ErrorMsgComponent implements OnInit {
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
