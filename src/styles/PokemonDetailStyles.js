import styled from "styled-components/native";
import { APP_COLORS } from "../constants/pokemon";

export const Container = styled.View`
  flex: 1;
  background-color: ${APP_COLORS.BACKGROUND_LIGHT};
`;

export const ScrollViewContent = styled.View`
  padding-horizontal: 20px;
  padding-vertical: 20px;
  padding-bottom: 100px;
`;

export const TypesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-vertical: 15px;
`;

export const TypeTag = styled.Text`
  padding-horizontal: 12px;
  padding-vertical: 6px;
  border-radius: 16px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-horizontal: 15px;
  padding-vertical: 15px;
  background-color: ${APP_COLORS.BACKGROUND_GRAY};
  border-radius: 8px;
  margin-vertical: 10px;
`;

export const InfoItem = styled.View`
  align-items: center;
`;

export const InfoLabel = styled.Text`
  font-size: 12px;
  color: ${APP_COLORS.TEXT_GRAY};
  margin-bottom: 5px;
`;

export const InfoValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${APP_COLORS.PRIMARY_RED};
`;

export const StatsContainer = styled.View`
  background-color: ${APP_COLORS.BACKGROUND_GRAY};
  border-radius: 8px;
  padding: 15px;
  margin-vertical: 10px;
`;

export const StatRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  justify-content: space-between;
`;

export const StatName = styled.Text`
  width: 70px;
  font-size: 12px;
  font-weight: 600;
  color: ${APP_COLORS.TEXT_GRAY};
  text-transform: capitalize;
`;

export const StatBar = styled.View`
  flex: 1;
  height: 8px;
  background-color: ${APP_COLORS.BORDER_GRAY};
  border-radius: 4px;
  margin-horizontal: 10px;
  overflow: hidden;
`;

export const StatFill = styled.View`
  height: 100%;
  background-color: ${APP_COLORS.PRIMARY_RED};
`;

export const StatValue = styled.Text`
  width: 35px;
  font-size: 12px;
  font-weight: bold;
  color: ${APP_COLORS.TEXT_DARK};
  text-align: right;
`;

export const MovesText = styled.Text`
  font-size: 13px;
  line-height: 20px;
  color: ${APP_COLORS.TEXT_GRAY};
`;

export const TypeEffectivenessContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-vertical: 10px;
`;

export const TypeEffectivenessBadge = styled.View`
  padding-horizontal: 12px;
  padding-vertical: 8px;
  border-radius: 16px;
  background-color: ${(props) => props.badgeColor || "#999"};
`;

export const TypeEffectivenessText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
`;

export const EvolutionContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-vertical: 12px;
  gap: 10px;
  justify-content: center;
`;

export const NoEvolutionText = styled.Text`
  text-align: center;
  color: ${APP_COLORS.TEXT_LIGHT_GRAY};
  margin-vertical: 20px;
  font-size: 14px;
`;

export const SuggestionsContainer = styled.View`
  gap: 12px;
`;

export const SuggestionCard = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${APP_COLORS.BACKGROUND_LIGHT_GRAY};
  border-radius: 10px;
  padding: 12px;
  border-width: 1px;
  border-color: ${APP_COLORS.BORDER_LIGHT};
  margin-bottom: 10px;
`;

export const SuggestionImageContainer = styled.View`
  width: 80px;
  height: 80px;
  margin-right: 12px;
  background-color: ${APP_COLORS.BACKGROUND_GRAY};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const SuggestionContent = styled.View`
  flex: 1;
`;

export const SuggestionTypes = styled.View`
  flex-direction: row;
  gap: 6px;
  margin-top: 6px;
`;

export const SuggestionTypeTag = styled.Text`
  padding-horizontal: 8px;
  padding-vertical: 4px;
  border-radius: 12px;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  overflow: hidden;
`;

export const LoadingIndicator = styled.View`
  margin-vertical: 20px;
`;
