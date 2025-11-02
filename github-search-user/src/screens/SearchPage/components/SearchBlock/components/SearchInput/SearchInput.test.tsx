import {
  render,
  userEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { SearchInput, SearchInputProps } from "./SearchInput";
import { useState } from "react";

function SearchInputTest(props: Omit<SearchInputProps, "value">) {
  const [value, setValue] = useState("");

  const handleOnChange = (text: string) => {
    setValue(text);
    props.onChange(text);
  };
  return <SearchInput onChange={handleOnChange} value={value} />;
}

describe("SearchInput", () => {
  it("should update text when user types", async () => {
    const onChange = jest.fn();
    render(<SearchInputTest onChange={onChange} />);
    const input = screen.getByRole("searchbox");
    await userEvent.type(input, "test");

    expect(input).toHaveDisplayValue("test");
    expect(onChange).toHaveBeenCalledTimes(4);
    expect(onChange).toHaveBeenLastCalledWith("test");
  });
});
