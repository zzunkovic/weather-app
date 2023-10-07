/*
  Fetches the data from the API based on latitude and longitude values

*/

const fetchPlaceDetails = async (lat: string, lng: string) => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&current_weather=true&timezone=auto`
    );

    if (!res.ok) throw new Error("Something went wrong while fetching");
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchPlaceDetails;
