import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../models/articles.model';
import { ArticleListRequest } from '../models/request/article-list.request';
import { ApiEndpoints } from '../utils/api-endpoints.constants';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  getArticleList(articleListRequest?: ArticleListRequest) {
    let params = new HttpParams();
    if (articleListRequest) {
      Object.keys(articleListRequest).forEach(
        (key) =>
          articleListRequest[key] &&
          (params = params.append(key, articleListRequest[key]))
      );
    }

    return this.httpClient.get<Article[]>(ApiEndpoints.Articles, {
      params,
    });
  }

  getArticleDetail(articleId): Observable<Article> {
    if (!articleId) {
      return new Observable((obs) => obs.next(null));
    }
    return this.httpClient
      .get<Article>(ApiEndpoints.Articles + '/' + articleId)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
