export interface ArticleListRequest {
  sortBy?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  search?: string;
  filter?: string;
  title?: string;
}
