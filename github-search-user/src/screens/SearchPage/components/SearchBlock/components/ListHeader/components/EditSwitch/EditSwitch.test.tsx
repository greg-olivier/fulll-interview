import { render, screen, fireEvent } from "@testing-library/react-native";
import { EditSwitch } from "./EditSwitch";
import type { EditSwitchProps } from "./EditSwitch";

describe("EditSwitch", () => {
  const onToggleEditMode = jest.fn();
  const sharedProps: EditSwitchProps = {
    isEditMode: false,
    canSwitchEditMode: true,
    onToggleEditMode,
  };

  it("should toggle edit mode", () => {
    render(<EditSwitch {...sharedProps} />);

    const switchElement = screen.getByRole("switch");
    fireEvent(switchElement, "valueChange", true);

    expect(onToggleEditMode).toHaveBeenCalledWith(true);
  });
  it("should be disabled when canSwitchEditMode is false", () => {
    render(<EditSwitch {...sharedProps} canSwitchEditMode={false} />);

    const switchElement = screen.getByRole("switch");

    expect(switchElement).toBeDisabled();
  });
});
