import type { User } from "@/types/user";
import type { GithubUser } from "../userRepository";

function mapGithubUserToUser(user: GithubUser): User {
  return {
    id: user.id,
    login: user.login,
    avatarUrl: user.avatar_url,
    profileUrl: user.html_url,
  };
}

export function mapGithubUsersToUsers(items: GithubUser[]): User[] {
  return items.map(mapGithubUserToUser);
}
