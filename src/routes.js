import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Main from "./pages/main";
import PokemonDetail from "./pages/pokemonDetail";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "LOGIN",
            headerTitleAlign: "center",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#ff0000",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{
            title: "CADASTRO",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#ff0000",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: "POKÉDEX",
            headerTitleAlign: "center",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#ff0000",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
          }}
        />
        <Stack.Screen
          name="PokemonDetail"
          component={PokemonDetail}
          options={({ route }) => ({
            title: route.params?.pokemon?.name?.toUpperCase() || "POKÉMON",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#ff0000",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#fff",
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
