import { render, screen, userEvent } from "@testing-library/react-native";
import { ToastMessage, ToastMessageProps } from "./ToastMessage";

describe("ToastMessage", () => {
  const sharedProps: ToastMessageProps = {
    type: "info",
    message: "This is a toast message",
  };
  it("displays the correct message", () => {
    render(<ToastMessage {...sharedProps} />);
    const message = screen.getByText("This is a toast message");
    expect(message).toBeTruthy();
  });

  it("calls onClose when close button is pressed", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();

    render(<ToastMessage {...sharedProps} onClose={onClose} />);
    const closeButton = screen.getByText("X");
    await user.press(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
