export interface CapturedPokemon {
  id: number;
  pokemonId: number;
  name: string;
  image: string;
  captureDate: Date;
  captureLocation: string;
  pokeballType: string;
  level: number;
  nickname?: string;
  description?: string;
}
