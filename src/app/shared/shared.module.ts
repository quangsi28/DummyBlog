import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { PagingComponent } from "./components/paging/paging.component";
import { DropdownComponent } from "./components/dropdown/dropdown.component";
import { DropdownOptionComponent } from "./components/dropdown-option/dropdown-option.component";

const exportComponents = [
  PagingComponent,
  DropdownComponent,
  DropdownOptionComponent,
];

@NgModule({
  declarations: [exportComponents],
  imports: [CommonModule],
  exports: [exportComponents],
})
export class SharedModule {}
