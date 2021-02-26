import { environment } from 'src/environments/environment';

export const ApiEndpoints = {
  Articles: `${environment.apiEndpoint}${environment.blogsEndpoint}`,
};
