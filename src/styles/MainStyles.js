import styled from "styled-components/native";
import { APP_COLORS } from "../constants/pokemon";

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-horizontal: 0;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${APP_COLORS.PRIMARY_RED};
`;

export const LogoutBtn = styled.TouchableOpacity`
  background-color: ${APP_COLORS.PRIMARY_RED};
  padding-horizontal: 15px;
  padding-vertical: 8px;
  border-radius: 5px;
`;

export const LogoutBtnText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 12px;
  align-items: center;
`;

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: APP_COLORS.TEXT_LIGHT_GRAY,
})`
  flex: 1;
  background-color: ${APP_COLORS.BACKGROUND_GRAY};
  border-radius: 8px;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  border-width: 1px;
  border-color: ${APP_COLORS.BORDER_GRAY};
  font-size: 14px;
  color: ${APP_COLORS.TEXT_DARK};
`;

export const FilterToggleBtn = styled.TouchableOpacity`
  background-color: ${APP_COLORS.PRIMARY_RED};
  width: 44px;
  height: 44px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const FilterToggleBtnText = styled.Text`
  font-size: 20px;
  color: #fff;
`;

export const ResultCount = styled.Text`
  font-size: 12px;
  color: ${APP_COLORS.TEXT_LIGHT_GRAY};
  margin-bottom: 10px;
  margin-left: 2px;
`;

export const FilterPanel = styled.View`
  background-color: ${APP_COLORS.BACKGROUND_LIGHT_GRAY};
  border-radius: 8px;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: ${APP_COLORS.BORDER_GRAY};
  max-height: 280px;
`;

export const FilterTabs = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${APP_COLORS.BORDER_GRAY};
`;

export const FilterTab = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: 10px;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) =>
    props.isActive ? APP_COLORS.PRIMARY_RED : "transparent"};
`;

export const FilterTabText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) =>
    props.isActive ? APP_COLORS.PRIMARY_RED : APP_COLORS.TEXT_LIGHT_GRAY};
`;

export const FilterContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding-horizontal: 12px;
  padding-vertical: 10px;
  max-height: 220px;
`;

export const FilterOptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TypeFilterBtn = styled.TouchableOpacity`
  padding-horizontal: 12px;
  padding-vertical: 8px;
  border-radius: 20px;
  background-color: ${(props) => props.bgColor || "#f0f0f0"};
  border-width: ${(props) =>
    props.isActive ? "2px" : "1px"};
  border-color: ${(props) =>
    props.isActive ? APP_COLORS.PRIMARY_RED : APP_COLORS.BORDER_GRAY};
`;

export const TypeFilterBtnText = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${(props) =>
    props.isActive ? "#fff" : APP_COLORS.TEXT_GRAY};
  text-transform: capitalize;
`;

export const StatFilterContainer = styled.View`
  width: 100%;
`;

export const StatFilterLabel = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${APP_COLORS.TEXT_DARK};
  margin-bottom: 10px;
`;

export const SliderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  gap: 15px;
`;

export const SliderBtn = styled.Text`
  width: 40px;
  height: 40px;
  background-color: ${APP_COLORS.PRIMARY_RED};
  color: #fff;
  text-align: center;
  text-align-vertical: center;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  line-height: 40px;
`;

export const SliderValue = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${APP_COLORS.TEXT_DARK};
  min-width: 50px;
  text-align: center;
`;

export const ResetBtn = styled.TouchableOpacity`
  background-color: #f0f0f0;
  padding-vertical: 10px;
  border-radius: 8px;
  align-items: center;
  border-width: 1px;
  border-color: ${APP_COLORS.BORDER_GRAY};
`;

export const ResetBtnText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${APP_COLORS.PRIMARY_RED};
`;

export const CardContent = styled.View`
  flex: 1;
  margin-left: 15px;
  justify-content: space-between;
  padding-vertical: 10px;
  padding-right: 10px;
`;

export const TypesContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-vertical: 5px;
`;

export const TypeTag = styled.Text`
  padding-horizontal: 8px;
  padding-vertical: 4px;
  border-radius: 12px;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  overflow: hidden;
`;

export const CardStats = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Stat = styled.Text`
  font-size: 12px;
  color: ${APP_COLORS.TEXT_GRAY};
  font-weight: 600;
`;

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled.Text`
  font-size: 16px;
  color: ${APP_COLORS.TEXT_LIGHT_GRAY};
  margin-bottom: 20px;
`;

export const RetryBtn = styled.TouchableOpacity`
  background-color: ${APP_COLORS.PRIMARY_RED};
  padding-horizontal: 25px;
  padding-vertical: 12px;
  border-radius: 8px;
`;

export const RetryBtnText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;
