import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from '@bee/ui/form/basic-common/error-msg/error-msg.component';
import { LabelComponent } from '@bee/ui/form/basic-common/label/label.component';



@NgModule({
  declarations: [
    ErrorMsgComponent,
    LabelComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ErrorMsgComponent,
    LabelComponent,
  ]
})
export class BasicCommonModule { }
