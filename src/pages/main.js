import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import api from "../services/api";
import {
  DetailContainer,
  CardList,
  CardContainer,
  CardImage,
  CardTitle,
  CardSubtitle,
  LoadingContainer,
} from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TYPE_COLORS, getTypeColor, POKEMON_TYPES, FILTER_LIMITS } from "../constants/pokemon";
import {
  HeaderContainer,
  Title,
  LogoutBtn,
  LogoutBtnText,
  SearchContainer,
  SearchInput,
  FilterToggleBtn,
  FilterToggleBtnText,
  ResultCount,
  FilterPanel,
  FilterTabs,
  FilterTab,
  FilterTabText,
  FilterContent,
  FilterOptionsContainer,
  TypeFilterBtn,
  TypeFilterBtnText,
  StatFilterContainer,
  StatFilterLabel,
  SliderContainer,
  SliderBtn,
  SliderValue,
  ResetBtn,
  ResetBtnText,
  CardContent,
  TypesContainer,
  TypeTag,
  CardStats,
  Stat,
  EmptyContainer,
  EmptyText,
  RetryBtn,
  RetryBtnText,
} from "../styles/MainStyles";

export default class Main extends Component {
  state = {
    allPokemon: [],
    filteredPokemon: [],
    loading: true,
    offset: 0,
    searchText: "",
    selectedType: null,
    showFilterModal: false,
    filterTab: "type",
    minHeight: 0,
    maxHeight: 100,
    minWeight: 0,
    maxWeight: 600,
  };

  async componentDidMount() {
    this.fetchAllPokemon();
  }

  fetchAllPokemon = async () => {
    try {
      this.setState({ loading: true });
      const { offset } = this.state;

      const response = await api.get("/pokemon", {
        params: {
          limit: 50,
          offset: offset,
        },
      });



      const pokemonDetails = await Promise.all(
        response.data.results.map(async (pokemon) => {
          try {
            const detailedResponse = await api.get(`/pokemon/${pokemon.name}`);
            const data = detailedResponse.data;

            return {
              id: data.id,
              name: data.name,
              image:
                data.sprites?.other?.["official-artwork"]?.front_default ||
                data.sprites?.front_default,
              types: data.types?.map((t) => t.type.name) || [],
              height: data.height,
              weight: data.weight,
              abilities: data.abilities?.map((a) => a.ability.name) || [],
              baseExperience: data.base_experience || 0,
            };
          } catch (err) {
    
            return null;
          }
        })
      );

      const validPokemon = pokemonDetails.filter((p) => p !== null);
      const allPokemon = [...this.state.allPokemon, ...validPokemon];

      this.setState({
        allPokemon,
        loading: false,
      }, this.applyFilters);  // Reaplicar filtros após carregar novos dados
    } catch (error) {

      Alert.alert("Erro", "Não foi possível carregar os Pokémon");
      this.setState({ loading: false });
    }
  };

  loadMore = () => {
    const { offset } = this.state;
    this.setState({ offset: offset + 50 }, this.fetchAllPokemon);
  };

  handleSearch = (text) => {
    this.setState({ searchText: text }, this.applyFilters);
  };

  handleTypeFilter = (type) => {
    const { selectedType } = this.state;
    const newType = selectedType === type ? null : type;
    this.setState({ selectedType: newType }, this.applyFilters);
  };

