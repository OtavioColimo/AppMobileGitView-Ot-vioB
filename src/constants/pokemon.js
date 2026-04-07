/**
 * Constantes da Pokédex
 * Centraliza cores de tipos, limites de stats e valores reutilizáveis
 */

// Mapeamento de cores para cada tipo de Pokémon
export const TYPE_COLORS = {
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

// Obter cor de um tipo (com fallback)
export const getTypeColor = (type) => TYPE_COLORS[type] || "#999";

// Lista de todos os tipos de Pokémon disponíveis
export const POKEMON_TYPES = Object.keys(TYPE_COLORS);

// Limites padrão para filtros de stats
export const FILTER_LIMITS = {
  HEIGHT: { MIN: 0, MAX: 100 },
  WEIGHT: { MIN: 0, MAX: 600 },
  POKEMON_PER_REQUEST: 50,
  MAX_SUGGESTIONS: 4,
  MAX_MOVES_DISPLAY: 15,
  MAX_TYPES_DISPLAY: 3,
};

// Cores base da aplicação
export const APP_COLORS = {
  PRIMARY_RED: "#ff0000",
  BACKGROUND_LIGHT: "#fff",
  BACKGROUND_GRAY: "#f5f5f5",
  BACKGROUND_LIGHT_GRAY: "#f9f9f9",
  TEXT_DARK: "#333",
  TEXT_GRAY: "#666",
  TEXT_LIGHT_GRAY: "#999",
  BORDER_LIGHT: "#eee",
  BORDER_GRAY: "#ddd",
  BORDER_LIGHT_GRAY: "#ccc",
  PURPLE_PRIMARY: "#9705f9c2",
};
