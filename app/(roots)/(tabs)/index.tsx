import { RootState } from "@/redux/store";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {

  const dispatch = useDispatch();
  const {value} = useSelector((state : RootState) => state.counter);

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
      

      <Text className="text-lg mb-2">Count: {value}</Text>


    </View>
  );
}
