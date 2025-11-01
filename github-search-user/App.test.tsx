import { render, screen } from "@testing-library/react-native";
import App from "./App";

describe("App", () => {
  it("should render correctly", () => {
    render(<App />);
    const text = screen.getByText(
      "Open up App.tsx to start working on your app!",
    );
    expect(text).toBeVisible();
  });
});
