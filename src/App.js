import { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import InfoBox from "./COMPONENTS/InfoBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
  };
  return (
    <div className="app">
      <div className="app__stats">
        <InfoBox title="Active Cases" cases={"199"} total={"3426"} />
        <InfoBox title="Recovered" cases={"909"} total={"4536"} />
        <InfoBox title="Deaths" cases={"099"} total={"26"} />
      </div>

      <div className="app__header">
        <h1>COVID 19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/**Table*/}
      {/**Graph */}

      {/**Map */}
    </div>
  );
}

export default App;
