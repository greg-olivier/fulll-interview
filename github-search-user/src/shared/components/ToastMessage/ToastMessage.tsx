import { Text, Pressable, View } from "react-native";
import type { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./ToastMessage.styles";
import { MessageType } from "./types";
import { getToastColor } from "./helpers/getToastColor";

export interface ToastMessageProps {
  type: MessageType;
  message: string;
  onClose?: () => void;
}

export function ToastMessage({
  type,
  message,
  onClose,
}: ToastMessageProps): ReactNode {
  const isClosable = Boolean(onClose);

  const handleOnClose = (): void => {
    onClose?.();
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.toast, { backgroundColor: getToastColor(type) }]}
    >
      <View style={{ flexShrink: 1 }}>
        <Text style={styles.text}>{message}</Text>
      </View>
      {isClosable ? (
        <Pressable
          onPress={handleOnClose}
          style={styles.closeButton}
          accessibilityLabel="close-message"
        >
          <Text style={styles.text}>X</Text>
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
}
