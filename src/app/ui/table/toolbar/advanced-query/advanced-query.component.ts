import { Component, Input, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { GridTableColumn } from '@bee/core/config/grid/data-table/grid-table-column';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

export interface CustomQueryColumn {
  field: string;
  text: string;
  type: 'string' | 'number' | 'date' | 'date-time'| 'time'| 'boolean';
}
@Component({
  selector: 'bee-toolbar-advanced-query',
  templateUrl: './advanced-query.component.html',
  styleUrls: ['./advanced-query.component.scss']
})
export class AdvancedQueryComponent implements OnInit {
  @Input() gridColumns: GridTableColumn[];
  disabled: boolean = false;
  canCustomColumns: CustomQueryColumn[] = [];

  formGroup: FormGroup;
  fieldColumns: FormArray;
  currentConditionId = 0;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.fieldColumns = this.formBuilder.array([]);
    this.formGroup = this.formBuilder.group({
      'fieldColumns': this.fieldColumns
    })
  }

  ngOnInit(): void {
    if (this.gridColumns && this.gridColumns.length > 0) {
      this.canCustomColumns = this.gridColumns.filter(column => {
        return column.customQuery;
      }).map(column => {
        return <CustomQueryColumn>{field: column.prop, text: column.name, type: column.type};
      });
    }
  }

  open(content, options = {}) {
    this.modalService.open(content, options).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addCondition() {
    this.currentConditionId = this.currentConditionId + 1;
    this.fieldColumns.push(
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
    this.fieldColumns.removeAt(index);
  }
  addGroupQuery() {
    this.currentConditionId = this.currentConditionId + 1;

    this.fieldColumns.push(
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