  /**
   * Aplica múltiplos filtros combinados: tipo, busca por nome/ID, altura e peso.
   * Os filtros funcionam de forma acumulativa (AND lógico).
   */
  applyFilters = () => {
    const {
      allPokemon,
      searchText,
      selectedType,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
    } = this.state;

    let filtered = allPokemon;

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.includes(selectedType)
      );
    }

    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      filtered = filtered.filter(
        (pokemon) =>
          pokemon.name.includes(search) || pokemon.id.toString().includes(search)
      );
    }

    filtered = filtered.filter(
      (pokemon) => pokemon.height >= minHeight && pokemon.height <= maxHeight
    );

    filtered = filtered.filter(
      (pokemon) => pokemon.weight >= minWeight && pokemon.weight <= maxWeight
    );

    this.setState({ filteredPokemon: filtered });
  };

  handlePokemonPress = (pokemon) => {
    this.props.navigation.navigate("PokemonDetail", { pokemon });
  };

  handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    this.props.navigation.navigate("Login");
  };

  renderPokemonCard = ({ item: pokemon }) => (
    <TouchableOpacity onPress={() => this.handlePokemonPress(pokemon)}>
      <CardContainer>
        <CardImage
          source={{
            uri: pokemon.image || "https://via.placeholder.com/150",
          }}
        />
        <CardContent>
          <CardTitle numberOfLines={1}>
            #{pokemon.id} {pokemon.name}
          </CardTitle>
          <TypesContainer>
            {pokemon.types.slice(0, 2).map((type) => (
              <TypeTag
                key={type}
                style={{
                  backgroundColor: getTypeColor(type),
                }}
              >
                {type}
              </TypeTag>
            ))}
          </TypesContainer>
          <CardSubtitle numberOfLines={2}>
            {pokemon.abilities.join(", ") || "Sem habilidades"}
          </CardSubtitle>
          <CardStats>
            <Stat>
              ⚖️ {(pokemon.weight / 10).toFixed(1)}kg
            </Stat>
            <Stat>
              📏 {(pokemon.height / 10).toFixed(1)}m
            </Stat>
          </CardStats>
        </CardContent>
      </CardContainer>
    </TouchableOpacity>
  );

  render() {
    const {
      filteredPokemon,
      loading,
      showFilterModal,
      selectedType,
      searchText,
      filterTab,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
    } = this.state;

    if (loading && filteredPokemon.length === 0) {
      return (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#ff0000" />
          <Text style={{ marginTop: 10, color: "#999" }}>
            Carregando Pokémon...
          </Text>
        </LoadingContainer>
      );
    }

    return (
      <DetailContainer style={{ flex: 1, paddingTop: 10 }}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Pokédex</Text>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={this.handleLogout}
          >
            <Text style={styles.logoutBtnText}>🚪 Sair</Text>
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Buscar por nome ou ID..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={this.handleSearch}
            keyboardType="default"
          />
          <TouchableOpacity
            style={styles.filterToggleBtn}
            onPress={() =>
              this.setState({ showFilterModal: !showFilterModal })
            }
          >
            <Text style={styles.filterToggleBtnText}>
              {showFilterModal ? "✕" : "⚙️"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* RESULT COUNT */}
        <Text style={styles.resultCount}>
          {filteredPokemon.length} Pokémon encontrados
        </Text>

        {/* FILTER MODAL */}
        {showFilterModal && (
          <View style={styles.filterPanel}>
            {/* FILTER TABS */}
            <View style={styles.filterTabs}>
              <TouchableOpacity
                style={[
                  styles.filterTab,
                  filterTab === "type" && styles.filterTabActive,
                ]}
                onPress={() => this.setState({ filterTab: "type" })}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    filterTab === "type" && styles.filterTabTextActive,
                  ]}
                >
                  Tipo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterTab,
                  filterTab === "stats" && styles.filterTabActive,
                ]}
                onPress={() => this.setState({ filterTab: "stats" })}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    filterTab === "stats" && styles.filterTabTextActive,
                  ]}
                >
                  Stats
                </Text>
              </TouchableOpacity>
            </View>

            {/* FILTER CONTENT */}
            <ScrollView
              style={styles.filterContent}
              showsVerticalScrollIndicator={false}
            >
              {filterTab === "type" && (
                <View style={styles.filterOptionsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.typeFilterBtn,
                      selectedType === null && styles.typeFilterBtnActive,
                    ]}
                    onPress={() => this.handleTypeFilter(null)}
                  >
                    <Text
                      style={[
                        styles.typeFilterBtnText,
                        selectedType === null &&
                          styles.typeFilterBtnTextActive,
                      ]}
                    >
                      Todos
                    </Text>
                  </TouchableOpacity>

                  {POKEMON_TYPES.map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeFilterBtn,
                        {
                          backgroundColor:
                            selectedType === type
                              ? this.getTypeColor(type)
                              : "#f0f0f0",
                        },
                        selectedType === type && styles.typeFilterBtnActive,
                      ]}
                      onPress={() => this.handleTypeFilter(type)}
                    >
                      <Text
                        style={[
                          styles.typeFilterBtnText,
                          selectedType === type &&
                            styles.typeFilterBtnTextActive,
                        ]}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {filterTab === "stats" && (
                <View style={styles.filterOptionsContainer}>
                  <View style={styles.statFilterContainer}>
                    <Text style={styles.statFilterLabel}>
                      Altura: {(minHeight / 10).toFixed(1)}m -{" "}
                      {(maxHeight / 10).toFixed(1)}m
                    </Text>
                    <View style={styles.sliderContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState(
                            { minHeight: Math.max(0, minHeight - 5) },
                            this.applyFilters
                          )
                        }
                      >
                        <Text style={styles.sliderBtn}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.sliderValue}>{minHeight}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState(
                            { minHeight: Math.min(maxHeight, minHeight + 5) },
                            this.applyFilters
                          )
                        }
                      >
                        <Text style={styles.sliderBtn}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.statFilterLabel}>
                      Peso: {(minWeight / 10).toFixed(1)}kg -{" "}
                      {(maxWeight / 10).toFixed(1)}kg
                    </Text>
                    <View style={styles.sliderContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState(
                            { minWeight: Math.max(0, minWeight - 50) },
                            this.applyFilters
                          )
                        }
                      >
                        <Text style={styles.sliderBtn}>−</Text>
                      </TouchableOpacity>
                      <Text style={styles.sliderValue}>{minWeight}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          this.setState(
                            { minWeight: Math.min(maxWeight, minWeight + 50) },
                            this.applyFilters
                          )
                        }
                      >
                        <Text style={styles.sliderBtn}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={styles.resetBtn}
                      onPress={() =>
                        this.setState(
                          {
                            minHeight: 0,
                            maxHeight: 100,
                            minWeight: 0,
                            maxWeight: 600,
                            selectedType: null,
                            searchText: "",
                          },
                          this.applyFilters
                        )
                      }
                    >
                      <Text style={styles.resetBtnText}>Resetar Stats</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        )}

        {/* POKEMON LIST */}
        {filteredPokemon.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum Pokémon encontrado</Text>
            <TouchableOpacity
              style={styles.retryBtn}
              onPress={() => {
                this.setState(
                  {
                    searchText: "",
                    selectedType: null,
                    selectedEvolution: null,
                    minHeight: 0,
                    maxHeight: 100,
                    minWeight: 0,
                    maxWeight: 600,
                  },
                  () => {
                    this.applyFilters();
                  }
                );
              }}
            >
              <Text style={styles.retryBtnText}>Limpar Filtros</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <CardList
            data={filteredPokemon}
            keyExtractor={(p) => String(p.id)}
            renderItem={this.renderPokemonCard}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.3}
            ListFooterComponent={
              loading ? (
                <ActivityIndicator
                  size="large"
                  color="#ff0000"
                  style={{ paddingVertical: 20 }}
                />
              ) : null
            }
          />
        )}
      </DetailContainer>
    );
  }
}
