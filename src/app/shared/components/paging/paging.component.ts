import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss'],
})
export class PagingComponent implements OnInit, OnChanges {
  @Input() page = 1;
  @Input() pageSize = 0;
  @Input() totalItem = 1;

  @Output() pageChange = new EventEmitter<any>(true);

  pageNumbers: { pageNo; isActive }[] = [];
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    const pageNumber = Math.ceil(this.totalItem / this.pageSize);
    this.pageNumbers = Array(pageNumber)
      .fill(0)
      .map((x, i) => {
        return { pageNo: (i += 1), isActive: this.page === i };
      });
  }

  setPage(selectedPage) {
    if (selectedPage.pageNo === this.page) {
      return;
    }
    this.page = selectedPage.pageNo;
    this.updateActivePage();
  }

  get isFirstPage() {
    return this.page === 1;
  }
  get isLastPage() {
    return this.page === this.pageNumbers.length;
  }

  onPreviousPage() {
    this.page--;
    this.updateActivePage();
  }

  onNextPage() {
    this.page++;
    this.updateActivePage();
  }

  private updateActivePage() {
    this.pageNumbers.forEach((page) => {
      page.isActive = page.pageNo === this.page;
    });
    this.pageChange.emit(this.page);
  }
}
