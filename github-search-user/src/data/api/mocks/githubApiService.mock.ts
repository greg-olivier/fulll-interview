import { GitHubAPIService } from "../githubApiService";

export class GithubAPIServiceMock extends GitHubAPIService {
  constructor() {
    super("/fake-endpoint");
  }

  get<T>(): Promise<T> {
    return Promise.resolve({} as T);
  }
}
