import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>人生TODO</Text>

      <Text style={styles.todo}>🔥 起業する</Text>
      <Text style={styles.todo}>🌍 海外で働く</Text>
      <Text style={styles.todo}>💰 資産1億</Text>
      <Text style={styles.todo}>📚 月10冊読む</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 40,
  },
  todo: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
});