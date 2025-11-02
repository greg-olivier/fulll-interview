import { render, screen } from "@testing-library/react-native";
import { Header } from "./Header";

describe("Header", () => {
  it("should render the header with the correct title", () => {
    const title = "Test Header";

    render(<Header title={title} />);
    const titleElement = screen.getByText(title);

    expect(titleElement).toBeTruthy();
  });
});
