import { StyleSheet, View, Text } from "react-native";
import Constants from "expo-constants";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.content}>Tome Nota</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: Constants.statusBarHeight + 20,
    width: "100%",
    padding: 20,
    backgroundColor: "#069",
  },
  content: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
    fontFamily: "Lobster_400Regular",
  },
});
