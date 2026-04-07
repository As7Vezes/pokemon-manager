import { useEffect, useState } from "react"
import { savePokemon } from "../services/api"

export default function PokemonModal({ pokemon, onClose }: any) {
  const [details, setDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(pokemon.url)
        const data = await res.json()
        setDetails(data)
        console.log("detahes do pokemon: ", data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [pokemon])

  async function handleSave() {
  if (!details) return

  await savePokemon({
    id: details.id,
    name: details.name,
    height: details.height,
    weight: details.weight,
    types: details.types.map((t: any) => t.type.name),
    abilities: details.abilities.map((a: any) => a.ability.name),
    image: details.sprites.front_default
  })

  alert("Pokémon salvo com sucesso! 🚀")
  onClose()
}

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
        
        {/* HEADER */}
        <h2 className="text-2xl font-bold capitalize text-center">
          {details.name}
        </h2>

        {/* IMAGE */}
        <img
          src={details.sprites.front_default}
          alt={details.name}
          className="mx-auto w-32 h-32"
        />

        {/* INFO */}
        <div className="mt-4 space-y-2 text-center">
          <p><strong>Altura:</strong> {details.height}</p>
          <p><strong>Peso:</strong> {details.weight}</p>

          <div>
            <strong>Tipos:</strong>
            <div className="flex justify-center gap-2 mt-1">
              {details.types.map((t: any) => (
                <span
                  key={t.type.name}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm capitalize"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Fechar
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}