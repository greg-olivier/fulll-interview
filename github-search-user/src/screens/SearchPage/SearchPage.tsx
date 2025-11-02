import { View } from "react-native";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Header } from "@/shared/components/Header/Header";
import { ToastMessage } from "@/shared/components/ToastMessage/ToastMessage";
import { SearchInput } from "./components/SearchBlock/components/SearchInput/SearchInput";
import { SearchListBlock } from "./components/SearchBlock/SearchListBlock";
import { useSearchUsersHook } from "./hooks/useSearchUsers";
import { getErrorMessage } from "./utils/getErrorMessage";

export function SearchPage(): ReactNode {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { query, setQuery, data, loading, error, setData } =
    useSearchUsersHook();

  useEffect(() => {
    if (error) {
      setErrorMessage(getErrorMessage(error));
      return;
    }
    setErrorMessage(null);
  }, [error]);

  const handleOnToastMessageClose = () => {
    setErrorMessage(null);
  };
  return (
    <View style={{ flex: 1 }}>
      {errorMessage ? (
        <ToastMessage
          type="error"
          message={errorMessage}
          onClose={handleOnToastMessageClose}
        />
      ) : null}
      <Header title="Search Page" />
      <SearchInput onChange={setQuery} value={query} />
      <SearchListBlock loading={loading} users={data} updateData={setData} />
    </View>
  );
}
