import styled from "styled-components/native";
import { APP_COLORS } from "../constants/pokemon";

export const AuthContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${APP_COLORS.BACKGROUND_LIGHT};
`;

export const AuthInput = styled.TextInput.attrs({
  placeholderTextColor: APP_COLORS.TEXT_LIGHT_GRAY,
})`
  border-width: 1px;
  border-color: ${APP_COLORS.BORDER_LIGHT_GRAY};
  border-radius: 5px;
  padding: 10px;
  margin-vertical: 10px;
  width: 80%;
  background-color: ${APP_COLORS.BACKGROUND_LIGHT};
  color: ${APP_COLORS.TEXT_DARK};
`;

export const AuthButton = styled.TouchableOpacity`
  background-color: ${APP_COLORS.PRIMARY_RED};
  border-radius: 5px;
  padding: 10px;
  width: 80%;
  align-items: center;
  margin-top: 8px;
`;

export const AuthButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
`;
