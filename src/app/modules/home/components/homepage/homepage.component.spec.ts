import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HomeService } from 'src/app/core/services/home.service';
import { MockArticleListResponse } from 'src/app/core/test/mock-data';
import { MockHomeService } from 'src/app/core/test/services/mock-home.service';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let homeService: HomeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      providers: [{ provide: HomeService, useClass: MockHomeService }],
    }).compileComponents();
    fixture = TestBed.createComponent(HomepageComponent);
    homeService = TestBed.inject(HomeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
  });

  it('should get article list data on init', () => {
    const homeServiceSpy = spyOn(homeService, 'getArticleList').and.returnValue(
      of(MockArticleListResponse)
    );
    fixture.detectChanges();
    expect(homeServiceSpy).toHaveBeenCalled();
    expect(component.articles).toEqual(MockArticleListResponse);
  });

  it('should get article list data after sort changed', () => {
    const homeServiceSpy = spyOn(homeService, 'getArticleList').and.returnValue(
      of(MockArticleListResponse)
    );
    const sortOption = { value: 'title' };
    component.onSortArticle(sortOption);
    fixture.detectChanges();
    expect(component.articles).toEqual(MockArticleListResponse);
    expect(homeServiceSpy).toHaveBeenCalled();
    expect(component.selectedSortOption).toEqual('title');
  });

  it('should get article list data after keyword and search option changed', () => {
    const homeServiceSpy = spyOn(homeService, 'getArticleList').and.returnValue(
      of(MockArticleListResponse)
    );
    const searchOption = { value: 'search' };
    component.keyword = 'test';
    component.onSelectSearchOption(searchOption);
    fixture.detectChanges();
    expect(component.articles).toEqual(MockArticleListResponse);
    expect(homeServiceSpy).toHaveBeenCalled();
    expect(component.selectedSearchOption).toEqual('search');
  });
});
