import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomQueryColumn } from '@bee/ui/table/toolbar/advanced-query/advanced-query.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConditionType, stringConditionTypes } from '@bee/core/config/grid/query-condition';

@Component({
  selector: 'bee-query-condition',
  templateUrl: './query-condition.component.html',
  styleUrls: ['./query-condition.component.scss']
})
export class QueryConditionComponent implements OnInit {
  readonly FIELD_KEY = 'field';
  @Input() fieldColumn: FormGroup;
  @Input() canCustomColumns: CustomQueryColumn[];
  @Output() removeCondition = new EventEmitter();

  conditionTypes: ConditionType[] = stringConditionTypes;

  fieldName: string;
  conditionTypeName: string;
  focusinType: boolean = false;
  constructor(private ngbModal: NgbModal) { }

  ngOnInit(): void {
    let fieldControl = this.fieldControl();

    if (!fieldControl?.value) {
      if (this.canCustomColumns && this.canCustomColumns.length > 0) {
        let column = this.canCustomColumns[0];
        fieldControl.setValue(column.field);
        this.fieldName = column.text;
      }
    } else {
      this.canCustomColumns.forEach(column => {
        if (column.type === fieldControl.value) {
          this.fieldName = column.text
        }
      })
    }
  }

  open(content, options = {}) {
    this.ngbModal.open(content, options);
  }

  fieldControl() {
    return this.fieldColumn.controls[this.FIELD_KEY];
  }
}
