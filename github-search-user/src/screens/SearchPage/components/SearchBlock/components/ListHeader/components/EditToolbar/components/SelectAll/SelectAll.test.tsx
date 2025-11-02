import { screen, render, userEvent } from "@testing-library/react-native";
import { SelectAll } from "./SelectAll";
import type { SelectAllProps } from "./SelectAll";

describe("SelectAll", () => {
  const onSelectAll = jest.fn();
  const onDeselectAll = jest.fn();
  const sharedProps: SelectAllProps = {
    onSelectAll,
    onDeselectAll,
    selectedCount: 0,
    hasPartialSelection: false,
  };

  it("should display selected count when some items are selected", async () => {
    const user = userEvent.setup();
    render(<SelectAll {...sharedProps} selectedCount={5} />);

    const text = screen.getByText("5 elements selected");
    expect(text).toBeVisible();
  });
});
