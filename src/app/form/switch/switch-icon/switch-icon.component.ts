import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isString } from "ts-util-is";

/**
 *  Value 'f' or 't'
 */
@Component({
  selector: 'bee-switch-icon',
  templateUrl: './switch-icon.component.html',
  styles: []
})
export class SwitchIconComponent implements OnInit {
  /**
   * Bee Reactive FormControl instance
   */
  @Input() beeRFC: FormControl;
  /**
   *  label title
   */
  @Input() labelTitle: string;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
    this.beeRFC.setValue(this.beeRFC.value === 't' || this.beeRFC.value === true);
    this.beeRFC.valueChanges.subscribe(value => {

      if (isString(value)) {

        if (value.toLocaleString().trim() === 't') {
          this.beeRFC.setValue(true);
        } else {
            this.beeRFC.setValue(false);
        }

      }
    });
  }
}
