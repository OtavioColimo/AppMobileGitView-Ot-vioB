import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import {
  AuthContainer,
  AuthInput,
  AuthButton,
  AuthButtonText,
} from "../styles/AuthStyles";

export default class Cadastro extends Component {
  state = {
    email: "",
    password: "",
  };

  handleCadastro = async () => {
    const { email, password } = this.state;
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }
    const user = {
      email,
      password,
    };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    alert("Usuário cadastrado com sucesso!");
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <AuthContainer>
        <AuthInput
          placeholder="E-mail"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <AuthInput
          placeholder="Senha"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />
        <AuthButton onPress={this.handleCadastro}>
          <AuthButtonText>Cadastrar</AuthButtonText>
        </AuthButton>
      </AuthContainer>
    );
  }
}
