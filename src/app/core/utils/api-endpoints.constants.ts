import { environment } from 'src/environments/environment';

export const ApiEndpoints = {
  ArticleList: `${environment.apiEndpoint}${environment.blogsEndpoint}`,
};
