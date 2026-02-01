export function segregate_movieNight_data(
  username,
  title,
  description,
  location,
  date,
  candidates
) {
  // This function cumulating the data which are used to create new record in the database

  const structuredMovieNightData = {
    isActive: true,
    creator: username,
    categoryName: title,
    description: description,
    location: location,
    date: date,
    candidates: candidates,
  };

  return structuredMovieNightData;
}
