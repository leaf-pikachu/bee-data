import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { BeeFormTools } from '@bee/core/config/validator/bee-form-tools';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { ElementState, elementStateSegment } from '@bee/ui/form/bee-form-element';
import { Subject } from 'rxjs';
@Component({
  selector: 'bee-module-parent-select',
  templateUrl: './module-parent-select.component.html',
  styleUrls: ['/src/vendor/libs/ng-select/ng-select.scss']
})
export class ModuleParentSelectComponent implements OnInit, OnChanges, OnDestroy {


  readonly requestUrl = '/admin/module/loadGrid'
  /**
   * NgForm instance
   */
  @Input() beeForm: NgForm;
  @Input() elementState: ElementState;
  @Input() systemRowId: number;
  @Input() moduleLevel: number;

  searchEvent = new Subject<string>();
  isRequired: boolean = false;

  /**
   * Bee Reactive FormControl instance
   */
  beeRFC: FormControl;
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;
  totalRecord = 0;
  constructor(private http: HttpClient, private $http: BeeHttpService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loadParentModules();
    this.initializeProperties();

    this.searchEvent.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchValue => console.log(searchValue));

    console.log(`系统RowId:${this.systemRowId}, 模块等级： ${this.moduleLevel}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    let systemRowIdChange = changes['systemRowId'];
    let moduleLevelChange = changes['moduleLevel'];

    if ((systemRowIdChange && !systemRowIdChange.firstChange) ||
      (moduleLevelChange && !moduleLevelChange.firstChange)) {
      this.loadParentModules();
    }

  }

  ngOnDestroy(): void {
    this.searchEvent.unsubscribe();
  }

  loadParentModules() {
    if (this.loading || this.totalRecord <= this.elementState.items?.length) {
      return;
    }
    this.loading = true;
    this.$http.post(this.requestUrl, {
      pageSize: this.bufferSize,
      pageNo: 1,
      filters: [{
        id: 1,
        prefix: 'and',
        field: 'systemRowId',
        mode: 'condition',
        type: 'eq',
        value: this.systemRowId
      }, {
        id: 1,
        prefix: 'and',
        field: 'moduleLevel',
        mode: 'condition',
        type: 'eq',
        value: this.moduleLevel -1
      }]
    }, false).subscribe((value: any) => {
      this.totalRecord = value.totalRecord;
      this.elementState.items = value.result;
      console.log(value)
    });
  }


  protected initializeProperties(): void {
    this.beeRFC = elementStateSegment(this.formBuilder, this.elementState);
    this.elementState.bindValue = 'rowId';
    this.elementState.bindLabel = 'chName';
    this.isRequired = BeeFormTools.checkRequired(this.beeRFC);
  }

  onScrollToEnd() {
    this.loadParentModules();
  }

  /**
   * 滚动条定位数据不足规定值时触发加载
   * @param end
   */
  onScroll({ end }) {


    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.elementState.items?.length) {
      this.loadParentModules();
    }
  }


}
