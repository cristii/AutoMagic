import { Pressable, Text } from "react-native";

type ButtonProps = {
  label: string;
  onPress?: () => void;
};

export function Button({ label, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );
}