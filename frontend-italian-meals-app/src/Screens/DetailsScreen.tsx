import { View, Text, Pressable } from "react-native";
import {ITEMS} from "../list/items";
import { useNavigation } from "@react-navigation/native";

export default function DetailsScreen({ route }: any) {
  const  id  = route.params?.id;

  const navigation = useNavigation<any>();

    const item = ITEMS.find(
    (i) => i.id === id
    );
    

  if (!id) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",                                                                          
        }}
      >
        <Text>Invalid route param</Text>
      </View>
    );
  }

  if (!item){
    return (  <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>item not found</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Details Screen</Text>
      <Text>ID: {item?.id}</Text>
      <Text>{item?.name}</Text>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: "#c5c5c5",
          borderRadius: 8,
        }}
      ><Text>Go back</Text></Pressable>
      
    </View>
  );
}