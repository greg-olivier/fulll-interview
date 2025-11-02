import { View, Text, Image, Pressable } from "react-native";
import type { ReactNode } from "react";
import { styles } from "./UserCard.styles";
import type { User } from "@/types/user";
import { Checkbox } from "@/shared/components/Checkbox/Checkbox";

export interface UserCardProps {
  user: User;
  isSelected: boolean;
  canBeSelected?: boolean;
  onSelect: (id: number) => void;
  onViewProfilePress: (url: string) => void;
}

export function UserCard({
  user,
  isSelected,
  canBeSelected = true,
  onSelect,
  onViewProfilePress,
}: UserCardProps): ReactNode {
  const { id, login, avatarUrl, profileUrl } = user;

  const handleOnViewProfilePress = (): void => {
    onViewProfilePress(profileUrl);
  };

  const handleOnSelect = (): void => {
    onSelect(id);
  };

  return (
    <View style={styles.card}>
      {canBeSelected ? (
        <View style={styles.checkboxContainer}>
          <Checkbox checked={isSelected} onPress={handleOnSelect} />
        </View>
      ) : null}
      <View style={styles.infoContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.id}>{id}</Text>
          <Text style={styles.login}>{login}</Text>
        </View>
      </View>
      <Pressable
        style={styles.button}
        onPress={handleOnViewProfilePress}
        role="button"
      >
        <Text style={styles.buttonText}>View Profile</Text>
      </Pressable>
    </View>
  );
}
