import { View, TextInput } from "react-native";
import type { TextInputChangeEvent } from "react-native";
import type { ReactNode } from "react";
import { styles } from "./SearchInput.styles";

export interface SearchInputProps {
  onChange: (text: string) => void;
  value: string;
}

export function SearchInput({ onChange, value }: SearchInputProps): ReactNode {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        clearButtonMode="always"
        returnKeyType="done"
        role="searchbox"
        placeholderTextColor={"#7b7b7bff"}
        placeholder="Search users..."
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
}
