import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//region Plugins Module import start
//endregion Plugins Module import end

//region BeeFramework start
//module import

//directive import
import { BootstrapValidatorDirective } from '@bee/form/validation/bootstrap-validator.directive';

//component import

//endregion BeeFramework end


@NgModule({
  declarations: [
    BootstrapValidatorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BootstrapValidatorDirective
  ]
})
export class ValidationModule { }
