import { Pressable, StyleSheet, Text, View } from "react-native";

type PlaybackControlsProps = {
  currentPly: number;
  totalMoves: number;
  currentMoveText: string;
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLast: () => void;
};

export function PlaybackControls({
  currentPly,
  totalMoves,
  currentMoveText,
  onFirst,
  onPrev,
  onNext,
  onLast,
}: PlaybackControlsProps) {
  const atFirst = currentPly === 0;
  const atLast = currentPly >= totalMoves;

  return (
    <View style={styles.container}>
      <Text style={styles.info}>
        {currentPly} / {totalMoves} 手{currentMoveText ? `  ${currentMoveText}` : ""}
      </Text>
      <View style={styles.buttonRow}>
        <ControlButton label="◀◀" onPress={onFirst} disabled={atFirst} />
        <ControlButton label="◀" onPress={onPrev} disabled={atFirst} />
        <ControlButton label="▶" onPress={onNext} disabled={atLast} />
        <ControlButton label="▶▶" onPress={onLast} disabled={atLast} />
      </View>
    </View>
  );
}

function ControlButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      <Text style={[styles.buttonLabel, disabled && styles.buttonLabelDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: "center",
  },
  info: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#4a90e2",
    borderRadius: 6,
    minWidth: 56,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#357ab8",
  },
  buttonDisabled: {
    backgroundColor: "#dddddd",
  },
  buttonLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonLabelDisabled: {
    color: "#999999",
  },
});
