import type { Pokemon } from "../types/Pokemon"
import PokemonCard from "./PokemonCard"

interface Props {
  pokemons: Pokemon[]
}

export default function PokemonList({ pokemons }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {pokemons.map((p, index) => (
        <PokemonCard key={index} pokemon={p} />
      ))}
    </div>
  )
}