import {
  HttpClient,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Mock } from 'protractor/built/driverProviders';
import { HomeService } from '../services/home.service';
import { MockHomeService } from '../test/services/mock-home.service';
import { ApiEndpoints } from '../utils/api-endpoints.constants';
import { HttpCode } from '../utils/http-code.constants';

import { HttpErrorInterceptor } from './http-error.interceptor';

describe('HttpErrorInterceptor', () => {
  let errorInterceptor: HttpErrorInterceptor;
  let homeService: HomeService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let errorEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpErrorInterceptor,
        { provide: HomeService, useClass: MockHomeService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    errorInterceptor = TestBed.inject(HttpErrorInterceptor);
    homeService = TestBed.inject(HomeService);
    httpClient = TestBed.inject(HttpClient);
    const errorInitEvent: ErrorEventInit = {
      message: null,
      error: {},
    };

    errorEvent = new ErrorEvent('ERROR', errorInitEvent);
  });

  it('should be created', () => {
    const interceptor: HttpErrorInterceptor = TestBed.inject(
      HttpErrorInterceptor
    );
    expect(interceptor).toBeTruthy();
  });

  it('404 error should be handled', () => {
    httpClient.get('/returnError').subscribe(
      () => {},
      (error) => {}
    );
    const request = httpMock.expectOne('/returnError');
    expect(request.request.method).toBe('GET');

    request.error(errorEvent, { status: 404 });
  });

  it('404 error should be handled', () => {
    httpClient.get('/returnError').subscribe(
      () => {},
      (error) => {
        expect(error.status).toEqual(HttpCode.NotFound);
      }
    );
    const request = httpMock.expectOne('/returnError');
    expect(request.request.method).toBe('GET');
    request.error(errorEvent, { status: HttpCode.NotFound });
  });

  it('Too many requests error should be handled', () => {
    const st = spyOn(errorInterceptor, 'intercept');

    httpClient.get('/returnError').subscribe(
      () => {},
      (error) => {
        expect(error.status).toEqual(HttpCode.TooManyRequests);
      }
    );
    const request = httpMock.expectOne('/returnError');
    expect(request.request.method).toBe('GET');

    request.error(errorEvent, { status: HttpCode.TooManyRequests });
  });
});
