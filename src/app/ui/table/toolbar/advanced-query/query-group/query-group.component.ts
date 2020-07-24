import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import UUIDClass from 'uuidjs';
import { CustomQueryColumn } from '@bee/ui/table/toolbar/advanced-query/advanced-query.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bee-query-group',
  templateUrl: './query-group.component.html',
  styleUrls: ['./query-group.component.scss']
})
export class QueryGroupComponent implements OnInit {
  @Input('fieldColumn') formGroup: FormGroup;
  @Output() removeGroup = new EventEmitter();
  @Input() canCustomColumns: CustomQueryColumn[];
  childFieldColumns: FormArray;
  currentConditionId = 0;
  accordionStaticId: string = UUIDClass.generate();
  focusinType: boolean = false;
  constructor(private modal: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.childFieldColumns = <FormArray>this.formGroup.controls.children;
  }

  openModal(content, options = {}) {
    this.modal.open(content, options);
  }

  addCondition() {
    this.currentConditionId = this.currentConditionId + 1;
    this.childFieldColumns.push(
      this.formBuilder.group({
        id: this.currentConditionId,
        groupId: null,
        prefix: true,
        field: '',
        type: '',
        value: '',
        children: null
      })
    );
  }

  removeCondition(index: number) {
    this.childFieldColumns.removeAt(index);
  }
  addGroupQuery() {
    this.currentConditionId = this.currentConditionId + 1;

    this.childFieldColumns.push(
      this.formBuilder.group({
        id: this.currentConditionId,
        groupId: this.currentConditionId,
        prefix: true,
        field: '',
        type: '',
        value: '',
        children: this.formBuilder.array([])
      })
    )
  }
}
