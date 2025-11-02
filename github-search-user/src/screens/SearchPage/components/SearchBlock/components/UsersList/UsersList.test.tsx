import { screen, render } from "@testing-library/react-native";
import { UsersList } from "./UsersList";
import type { UsersListProps } from "./UsersList";
import { users } from "@/data/repositories/users/mocks/users.mock";

describe("UsersList", () => {
  const sharedProps: UsersListProps = {
    users: [],
    loading: false,
    isEditMode: false,
    isSelected: () => false,
    onSelect: () => {},
    onUserProfilePress: () => {},
  };

  it("should display ListLoader when loading is true", () => {
    render(<UsersList {...sharedProps} loading />);

    const listLoader = screen.getByTestId("search.list.loader");
    expect(listLoader).toBeVisible();
  });

  it("should display EmptyList when users list is empty and loading is false", () => {
    render(<UsersList {...sharedProps} users={[]} loading={false} />);

    const emptyListText = screen.getByText(/no users found/i);
    expect(emptyListText).toBeVisible();
  });

  it("should render user cards when users are provided", () => {
    render(<UsersList {...sharedProps} users={users} />);
    users.forEach((user) => {
      const userLogin = screen.getByText(user.login);
      expect(userLogin).toBeVisible();
    });
  });
});
