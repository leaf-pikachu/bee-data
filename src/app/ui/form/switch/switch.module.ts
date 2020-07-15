import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ValidateErrorMsgModule } from '@bee/ui/form/validate-error-msg/validate-error-msg.module';
import { SwitchIconPipe } from '@bee/ui/form/switch/switch-icon/switch-icon.pipe';
import { SwitchIconComponent } from '@bee/ui/form/switch/switch-icon/switch-icon.component';
import { LabelComponent } from '@bee/ui/form/basic-common/label/label.component';
import { BasicCommonModule } from '@bee/ui/form/basic-common/basic-common.module';


@NgModule({
  declarations: [
    SwitchIconComponent,
    SwitchIconPipe

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicCommonModule,
    ValidateErrorMsgModule
  ],
  exports: [
    SwitchIconComponent,
    SwitchIconPipe
  ]
})
export class SwitchModule { }
