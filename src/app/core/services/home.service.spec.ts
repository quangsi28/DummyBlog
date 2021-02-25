import { getTestBed, TestBed } from "@angular/core/testing";

import { HomeService } from "./home.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { ApiEndpoints } from "../utils/api-endpoints.constants";
import { MockBlogsResponse } from "../utils/test/mock-data.util";
import { ArticleListRequest } from "../models/request/article-list.request";

describe("HomeServiceService", () => {
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

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return blogs data when no params", () => {
    service.getArticleList().subscribe((articles) => {
      expect(articles.length).toBe(3);
      expect(articles).toEqual(MockBlogsResponse);
    });
    const request = httpMock.expectOne(ApiEndpoints.ArticleList);
    expect(request.request.method).toBe("GET");
    request.flush(MockBlogsResponse);
  });

  it("should not throw error with null param", () => {
    debugger;

    service.getArticleList({}).subscribe((articles) => {
      expect(articles.length).toBe(3);
      expect(articles).toEqual(MockBlogsResponse);
    });
    const request = httpMock.expectOne(ApiEndpoints.ArticleList);
    expect(request.request.method).toBe("GET");
    request.flush(MockBlogsResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
