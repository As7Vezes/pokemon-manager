import type { Pokemon } from "../types/Pokemon"

interface Props {
  pokemon: Pokemon
  onSave?: () => void
}

export default function PokemonCard({ pokemon, onSave }: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:scale-105 transition">
      <h2 className="text-lg font-bold capitalize">
        {pokemon.name}
      </h2>

      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>

      {onSave && (
        <button
          onClick={onSave}
          className="mt-3 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
        >
          Salvar
        </button>
      )}
    </div>
  )
}