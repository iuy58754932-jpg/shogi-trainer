import { StyleSheet, Text, View } from "react-native";
import { Board } from "@/components/shogi/Board";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>shogi-trainer</Text>
      <Board />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    paddingTop: 56,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    color: "#222",
  },
});
