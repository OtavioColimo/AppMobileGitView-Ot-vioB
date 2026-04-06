import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import api from "../services/api";
import {
  HeroImage,
  HeroName,
  HeroDescription,
  SectionTitle,
  RelatedCard,
  RelatedImage,
  RelatedName,
} from "../styles";

export default class PokemonDetail extends Component {
  state = {
    pokemon: {},
    evolutionChain: [],
    loading: true,
    moves: [],
    typeEffectiveness: {},
    suggestions: [],
  };

  async componentDidMount() {
    const { route } = this.props;
    const { pokemon } = route.params;

    this.setState({ pokemon });
    this.fetchEvolutionChain(pokemon.id);
    this.fetchMoves(pokemon);
    this.fetchTypeEffectiveness(pokemon.types);
    this.fetchRandomSuggestions();
  }

  fetchEvolutionChain = async (pokemonId) => {
    try {
      // Buscar espécie do Pokémon para obter cadeia evolutiva
      const speciesResponse = await api.get(`/pokemon-species/${pokemonId}`);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

      // Buscar cadeia evolutiva
      const chainResponse = await api.get(evolutionChainUrl);
      const chain = chainResponse.data.chain;

      // Extrair Pokémon da cadeia evolutiva
      const evolutions = this.extractEvolutions(chain);

      this.setState({
        evolutionChain: evolutions,
        loading: false,
      });
    } catch (error) {

      this.setState({ loading: false });
    }
  };

  fetchMoves = async (pokemon) => {
    try {
      const response = await api.get(`/pokemon/${pokemon.name}`);
      const moves = response.data.moves
        .slice(0, 15)
        .map((move) => move.move.name)
        .join(", ");
      this.setState({ moves });
    } catch (error) {

    }
  };

  fetchTypeEffectiveness = async (types) => {
    try {
      const typeEffectiveness = {};

      for (const type of types) {
        const response = await api.get(`/type/${type}`);
        const data = response.data;

        typeEffectiveness[type] = {
          strongAgainst: data.damage_relations.damage_to.map((t) => t.name),
          weakAgainst: data.damage_relations.damage_from.map((t) => t.name),
        };
      }

      this.setState({ typeEffectiveness });
    } catch (error) {

    }
  };

  fetchRandomSuggestions = async () => {
    try {
      const suggestions = [];
      
      // Gerar 4 números aleatórios entre 1 e 150
      for (let i = 0; i < 4; i++) {
        const randomId = Math.floor(Math.random() * 151) + 1;
        const response = await api.get(`/pokemon/${randomId}`);
        const data = response.data;
        
        suggestions.push({
          id: data.id,
          name: data.name,
          image: 
            data.sprites?.other?.["official-artwork"]?.front_default ||
            data.sprites?.front_default,
          types: data.types?.map((t) => t.type.name) || [],
        });
      }
      
      this.setState({ suggestions });
    } catch (error) {

    }
  };

