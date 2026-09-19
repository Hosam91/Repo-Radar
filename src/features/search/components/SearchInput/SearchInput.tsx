import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

import { useAppDispatch } from "../../../../redux/hooks";
import { clearSearch } from "../../../../redux/search/searchSlice";
import { searchRepositories } from "../../../../redux/search/searchThunks";
import { useDebounce } from "../../../../shared/hooks/useDebounce";

export function SearchInput() {
  const [query, setQuery] = useState("");

  const dispatch = useAppDispatch();
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (!trimmedQuery) {
      dispatch(clearSearch());
      return;
    }

    const request = dispatch(searchRepositories(trimmedQuery));

    return () => {
      request.abort();
    };
  }, [debouncedQuery, dispatch]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
  };

  return (
    <TextField
      fullWidth
      size="small"
      type="search"
      label="Search GitHub repositories"
      placeholder="e.g. facebook/react"
      value={query}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}