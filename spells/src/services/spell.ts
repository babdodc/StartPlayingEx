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

export const spellApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://startplaying.games/api/detect-magic' }),
  endpoints: (builder) => ({
    listSpells: builder.query<{spells: Spell[]}, number | void>({
      query: (page = 0) => `spells?page=${page}`,
    }),
  }),
})

export const { useListSpellsQuery } = spellApi