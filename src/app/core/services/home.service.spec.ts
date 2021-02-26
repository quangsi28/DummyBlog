import { getTestBed, TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiEndpoints } from '../utils/api-endpoints.constants';
import {
  MockArticleListResponse,
  MockArticleDetailResponse,
} from '../test/mock-data';

describe('HomeServiceService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService],
    });
    injector = getTestBed();
    service = injector.inject(HomeService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getArticleList should return blogs data when no params', () => {
    service.getArticleList().subscribe((articles) => {
      expect(articles.length).toBe(3);
      expect(articles).toEqual(MockArticleListResponse);
    });
    const request = httpMock.expectOne(ApiEndpoints.Articles);
    expect(request.request.method).toBe('GET');
    request.flush(MockArticleListResponse);
  });

  it('getArticleList should not throw error with empty param', () => {
    service.getArticleList({}).subscribe((articles) => {
      expect(articles.length).toBe(3);
      expect(articles).toEqual(MockArticleListResponse);
    });
    const request = httpMock.expectOne(ApiEndpoints.Articles);
    expect(request.request.method).toBe('GET');
    request.flush(MockArticleListResponse);
  });

  it('getArticleList should not throw error with null param', () => {
    service
      .getArticleList({
        filter: null,
        title: null,
        limit: 10,
        search: 'test',
        page: undefined,
      })
      .subscribe((articles) => {
        expect(articles.length).toBe(3);
        expect(articles).toEqual(MockArticleListResponse);
      });
    const request = httpMock.expectOne({
      url: ApiEndpoints.Articles + '?limit=10&search=test',
      method: 'GET',
    });
    expect(request.request.method).toBe('GET');
    request.flush(MockArticleListResponse);
  });

  it('getArticleList should not throw error with null param', () => {
    service
      .getArticleList({
        filter: null,
        title: null,
        limit: 10,
        search: 'test',
        page: undefined,
      })
      .subscribe((articles) => {
        expect(articles.length).toBe(3);
        expect(articles).toEqual(MockArticleListResponse);
      });
    const request = httpMock.expectOne({
      url: ApiEndpoints.Articles + '?limit=10&search=test',
      method: 'GET',
    });
    expect(request.request.method).toBe('GET');
    request.flush(MockArticleListResponse);
  });

  it('getArticleDetail should return data', () => {
    service.getArticleDetail(2).subscribe((article) => {
      expect(article).toEqual(MockArticleDetailResponse);
    });
    const request = httpMock.expectOne({
      url: ApiEndpoints.Articles + '/' + 2,
      method: 'GET',
    });
    expect(request.request.method).toBe('GET');
    request.flush(MockArticleDetailResponse);
  });

  it('getArticleDetail should not return data', () => {
    service.getArticleDetail(null).subscribe((article) => {
      expect(article).toEqual(null);
    });
    httpMock.expectNone(ApiEndpoints.Articles);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
