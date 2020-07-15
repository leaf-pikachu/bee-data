import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateErrorMsgComponent } from '@bee/ui/form/validate-error-msg/validate-error-msg.component';

@NgModule({
  declarations: [
    ValidateErrorMsgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ValidateErrorMsgComponent
  ]
})
export class ValidateErrorMsgModule { }
