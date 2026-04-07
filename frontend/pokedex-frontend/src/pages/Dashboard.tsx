import { useEffect, useState } from "react"
import { getPokemons, searchPokemon } from "../services/api"
import PokemonModal from "./PokemonModal"

export default function Dashboard() {
  const [pokemons, setPokemons] = useState<any[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
  async function load() {
    const data = await getPokemons()

    console.log("API RESPONSE:", data)

    setPokemons(Array.isArray(data.pokemons) ? data.pokemons : [])
  }

  load()
}, [])

  async function handleSearch() {
  if (!search) return

  try {
    setLoading(true)

    const data = await searchPokemon(search)

    // 💥 VALIDAÇÃO AQUI
    if (!data || !data.name || !data.id) {
      throw new Error("Pokémon inválido")
    }

    setSelectedPokemon({
      name: data.name,
      url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`
    })

  } catch (err) {
    alert("Pokémon não encontrado 😢")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Pokédex 🔥</h1>

      {/* 🔍 BUSCA */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Buscar por nome ou ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Buscar
        </button>
      </div>

      {loading && <p>Buscando...</p>}

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            onClick={() => setSelectedPokemon(pokemon)}
            className="bg-white rounded-xl p-4 shadow hover:scale-105 transition cursor-pointer text-center"
          >
            <h2 className="capitalize font-semibold">
              {pokemon.name}
            </h2>
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  )
}