import { render, screen, userEvent } from "@testing-library/react-native";
import { Checkbox, CheckboxProps } from "./Checkbox";

jest.mock("@expo/vector-icons/Ionicons");

describe("Checkbox", () => {
  const onPress = jest.fn();
  const sharedProps: CheckboxProps = {
    checked: false,
    onPress,
  };

  it("should check when unchecked", async () => {
    const user = userEvent.setup();

    render(<Checkbox {...sharedProps} />);
    await user.press(screen.getByRole("checkbox"));

    expect(onPress).toHaveBeenCalledWith(true);
  });

  it("should uncheck when checked", async () => {
    const user = userEvent.setup();

    render(<Checkbox {...sharedProps} checked />);
    await user.press(screen.getByRole("checkbox"));

    expect(onPress).toHaveBeenCalledWith(false);
  });

  it("should render partial checkmark when checkedType is partial", () => {
    render(<Checkbox {...sharedProps} checkedType="partial" checked />);

    const partialCheckmark = screen.getByTestId(
      "components.checkbox.checkmark.partial",
    );
    expect(partialCheckmark).toBeTruthy();
  });
});
