import { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./COMPONENTS/InfoBox";
import Map from "./COMPONENTS/Map";
import Table from "./COMPONENTS/Table";
import { sortData } from "./util";
import LineGraph from "./COMPONENTS/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  let [mapCenter, setMapCenter] = useState({
    lat: 8.7832,
    lng: 34.5085,
  });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all").then((response) =>
      response.json().then((data) => {
        setCountryInfo(data);
      })
    );
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        console.log(countryInfo);

        {
          /**The  mapZoom is also not working*/
        }
        setMapZoom(4);

        const long = data.countryInfo.long;
        const lat = data.countryInfo.lat;

        console.log(long);
        console.log(lat);
        {
          /**I WANT THE MapCenter to change to these values (the ones logged to the console) when the onCountryChange function is called (i.e when you change the country from the dropdown)*/
        }

        {
          /**METHOD 1 - DID NOT WORK
           *
           * setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
           */
        }

        {
          /**METHOD 2 - DID NOT WORK 
           * 
           *  setMapCenter({
            long,
            lat,
          });
          */
        }

        {
          /**METHOD 3 - DID NOT WORK 
           * 
           * if (typeof data.countryInfo !== "undefined") {
            const {
              countryInfo: { lat, long },
            } = data;
            setMapCenter({ lat, lng: long });

            setMapZoom(4);
          } else {
            setMapCenter({ lat: 8.7832, lng: 34.5085 });
            setMapZoom(3);
          }

          I CANNOT COME AND KILL MYSELF
          */
        }
      });
  };
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Map center={mapCenter} zoom={mapZoom} />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3> Live Cases by Country</h3>
          <Table countries={tableData} />
          <LineGraph />
          <h3>Wordwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
