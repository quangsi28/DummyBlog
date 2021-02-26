import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/core/models/articles.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  @Input() articles: Article[] = [];
  @Output() selectArticle = new EventEmitter<number>();
  selectedArticle;

  constructor() {}

  ngOnInit(): void {}

  onSelectArticle(article) {
    this.selectedArticle = article;
    this.selectArticle.emit(article);
  }
}
