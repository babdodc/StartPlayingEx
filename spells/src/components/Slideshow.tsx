import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useListSpellsQuery } from "../services/spell";

export const Slideshow = () =>
{
    const [page, setPage] = useState(0);
    const { data: spells, isLoading, isFetching } = useListSpellsQuery(page);
  
    console.log(spells,isLoading,isFetching)
      

    return <div>

    </div>
}