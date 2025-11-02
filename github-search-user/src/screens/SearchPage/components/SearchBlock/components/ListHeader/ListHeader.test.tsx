import { screen, render } from "@testing-library/react-native";
import { ListHeader } from "./ListHeader";
import type { ListHeaderProps } from "./ListHeader";

describe("ListHeader", () => {
  const sharedProps: ListHeaderProps = {
    isEditMode: false,
    canSwitchEditMode: true,
    onToggleEditMode: jest.fn(),
    selectedCount: 0,
    hasPartialSelection: false,
    onSelectAll: jest.fn(),
    onDeselectAll: jest.fn(),
    onDuplicate: jest.fn(),
    onDelete: jest.fn(),
  };

  it("should display the edit toolbar when in edit mode", () => {
    render(<ListHeader {...sharedProps} isEditMode />);

    const editToolbar = screen.queryByTestId("search.list.header.editToolbar");
    expect(editToolbar).toBeVisible();
  });

  it("should not display the edit toolbar when not in edit mode", () => {
    render(<ListHeader {...sharedProps} isEditMode={false} />);

    const editToolbar = screen.queryByTestId("search.list.header.editToolbar");
    expect(editToolbar).not.toBeVisible();
  });
});
