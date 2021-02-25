import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { HomepageComponent } from './components/homepage/homepage.component';
import { ArticlesContainerComponent } from './components/articles-container/articles-container.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';

@NgModule({
  declarations: [HomepageComponent, ArticlesContainerComponent, ArticleDetailComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
