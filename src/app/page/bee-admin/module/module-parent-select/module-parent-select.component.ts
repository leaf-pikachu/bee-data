import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { BeeFormTools } from '@bee/config/validator/bee-form-tools';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { ElementState, elementStateSegment } from '@bee/form/bee-form-element';
@Component({
  selector: 'bee-module-parent-select',
  templateUrl: './module-parent-select.component.html',
  styleUrls: ['/src/vendor/libs/ng-select/ng-select.scss']
})
export class ModuleParentSelectComponent implements OnInit, OnChanges, OnDestroy {
  ngOnChanges(changes: SimpleChanges): void {
    let systemRowIdChange = changes['systemRowId'];
    let moduleLevelChange = changes['moduleLevel'];

    if ((systemRowIdChange && !systemRowIdChange.firstChange) ||
      (moduleLevelChange && !moduleLevelChange.firstChange)) {
        this.loadParentModules();
    }

  }


  readonly requestUrl = '/admin/module/loadGrid'
  /**
   * NgForm instance
   */
  @Input() beeForm: NgForm;
  @Input() elementState: ElementState;
  @Input() systemRowId: number;
  @Input() moduleLevel: number;
  isRequired: boolean = false;

  /**
   * Bee Reactive FormControl instance
   */
  beeRFC: FormControl;

  photos = [];
  photosBuffer = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;
  searchEvent = new EventEmitter();
  totalRecord = 0;
  constructor(private http: HttpClient, private $http: BeeHttpService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos').subscribe(photos => {
      this.photos = photos;
      this.photosBuffer = this.photos.slice(0, this.bufferSize);
    });

    this.loadParentModules();
    this.initializeProperties();

    this.searchEvent.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchValue => console.log(searchValue));

    console.log(`系统RowId:${this.systemRowId}, 模块等级： ${this.moduleLevel}`);
  }

  loadParentModules() {
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

  ngOnDestroy(): void {
    this.searchEvent.unsubscribe();
  }
  protected initializeProperties(): void {
    this.beeRFC = elementStateSegment(this.formBuilder, this.elementState);
    this.isRequired = BeeFormTools.checkRequired(this.beeRFC);
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  /**
   * 滚动条定位数据不足规定值时触发加载
   * @param end
   */
  onScroll({ end }) {
    if (this.loading || this.photos.length <= this.photosBuffer.length) {
      return;
    }

    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.photosBuffer.length) {
      this.fetchMore();
    }
  }

  private fetchMore() {
    const len = this.photosBuffer.length;
    const more = this.photos.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
      this.loading = false;
      this.photosBuffer = this.photosBuffer.concat(more);
    }, 200)
  }


  /**
   * 搜索
   * @param searchText 值
   */
  onSearch =  (searchText: string) => {
    this.searchEvent.emit(searchText);
  }

}
