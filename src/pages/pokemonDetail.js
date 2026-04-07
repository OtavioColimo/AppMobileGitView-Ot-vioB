import React, { Component } from "react";
import {
  View,
  Text,
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
import {
  Container,
  TypesContainer,
  TypeTag,
  InfoContainer,
  InfoItem,
  InfoLabel,
  InfoValue,
  StatsContainer,
  StatRow,
  StatName,
  StatBar,
  StatFill,
  StatValue,
  MovesText,
  TypeEffectivenessContainer,
  TypeEffectivenessBadge,
  TypeEffectivenessText,
  EvolutionContainer,
  NoEvolutionText,
  SuggestionsContainer,
  SuggestionCard,
  SuggestionImageContainer,
  SuggestionContent,
  SuggestionTypes,
  SuggestionTypeTag,
  LoadingIndicator,
} from "../styles/PokemonDetailStyles";
import { getTypeColor, FILTER_LIMITS } from "../constants/pokemon";

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
      const speciesResponse = await api.get(`/pokemon-species/${pokemonId}`);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
      const chainResponse = await api.get(evolutionChainUrl);
      const chain = chainResponse.data.chain;
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
        .slice(0, FILTER_LIMITS.MAX_MOVES_DISPLAY)
        .map((move) => move.move.name)
        .join(", ");
      this.setState({ moves });
    } catch (error) {
      // Falha silenciosa se não conseguir buscar movimentos
    }
  };

  /**
   * Busca efetividade de tipos contra cada tipo do Pokémon.
   * Determina quais tipos o Pokémon é forte e fraco contra.
   */
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
      // Falha silenciosa se não conseguir buscar efetividade
    }
  };

  fetchRandomSuggestions = async () => {
    try {
      const suggestions = [];

      for (let i = 0; i < FILTER_LIMITS.MAX_SUGGESTIONS; i++) {
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
      // Falha silenciosa se não conseguir carregar sugestões
    }
  };

  /**
   * Recursivamente extrai Pokémon da cadeia evolutiva.
   * A API retorna uma estrutura aninhada; este método achata para um array.
   */
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

  /**
   * Renderiza card de sugestão com imagem, nome, ID e tipos.
   * Utilizado para mostrar Pokémon aleatórios relacionados.
   */
  renderSuggestion = ({ item: suggestion }) => {
    return (
      <TouchableOpacity
        onPress={() => this.fetchPokemonByName(suggestion.name)}
      >
        <SuggestionCard>
          <SuggestionImageContainer>
            <RelatedImage
              source={{
                uri: suggestion.image || "https://via.placeholder.com/100",
              }}
            />
          </SuggestionImageContainer>
          <SuggestionContent>
            <RelatedName numberOfLines={1}>
              #{suggestion.id} {suggestion.name}
            </RelatedName>
            <SuggestionTypes>
              {suggestion.types.slice(0, 2).map((type) => (
                <SuggestionTypeTag
                  key={type}
                  style={{
                    backgroundColor: getTypeColor(type),
                  }}
                >
                  {type}
                </SuggestionTypeTag>
              ))}
            </SuggestionTypes>
          </SuggestionContent>
        </SuggestionCard>
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

    // Combina efetividades de todos os tipos em listas únicas
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
      <Container>
        <ScrollView
          showsVerticalScrollIndicator={true}
        >
          <HeroImage
            source={{
              uri: pokemon.image || "https://via.placeholder.com/200",
            }}
          />

          <HeroName>#{pokemon.id} {pokemon.name}</HeroName>

          <TypesContainer>
            {pokemon.types?.slice(0, FILTER_LIMITS.MAX_TYPES_DISPLAY).map((type) => (
              <TypeTag
                key={type}
                style={{ backgroundColor: getTypeColor(type) }}
              >
                {type}
              </TypeTag>
            ))}
          </TypesContainer>

          <SectionTitle>Informações Básicas</SectionTitle>
          <InfoContainer>
            <InfoItem>
              <InfoLabel>Altura</InfoLabel>
              <InfoValue>
                {(pokemon.height / 10).toFixed(1)}m
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Peso</InfoLabel>
              <InfoValue>
                {(pokemon.weight / 10).toFixed(1)}kg
              </InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>XP Base</InfoLabel>
              <InfoValue>{pokemon.baseExperience}</InfoValue>
            </InfoItem>
          </InfoContainer>

          <SectionTitle>Habilidades</SectionTitle>
          <HeroDescription>
            {pokemon.abilities?.join(", ") ||
              "Sem habilidades disponíveis"}
          </HeroDescription>

          {pokemon.stats && pokemon.stats.length > 0 && (
            <>
              <SectionTitle>Stats</SectionTitle>
              <StatsContainer>
                {pokemon.stats.slice(0, 6).map((stat) => (
                  <StatRow key={stat.stat.name}>
                    <StatName>{stat.stat.name}</StatName>
                    <StatBar>
                      <StatFill
                        style={{ width: `${Math.min(stat.base_stat, 150)}%` }}
                      />
                    </StatBar>
                    <StatValue>{stat.base_stat}</StatValue>
                  </StatRow>
                ))}
              </StatsContainer>
            </>
          )}

          {moves && (
            <>
              <SectionTitle>Golpes 💥</SectionTitle>
              <MovesText>
                {moves}
              </MovesText>
            </>
          )}

          {strongAgainstTypes.length > 0 && (
            <>
              <SectionTitle>Forte Contra ✅</SectionTitle>
              <TypeEffectivenessContainer>
                {strongAgainstTypes.slice(0, 8).map((type) => (
                  <TypeEffectivenessBadge
                    key={type}
                    badgeColor={getTypeColor(type)}
                  >
                    <TypeEffectivenessText>
                      {type}
                    </TypeEffectivenessText>
                  </TypeEffectivenessBadge>
                ))}
              </TypeEffectivenessContainer>
            </>
          )}

          {weakAgainstTypes.length > 0 && (
            <>
              <SectionTitle>Fraco Contra ❌</SectionTitle>
              <TypeEffectivenessContainer>
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
                    <TypeEffectivenessText>
                      {type}
                    </TypeEffectivenessText>
                  </View>
                ))}
              </TypeEffectivenessContainer>
            </>
          )}

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#ff0000"
              style={{ marginVertical: 20 }}
            />
          ) : evolutionChain.length > 1 ? (
            <>
              <SectionTitle>
                Cadeia Evolutiva
              </SectionTitle>
              <EvolutionContainer>
                {evolutionChain.map((evolution) => (
                  <View key={evolution.name}>
                    {this.renderEvolution({ item: evolution })}
                  </View>
                ))}
              </EvolutionContainer>
            </>
          ) : (
            <NoEvolutionText>
              Sem evolução disponível
            </NoEvolutionText>
          )}

          {this.state.suggestions.length > 0 && (
            <>
              <SectionTitle>
                Sugestões 🎲
              </SectionTitle>
              <SuggestionsContainer>
                {this.state.suggestions.map((suggestion) => (
                  <View key={String(suggestion.id)}>
                    {this.renderSuggestion({ item: suggestion })}
                  </View>
                ))}
              </SuggestionsContainer>
            </>
          )}
        </ScrollView>
      </Container>
    );
  }
}

// Estilos para fraco contra (usa View diretamente, não styled-component)
const styles = {
  typeEffectivenessBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#999",
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
};
