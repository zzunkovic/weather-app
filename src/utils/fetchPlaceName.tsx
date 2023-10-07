/*
  Fetches places by name in order to later display it as a suggestion

*/

const fetchPlaceName = async (name: string) => {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&timezone=auto&format=json`
    );

    if (!res.ok) throw new Error("Something went wrong while fetching");
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchPlaceName;
