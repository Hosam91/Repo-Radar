import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useDebounce } from "../../../../shared/hooks/useDebounce";
import { useAppDispatch } from "../../../../redux/hooks";
import { searchRepositories } from "../../../../redux/search/searchThunks";

export function SearchInput() {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const debouncedQuery = useDebounce(query, 500);

 useEffect(() => {
  const trimmedQuery = debouncedQuery.trim();

  if (!trimmedQuery) {
    return;
  }

  const request = dispatch(searchRepositories(trimmedQuery));

  return () => {
    request.abort();
  };
}, [debouncedQuery, dispatch]);


  return (
    <TextField
      fullWidth
      label="Search GitHub repositories"
      placeholder="e.g. facebook/react"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
    />
  );
}
