import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/app/core/models/articles.model';
import { HomeService } from 'src/app/core/services/home.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBox') searchBox;
  articles: Article[];
  selectedArticle;
  order;
  sortBy;
  sortArticleOptions = [
    { name: 'Title', value: 'title' },
    { name: 'Created At', value: 'createAt' },
  ];
  searchArticleOptions = [
    { name: 'Title', value: 'title' },
    { name: 'Content', value: 'content' },
    { name: 'Default', value: 'search' },
  ];
  selectedSortOption;
  selectedSearchOption;
  searchArticle$ = new Subject();
  keyword = '';
  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.getArticleList();
  }

  ngAfterViewInit() {
    this.initSearchBox();
  }

  onSelectArticle(articleId) {
    if (!articleId) {
      return;
    }
    this.homeService
      .getArticleDetail(articleId)
      .subscribe((detailRes: Article) => {
        this.selectedArticle = detailRes;
      }, console.error);
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

  private getArticleList() {
    this.homeService
      .getArticleList({
        sortBy: this.selectedSortOption?.value,
        [this.selectedSearchOption?.value]: this.keyword,
      })
      .subscribe((articlesRes) => {
        if (!articlesRes) {
          return;
        }
        this.articles = articlesRes;
      });
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
