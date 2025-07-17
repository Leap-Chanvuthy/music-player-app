import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-rubik-bold">Home Screen</Text>
      <Text className="font-rubik-light">Welcome to MEYA</Text>


    </View>
  );
}
