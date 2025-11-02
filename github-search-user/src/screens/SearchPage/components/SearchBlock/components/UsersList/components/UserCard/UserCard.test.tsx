import { screen, render, userEvent } from "@testing-library/react-native";
import { UserCard } from "./UserCard";
import type { UserCardProps } from "./UserCard";

describe("UserCard", () => {
  const mockUser: UserCardProps["user"] = {
    id: 1,
    login: "testuser",
    avatarUrl: "https://example.com/avatar.jpg",
    profileUrl: "https://example.com/profile",
  };

  const onSelect = jest.fn();
  const onViewProfilePress = jest.fn();

  const sharedProps: UserCardProps = {
    user: mockUser,
    isSelected: false,
    canBeSelected: true,
    onSelect,
    onViewProfilePress,
  };

  it("should open profile when button is pressed", async () => {
    const user = userEvent.setup();
    render(<UserCard {...sharedProps} />);

    const viewProfileButton = screen.getByRole("button", {
      name: /view profile/i,
    });
    await user.press(viewProfileButton);

    expect(onViewProfilePress).toHaveBeenCalledWith(mockUser.profileUrl);
  });

  it("should display checkbox when canBeSelected is true", () => {
    render(<UserCard {...sharedProps} canBeSelected />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeVisible();
  });

  it("should not display checkbox when canBeSelected is false", () => {
    render(<UserCard {...sharedProps} canBeSelected={false} />);

    const checkbox = screen.queryByRole("checkbox");
    expect(checkbox).toBeNull();
  });
  it("should call onSelect when checkbox is pressed", async () => {
    const user = userEvent.setup();
    render(<UserCard {...sharedProps} />);

    const checkbox = screen.getByRole("checkbox");
    await user.press(checkbox);

    expect(onSelect).toHaveBeenCalledWith(mockUser.id);
  });
});
