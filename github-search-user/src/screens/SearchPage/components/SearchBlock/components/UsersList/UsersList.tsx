import { View, FlatList } from "react-native";
import type { ReactNode } from "react";
import type { User } from "@/types/user";
import { UserCard } from "./components/UserCard/UserCard";
import { styles } from "./UsersList.styles";
import { ListLoader } from "./components/ListLoader";
import { EmptyList } from "./components/EmptyList";
import { SafeAreaView } from "react-native-safe-area-context";

export interface UsersListProps {
  users: User[];
  loading: boolean;
  error?: Error;
  isEditMode: boolean;
  isSelected: (id: number) => boolean;
  onSelect: (id: number) => void;
  onUserProfilePress: (url: string) => void;
}

export function UsersList({
  users,
  loading,
  isEditMode,
  isSelected,
  onSelect,
  onUserProfilePress,
}: UsersListProps): ReactNode {
  return (
    <FlatList<User>
      data={users}
      style={styles.list}
      contentContainerStyle={styles.content}
      ListEmptyComponent={loading ? <ListLoader /> : <EmptyList />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={() => <SafeAreaView edges={["bottom"]} />}
      renderItem={({ item }) => (
        <UserCard
          user={item}
          isSelected={isSelected(item.id)}
          canBeSelected={isEditMode}
          onSelect={onSelect}
          onViewProfilePress={onUserProfilePress}
        />
      )}
    />
  );
}
