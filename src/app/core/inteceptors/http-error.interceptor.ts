import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpCode } from "../utils/http-code.constants";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleApiErrors(error);
        return throwError(error);
      })
    );
  }

  handleApiErrors(error: HttpErrorResponse) {
    switch (error.status) {
      case HttpCode.NotFound:
        alert("Server return not found");
        return;
      case HttpCode.ServerError:
        alert("Internal server error");
        return;
      case HttpCode.TooManyRequests:
        alert("Calm down!! You are spamming requests");
        return;
      default:
        alert("Got error from API");
        return;
    }
  }
}
