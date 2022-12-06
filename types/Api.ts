export interface SearchProps {
  limit?: number;
  offset?: number;
  query?: string;
}

export class Search {
  private limit?: number;
  private offset?: number;
  private query?: string;

  constructor({ limit, offset, query }: SearchProps) {
    this.limit = limit;
    this.offset = offset;
    this.query = query;
  }

  toQueryParams(): string {
    const searchParams = new URLSearchParams();

    if (this.limit) {
      searchParams.append("limit", this.limit.toString());
    }

    if (this.offset) {
      searchParams.append("offset", this.offset.toString());
    }

    if (this.query) {
      searchParams.append("query", this.query);
    }

    return searchParams.toString();
  }
}
