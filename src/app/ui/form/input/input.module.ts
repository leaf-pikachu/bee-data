import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ValidateErrorMsgModule } from '@bee/ui/form/validate-error-msg/validate-error-msg.module';
import { GroupInputComponent } from '@bee/ui/form/input/group-input/group-input.component';
import { InputComponent } from '@bee/ui/form/input/input.component';
import { LabelComponent } from '@bee/ui/form/basic-common/label/label.component';
import {BasicCommonModule} from '@bee/ui/form/basic-common/basic-common.module';





@NgModule({
  declarations: [
    GroupInputComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicCommonModule,
  ],
  exports: [
    GroupInputComponent,
    InputComponent,
  ]
})
export class InputModule { }
