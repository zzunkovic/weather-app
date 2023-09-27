const fetchPlaceName = async (name: string) => {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`
    );

    if (!res.ok) throw new Error("Something went wrong while fetching");
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchPlaceName;
