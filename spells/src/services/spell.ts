import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


  export interface Spell
{
  name: string,
  level: number | undefined,
  school: string | undefined,
  castTime: string | undefined,
  range: string | undefined,
  components: string | undefined,
  materials: string | undefined,
  duration: string | undefined,
  description: string | undefined,
  image: string | undefined
}

interface SpellResponse<T> {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: {spells: Spell[]}
}

export const spellApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://startplaying.games/api/detect-magic' }),
  endpoints: (builder) => ({
    listSpells: builder.query<SpellResponse<Spell>, number | void>({
      query: (page = 0) => `spells?page=${page}`,
    }),
  }),
})

export const { useListSpellsQuery } = spellApi