import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextareaComponent } from '@bee/ui/form/textarea/textarea.component';
import { ValidateErrorMsgModule } from '@bee/ui/form/validate-error-msg/validate-error-msg.module';
import { LabelComponent } from '@bee/ui/form/basic-common/label/label.component';
import { BasicCommonModule } from '@bee/ui/form/basic-common/basic-common.module';



@NgModule({
  declarations: [
    TextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicCommonModule
  ],
  exports: [
    TextareaComponent,
  ]
})
export class TextareaModule { }
