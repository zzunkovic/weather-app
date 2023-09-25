const fetchPlaceDetails = async (lat: number, lng: number) => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m`
    );

    if (!res.ok) throw new Error("Something went wrong while fetching");
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchPlaceDetails;
