// src/services/api.ts
const BASE_URL = "/api/pokemon"

export async function getPokemons() {
  const res = await fetch(BASE_URL)
  return res.json()
}

export async function getPokemonById(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`)
  return res.json()
}   

export async function savePokemon(pokemon: any) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pokemon),
  })
  return res.json()
}

export async function getSavedPokemons() {
  const res = await fetch(`${BASE_URL}/saved`)
  return res.json()
}

export async function searchPokemon(id: string) {
  const res = await fetch(`/api/pokemon/${id}`)

  if (!res.ok) {
    throw new Error("Erro ao buscar Pokémon")
  }

  return res.json()
}