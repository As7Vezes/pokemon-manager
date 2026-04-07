import { useEffect, useState } from "react"
import { getSavedPokemons } from "../services/api"

export default function Saved() {
  const [pokemons, setPokemons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getSavedPokemons()
        console.log(data)
        setPokemons(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return <p className="p-6">Carregando...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Salvos</h1>

      <div className="grid grid-cols-4 gap-4">
        {pokemons.map((p) => (
          <div key={p.id} className="bg-white shadow p-4 rounded">
            <p className="capitalize font-semibold">{p.name}</p>

            <div className="text-sm mt-2">
              <p>Altura: {p.height}</p>
              <p>Peso: {p.weight}</p>
              <img
                src={p.image}
                className="mx-auto w-32 h-32"
                />
            </div>

            <div className="flex gap-1 mt-2 flex-wrap">
              {p.types.map((t: string) => (
                <span
                  key={t}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}