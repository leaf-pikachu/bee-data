import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { BeeHttpService } from '@bee/core/service/bee-http.service';
import { GridSupport } from '@bee/core/config/grid/grid-support';


export abstract class GridModalSupport extends GridSupport{
  public moduleContent: any;
  public modalSize: 'lg' | 'sm' = 'lg';
  protected constructor(public modal: NgbModal,$http: BeeHttpService, loadUrl: string, deleteUrl: string) {
    super($http, loadUrl, deleteUrl);
    // this.modal.open()
    this.setModalContent();
  }


  addRow(): void {
    super.addRow();
    this.openModalWindow();
  }

  editRow(row: any): void {
    super.editRow(row);
    this.openModalWindow();
  }

  rowDetails(row: any): void {
    super.rowDetails(row);
    this.openModalWindow();
  }

  openModalWindow() {
    const modalInstance =  this.modal.open(this.moduleContent, {size: this.modalSize, backdrop: 'static'});

    modalInstance.componentInstance.rowId = this.dataFlag;
    modalInstance.componentInstance.operationType = this.operationType;
    this.instanceSetValue(modalInstance);
    modalInstance.result.then((result: any) => {this.returnOperation(result);});
  }

  abstract setModalContent();
  abstract instanceSetValue(modalInstance: NgbModalRef);


}
