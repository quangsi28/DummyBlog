import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { ArticleListRequest } from '../../models/request/article-list.request';
import { MockArticleListResponse } from '../mock-data';
@Injectable({
  providedIn: 'root',
})
export class MockHomeService {
  constructor() {}

  getArticleList(articleListRequest?: ArticleListRequest) {}
}
