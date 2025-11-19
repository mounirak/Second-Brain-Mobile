import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
export default function Note() {
  return  <View
  style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  }}
>
  <Text
    style={{
      fontSize: 24,
      textAlign: "center",
    }}
  >Note</Text>
  </View>;
}
