import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpErrorInterceptor } from "./inteceptors/http-error.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
})
export class CoreModule {}
