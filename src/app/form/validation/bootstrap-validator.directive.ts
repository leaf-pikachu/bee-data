import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  HostListener, Output, EventEmitter
} from '@angular/core';
// import "bootstrapvalidator";
// import "jquery"
import {BehaviorSubject, Subject} from 'rxjs';

@Directive({
  selector: "[bootstrapValidator]",
  exportAs: "bvInstance"
})
export class BootstrapValidatorDirective implements OnInit {
  @Input("fields") fields: any;
  @Input("operation") operation: any;
  @Input("revalidateSub") revalidateSub: Subject<any>;
  @Output("bvSubmit") bvSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output("bvInstance") bvInstance: EventEmitter<any> = new EventEmitter<any>();


  @HostListener("submit")
  submit = (event) => {
    // Get bootstrapValidator instance
    const bootstrapValidator = this.$form.data("bootstrapValidator");

    // Start form validate
    bootstrapValidator.validate();

    // Form validate check is FALSE
    this.bvSubmit.emit(bootstrapValidator.isValid());

    this.$form.submit();
  };

  @HostListener("reset")
  reset = () => {
    // Get bootstrapValidator instance
    const bootstrapValidator = this.$form.data("bootstrapValidator");
    // Invoke aedReset
    bootstrapValidator.resetForm();
  };

  private $form: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Get Form Dom
    this.$form = $(this.el.nativeElement);
    // Init bootstrapValidator
    this.$form.bootstrapValidator(
      {
        feedbackIcons: {
          valid: 'oi oi-check',
          invalid: 'oi  oi-x',
          validating: 'oi oi-bolt'
        },
        fields: this.fields,
        ...this.operation
      });

    // Emit bootstrapValidatorInstance
    this.bvInstance.emit(this.$form.data("bootstrapValidator"));

    if (this.revalidateSub == null)
      this.revalidateSub = new BehaviorSubject(null);

    // if (this.revalidateSub != null)
    this.revalidateSub.subscribe({next: this.revalidateField});



    // Set Validate False Invoke
    this.$form.submit(function(ev) {
      ev.preventDefault();
    });
  }

  log = () => {
    console.info("可以调用此信息！");
  }

  /**
   * 重新验证给定字段
   * @param field 字符串| jQuery的
   */
  revalidateField = (field) => {
    if (field != null && field !="")
      this.$form.data("bootstrapValidator").revalidateField(field);
  }
}
