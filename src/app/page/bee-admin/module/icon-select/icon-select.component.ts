import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BeeFormTools } from '@bee/config/validator/bee-form-tools';
import {ElementState, elementStateSegment} from '@bee/form/bee-form-element';

@Component({
  selector: 'bee-icon-select',
  templateUrl: './icon-select.component.html',
  styleUrls: ['/src/vendor/libs/ng-select/ng-select.scss']
})
export class IconSelectComponent implements OnInit, OnDestroy {


  readonly requestUrl = '/admin/module/icons'
  /**
   * NgForm instance
   */
  @Input() beeForm: NgForm;

  @Input() elementState: ElementState;

  /**
   * Bee Reactive FormControl instance
   */
  beeRFC: FormControl;

  @Input() systemRowId: number;
  @Input() moduleLevel: number;
  isRequired: boolean = false;
  photos = [];
  photosBuffer = [];
  pageNo = 0;
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;
  searchEvent = new EventEmitter();
  totalRecord = 0;
  searchText = '';
  constructor(private $http: BeeHttpService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.fetchMore();
    this.initializeProperties();
    this.searchEvent.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchValue => {
      this.pageNo = 0;
      this.searchText = searchValue;
      this.fetchMore();
    });
  }

  ngOnDestroy(): void {
    this.searchEvent.unsubscribe();
  }
  protected initializeProperties(): void {
    this.beeRFC =  elementStateSegment(this.formBuilder, this.elementState);
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
    this.loading = true;
    this.pageNo = this.pageNo + 1;

    this.$http.post(this.requestUrl, {
      pageSize: this.bufferSize,
      pageNo: this.pageNo,
      filters: this.searchText? [{
        id: 1,
        prefix: 'and',
        field: 'code',
        mode: 'condition',
        type: 'like',
        value: `%${this.searchText}%`
      }] : []
    }, false).subscribe((value: any) => {

      if (this.pageNo == 1) {
        this.elementState.items = value.result;
      } else {
        this.elementState.items = this.elementState.items.concat(value.result);
      }
      this.totalRecord = value.totalRecord;
      // this.items = value.result;
      this.loading = false;
      console.log(value)
    });
  }


  /**
   * 搜索
   * @param searchText 值
   */
  onSearch =  (searchText: string) => {
    this.searchEvent.emit(searchText);
  }

}
