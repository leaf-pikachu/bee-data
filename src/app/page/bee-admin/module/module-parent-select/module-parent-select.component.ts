import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { BeeFormTools } from '@bee/config/validator/bee-form-tools';
import { HttpClient } from '@angular/common/http';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {disableDebugTools} from '@angular/platform-browser';
@Component({
  selector: 'bee-module-parent-select',
  templateUrl: './module-parent-select.component.html',
  styleUrls: ['/src/vendor/libs/ng-select/ng-select.scss']
})
export class ModuleParentSelectComponent implements OnInit, OnDestroy {


  /**
   * NgForm instance
   */
  @Input() beeForm: NgForm;

  /**
   * Bee Reactive FormControl instance
   */
  @Input() beeRFC: FormControl;
  /**
   *  label title
   */
  @Input() labelTitle: string;
  @Input() bindLabel: string;
  @Input() bindValue: string;
  @Input() placeholder: string;
  @Input() color: string;
  @Input() systemRowId: number;
  @Input() moduleLevel: number;
  isRequired: boolean = false;
  items: any[];

  photos = [];
  photosBuffer = [];
  bufferSize = 50;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;
  searchEvent = new EventEmitter();
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos').subscribe(photos => {
      this.photos = photos;
      this.photosBuffer = this.photos.slice(0, this.bufferSize);
    });

    this.initializeProperties();

    this.searchEvent.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchValue => console.log(searchValue));

    console.log(`系统RowId:${this.systemRowId}, 模块等级： ${this.moduleLevel}`);
  }

  ngOnDestroy(): void {
    this.searchEvent.unsubscribe();
  }
  protected initializeProperties(): void {
    this.placeholder = this.placeholder || '';
    this.bindValue = this.bindValue || 'id';
    this.bindLabel = this.bindLabel || 'text';
    // this.maxLength = this.maxLength || null;
    // this.color = this.color || MaterialColorConfig.basic;
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
