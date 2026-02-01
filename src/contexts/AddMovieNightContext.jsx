import { createContext, useContext, useState } from "react";

const AddMovieNightContext = createContext();

function AddMovieNightProvider({ children }) {
  // Lights component states
  const [title, setTitle] = useState("");

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [description, setDescription] = useState("");

  // Camera component states

  const [searchedMovieTitle, setSearchedMovieTitle] = useState("");

  const [fetchedMovies, setFetchedMovie] = useState([]);
  const [pickedMovies, setPickedMovies] = useState(["", "", ""]);

  return (
    <AddMovieNightContext.Provider
      value={{
        title,
        setTitle,
        location,
        setLocation,
        date,
        setDate,
        description,
        setDescription,
        searchedMovieTitle,
        setSearchedMovieTitle,
        fetchedMovies,
        setFetchedMovie,
        pickedMovies,
        setPickedMovies,
      }}
    >
      {children}
    </AddMovieNightContext.Provider>
  );
}

function useAddMovieNight() {
  const context = useContext(AddMovieNightContext);

  if (context === undefined)
    throw new Error(
      "AddMovieNightContext was used outside the AddMovieNightProvider"
    );
  return context;
}

export { AddMovieNightProvider, useAddMovieNight };
