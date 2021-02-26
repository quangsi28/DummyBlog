import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Article } from 'src/app/core/models/articles.model';
import { HomeService } from 'src/app/core/services/home.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { SortOptions, SearchOptions } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchBox') searchBox;

  articles: Article[];
  selectedArticle;
  sortArticleOptions = SortOptions;
  searchArticleOptions = SearchOptions;
  selectedSortOption;
  selectedSearchOption;
  searchArticle$ = new Subject();
  keyword = '';
  pageSize = 10;
  currentPage = 1;
  pagingArticles: Article[] = [];
  selectedId;
  subscriptions$: Subscription = new Subscription();

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.getArticleList();
  }

  ngAfterViewInit() {
    this.initSearchBox();
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }

  onSelectArticle(article) {
    if (!article) {
      return;
    }
    const articleDetailSub = this.homeService
      .getArticleDetail(article.id)
      .subscribe((detailRes: Article) => {
        this.selectedArticle = detailRes;
      }, console.error);
    this.subscriptions$.add(articleDetailSub);
  }

  onSortArticle(event) {
    this.selectedSortOption = event.value;
    this.getArticleList();
  }

  onSelectSearchOption(event) {
    this.selectedSearchOption = event.value;
    if (!this.keyword) {
      return;
    }
    this.getArticleList();
  }

  onPageChanged(pageNo) {
    this.currentPage = pageNo;
    this.setCurrentPageData();
  }

  private setCurrentPageData() {
    if ((this.currentPage - 1) * this.pageSize > this.articles.length) {
      this.currentPage = 1;
    }
    this.pagingArticles = this.articles.slice(
      this.pageSize * (this.currentPage - 1),
      this.pageSize * (this.currentPage - 1) + this.pageSize
    );
  }

  private getArticleList() {
    const articleListSub = this.homeService
      .getArticleList({
        sortBy: this.selectedSortOption?.value,
        [this.selectedSearchOption?.value || 'title']: this.keyword,
      })
      .subscribe((articlesRes) => {
        if (!articlesRes) {
          return;
        }
        this.articles = articlesRes;
        this.setCurrentPageData();
      });
    this.subscriptions$.add(articleListSub);
  }

  private initSearchBox() {
    fromEvent(this.searchBox.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value.trim();
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        this.keyword = value;
        this.getArticleList();
      });
  }
}