  extractEvolutions = (chain, evolutions = []) => {
    if (chain.species) {
      evolutions.push({
        name: chain.species.name,
        url: chain.species.url,
      });
    }

    if (chain.evolves_to && chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolution) => {
        this.extractEvolutions(evolution, evolutions);
      });
    }

    return evolutions;
  };

  renderEvolution = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.fetchPokemonByName(item.name);
      }}
    >
      <RelatedCard>
        <RelatedImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.getPokemonIdFromUrl(item.url)}.png`,
          }}
        />
        <RelatedName numberOfLines={1}>{item.name}</RelatedName>
      </RelatedCard>
    </TouchableOpacity>
  );

  renderSuggestion = ({ item: suggestion }) => {
    const getTypeColor = (type) => {
      const colors = {
        normal: "#A8A878",
        fighting: "#C03028",
        flying: "#A890F0",
        poison: "#A040A0",
        ground: "#E0C068",
        rock: "#B8A038",
        bug: "#A8B820",
        ghost: "#705898",
        steel: "#B8B8D0",
        fire: "#F08030",
        water: "#6890F0",
        grass: "#78C850",
        electric: "#F8D030",
        psychic: "#F85888",
        ice: "#98D8D8",
        dragon: "#7038F8",
        dark: "#705848",
        fairy: "#EE99AC",
      };
      return colors[type] || "#999";
    };

    return (
      <TouchableOpacity
        onPress={() =>
          this.fetchPokemonByName(suggestion.name)
        }
        style={styles.suggestionCard}
      >
        <View style={styles.suggestionImageContainer}>
          <RelatedImage
            source={{
              uri: suggestion.image || "https://via.placeholder.com/100",
            }}
          />
        </View>
        <View style={styles.suggestionContent}>
          <RelatedName numberOfLines={1}>
            #{suggestion.id} {suggestion.name}
          </RelatedName>
          <View style={styles.suggestionTypes}>
            {suggestion.types.slice(0, 2).map((type) => (
              <Text
                key={type}
                style={[
                  styles.suggestionTypeTag,
                  { backgroundColor: getTypeColor(type) },
                ]}
              >
                {type}
              </Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  getPokemonIdFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  fetchPokemonByName = async (name) => {
    try {
      this.setState({ loading: true });
      const response = await api.get(`/pokemon/${name}`);
      const data = response.data;

      const pokemon = {
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
        stats: data.stats || [],
      };

      this.setState({ pokemon, loading: false });
      this.fetchEvolutionChain(pokemon.id);
      this.fetchMoves(pokemon);
      this.fetchTypeEffectiveness(pokemon.types);
      this.fetchRandomSuggestions();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar o Pokémon: " + error.message);
      this.setState({ loading: false });
    }
  };

  render() {
    const { pokemon, evolutionChain, loading, moves, typeEffectiveness } = this.state;

    const getTypeColor = (type) => {
      const colors = {
        normal: "#A8A878",
        fighting: "#C03028",
        flying: "#A890F0",
        poison: "#A040A0",
        ground: "#E0C068",
        rock: "#B8A038",
        bug: "#A8B820",
        ghost: "#705898",
        steel: "#B8B8D0",
        fire: "#F08030",
        water: "#6890F0",
        grass: "#78C850",
        electric: "#F8D030",
        psychic: "#F85888",
        ice: "#98D8D8",
        dragon: "#7038F8",
        dark: "#705848",
        fairy: "#EE99AC",
      };
      return colors[type] || "#999";
    };

    // Calcular tipos forte contra e fraco contra
    let strongAgainstTypes = [];
    let weakAgainstTypes = [];

    Object.values(typeEffectiveness).forEach((typeData) => {
      strongAgainstTypes = [
        ...new Set([...strongAgainstTypes, ...typeData.strongAgainst]),
      ];
      weakAgainstTypes = [
        ...new Set([...weakAgainstTypes, ...typeData.weakAgainst]),
      ];
    });

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={true}
        >
          <HeroImage
            source={{
              uri: pokemon.image || "https://via.placeholder.com/200",
            }}
          />

          <HeroName>#{pokemon.id} {pokemon.name}</HeroName>

          <View style={styles.typesContainer}>
            {pokemon.types?.slice(0, 3).map((type) => (
              <Text
                key={type}
                style={[
                  styles.typeTag,
                  { backgroundColor: getTypeColor(type) },
                ]}
              >
                {type}
              </Text>
            ))}
          </View>

          <SectionTitle>Informações Básicas</SectionTitle>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Altura</Text>
              <Text style={styles.infoValue}>
                {(pokemon.height / 10).toFixed(1)}m
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Peso</Text>
              <Text style={styles.infoValue}>
                {(pokemon.weight / 10).toFixed(1)}kg
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>XP Base</Text>
              <Text style={styles.infoValue}>{pokemon.baseExperience}</Text>
            </View>
          </View>

          <SectionTitle>Habilidades</SectionTitle>
          <HeroDescription>
            {pokemon.abilities?.join(", ") ||
              "Sem habilidades disponíveis"}
          </HeroDescription>

          {pokemon.stats && pokemon.stats.length > 0 && (
            <>
              <SectionTitle>Stats</SectionTitle>
              <View style={styles.statsContainer}>
                {pokemon.stats.slice(0, 6).map((stat) => (
                  <View key={stat.stat.name} style={styles.statRow}>
                    <Text style={styles.statName}>{stat.stat.name}</Text>
                    <View style={styles.statBar}>
                      <View
                        style={[
                          styles.statFill,
                          { width: `${Math.min(stat.base_stat, 150)}%` },
                        ]}
                      />
                    </View>
                    <Text style={styles.statValue}>{stat.base_stat}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {moves && (
            <>
              <SectionTitle>Golpes 💥</SectionTitle>
              <HeroDescription style={styles.movesText}>
                {moves}
              </HeroDescription>
            </>
          )}

          {strongAgainstTypes.length > 0 && (
            <>
              <SectionTitle>Forte Contra ✅</SectionTitle>
              <View style={styles.typeEffectivenessContainer}>
                {strongAgainstTypes.slice(0, 8).map((type) => (
                  <View
                    key={type}
                    style={[
                      styles.typeEffectivenessBadge,
                      { backgroundColor: getTypeColor(type) },
                    ]}
                  >
                    <Text style={styles.typeEffectivenessText}>
                      {type}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {weakAgainstTypes.length > 0 && (
            <>
              <SectionTitle>Fraco Contra ❌</SectionTitle>
              <View style={styles.typeEffectivenessContainer}>
                {weakAgainstTypes.slice(0, 8).map((type) => (
                  <View
                    key={type}
                    style={[
                      styles.typeEffectivenessBadge,
                      {
                        backgroundColor: getTypeColor(type),
                        opacity: 0.6,
                        borderWidth: 2,
                        borderColor: getTypeColor(type),
                      },
                    ]}
                  >
                    <Text style={styles.typeEffectivenessText}>
                      {type}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#ff0000"
              style={styles.loadingIndicator}
            />
          ) : evolutionChain.length > 1 ? (
            <>
              <SectionTitle style={styles.relatedTitle}>
                Cadeia Evolutiva
              </SectionTitle>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                style={styles.evolutionScroll}
              >
                {evolutionChain.map((evolution) => (
                  <View key={evolution.name}>
                    {this.renderEvolution({ item: evolution })}
                  </View>
                ))}
              </ScrollView>
            </>
          ) : (
            <Text style={styles.noRelatedText}>
              Sem evolução disponível
            </Text>
          )}

          {this.state.suggestions.length > 0 && (
            <>
              <SectionTitle style={styles.suggestionsTitle}>
                Sugestões 🎲
              </SectionTitle>
              <View style={styles.suggestionsContainer}>
                {this.state.suggestions.map((suggestion) => (
                  <View key={String(suggestion.id)}>
                    {this.renderSuggestion({ item: suggestion })}
                  </View>
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 100,
    flexGrow: 1,
  },
  typesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 15,
  },
  typeTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginVertical: 10,
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff0000",
  },
  statsContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  statName: {
    width: 70,
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textTransform: "capitalize",
  },
  statBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#ddd",
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  statFill: {
    height: "100%",
    backgroundColor: "#ff0000",
  },
  statValue: {
    width: 35,
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  relatedTitle: {
    marginTop: 30,
  },
  evolutionScroll: {
    marginVertical: 12,
  },
  noRelatedText: {
    textAlign: "center",
    color: "#999",
    marginVertical: 20,
    fontSize: 14,
  },
  movesText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#555",
  },
  typeEffectivenessContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 10,
  },
  typeEffectivenessBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#999",
  },
  typeEffectivenessText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  suggestionsTitle: {
    marginTop: 30,
  },
  suggestionsContainer: {
    gap: 12,
  },
  suggestionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },
  suggestionImageContainer: {
    width: 80,
    height: 80,
    marginRight: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTypes: {
    flexDirection: "row",
    gap: 6,
    marginTop: 6,
  },
  suggestionTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    overflow: "hidden",
  },
});
