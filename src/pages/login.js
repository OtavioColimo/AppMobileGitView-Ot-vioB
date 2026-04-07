import React, { useState } from "react";
import {
  Text,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AuthContainer,
  AuthInput,
  AuthButton,
  AuthButtonText,
} from "../styles/AuthStyles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = async () => {
    const user = await AsyncStorage.getItem("user");
    if (!user) {
      alert("Nenhum usuário cadastrado!");
      return;
    }
    const userJson = JSON.parse(user);
    if (userJson.email === email && userJson.password === password) {
      navigation.navigate("Main");
    } else {
      alert("E-mail ou senha inválidos!");
    }
  };

  const handleCadastro = () => {
    navigation.navigate("Cadastro");
  };

  return (
    <AuthContainer>
      <AuthInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <AuthInput
        placeholder="Senha"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <AuthButton onPress={handleLogin}>
        <AuthButtonText>Entrar</AuthButtonText>
      </AuthButton>

      <AuthButton onPress={handleCadastro}>
        <AuthButtonText>Cadastrar</AuthButtonText>
      </AuthButton>
    </AuthContainer>
  );
};

export default Login;
