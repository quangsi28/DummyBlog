import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { Article } from "src/app/core/models/articles.model";

@Component({
  selector: "app-articles-container",
  templateUrl: "./articles-container.component.html",
  styleUrls: ["./articles-container.component.scss"],
})
export class ArticlesContainerComponent implements OnInit, OnChanges {
  @Input() articles: Article[] = [];
  @Output() selectArticle = new EventEmitter<number>();
  pageSize = 10;
  currentPage = 1;
  pagingArticles: Article[] = [];
  selectedId;

  constructor() {}

  ngOnInit() {
    this.setCurrentPageData();
  }

  ngOnChanges() {
    this.setCurrentPageData();
  }

  setCurrentPageData() {
    if ((this.currentPage - 1) * this.pageSize > this.articles.length) {
      this.currentPage = 1;
    }
    this.pagingArticles = this.articles.slice(
      this.pageSize * (this.currentPage - 1),
      this.pageSize * (this.currentPage - 1) + this.pageSize
    );
    console.log(this.pagingArticles);
  }

  onPageChanged(pageNo) {
    this.currentPage = pageNo;
    this.setCurrentPageData();
  }

  onSelectArticle(articleId) {
    this.selectedId = articleId;
    this.selectArticle.emit(articleId);
  }
}
