import { screen, render, userEvent } from "@testing-library/react-native";
import { EditActions } from "./EditActions";
import type { EditActionsProps } from "./EditActions";

describe("EditActions", () => {
  const onDuplicate = jest.fn();
  const onDelete = jest.fn();
  const sharedProps: EditActionsProps = {
    onDuplicate,
    onDelete,
  };
  it("should duplicate when pressing the duplicate button", async () => {
    const user = userEvent.setup();
    render(<EditActions {...sharedProps} />);

    const duplicateButton = screen.getByTestId(
      "search.list.header.editToolbar.actions.duplicate",
    );
    await user.press(duplicateButton);

    expect(onDuplicate).toHaveBeenCalledWith();
  });
  it("should delete when pressing the delete button", async () => {
    const user = userEvent.setup();
    render(<EditActions {...sharedProps} />);

    const deleteButton = screen.getByTestId(
      "search.list.header.editToolbar.actions.delete",
    );
    await user.press(deleteButton);

    expect(onDelete).toHaveBeenCalledWith();
  });
});
