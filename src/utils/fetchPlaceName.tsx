const fetchPlaceName = async (name: string) => {
  try {
    const res = await fetch(
      `http://api.geonames.org/searchJSON?name=${name.toLowerCase()}&name_startsWith=${name.toLowerCase()}&orderby=population&maxRows=6&style=short&username=zigaz`
    );

    if (!res.ok) throw new Error("Something went wrong while fetching");
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchPlaceName;
