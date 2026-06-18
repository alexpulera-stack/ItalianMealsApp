import { View, Text, Pressable, FlatList ,StyleSheet, Linking} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ITEMS} from "../list/items";
import { useRoute } from "@react-navigation/native";

interface Item{
    id: string;
    name: string;

}

function Row ({item}: {item: Item}){
  const navigation= useNavigation<any>();
  return( 
    <Pressable style={styles.row} 
    onPress={()=> navigation.navigate("Details", { id: item.id })}>
      <Text>{item.name}</Text>
    </Pressable>
  )


}

export default function HomeScreen({ navigation }: any) {
    const route = useRoute();
    return (
    
    <View
      style={{
        flex: 1,
        padding: 20
      }}
    >
      <Text>Home Screen</Text>

      <Text style={{ marginVertical: 20 }}>
        Deep Link Path: {route.path || 'Nessun deep link'}
      </Text>

      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (<Row item={item}/>)}
        style={{
        flex: 1,
        padding: 16
      }}
        />
    </View>
  );

 
} 
const styles = StyleSheet.create({
    row: {
      padding: 12,
      borderWidth: 1,
      borderColor: "#00a9cf",
      borderRadius: 8,
      marginBottom: 8,
    },
    list: { paddingBottom: 16 },
    button:{
        padding: 16,
              marginBottom: 10,
              borderWidth: 1,
              borderRadius: 8,
    }
  });