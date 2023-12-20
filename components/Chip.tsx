import { Text, View } from "react-native";

/**
 * Represents the properties of a chip component.
 * @typedef {Object} ChipProps
 * @property {string} backgroundColor - The background color of the chip.
 * @property {string} chipText - The text content of the chip.
 */
type ChipProps = {
  backgroundColor: string;
  chipText: string;
};

/**
 * A reusable component that represents a chip with customizable background color and text.
 * @param {ChipProps} props - The props object containing the chip's properties.
 * @returns A React component representing a chip.
 */
export const Chip = (props: ChipProps): JSX.Element => {
  return (
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: props.backgroundColor,
        borderRadius: 12,
      }}
    >
      <Text style={{ color: "#FFF" }}>{props.chipText}</Text>
    </View>
  );
};
