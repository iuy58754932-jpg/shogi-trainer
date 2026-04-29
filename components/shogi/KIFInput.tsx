import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type KIFInputProps = {
  text: string;
  onChangeText: (text: string) => void;
  onLoad: () => void;
  error?: string | null;
};

export function KIFInput({ text, onChangeText, onLoad, error }: KIFInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>KIF を貼り付け</Text>
      <TextInput
        style={styles.textarea}
        multiline
        value={text}
        onChangeText={onChangeText}
        placeholder="shogi-extend.com から KIF をコピーして貼付け"
        placeholderTextColor="#999"
      />
      {error && <Text style={styles.error}>エラー: {error}</Text>}
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={onLoad}
      >
        <Text style={styles.buttonLabel}>読み込む</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    width: "100%",
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#222",
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    fontSize: 12,
    minHeight: 120,
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    color: "#222",
    fontFamily: "monospace",
  },
  error: {
    color: "#c0392b",
    marginTop: 6,
    fontSize: 12,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#1e8449",
  },
  buttonLabel: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
});
