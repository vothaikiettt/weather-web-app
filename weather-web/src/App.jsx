import { useEffect, useState } from "react";

function App() {
  const [weather, SetWeather] = useState(null);
  const [Location, setLocation] = useState("Hanoi");
  const API_KEY = import.meta.env.VITE_API_KEY;
  const getWeather = async (Location) => {
    const res = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${Location}?unitGroup=metric&key=${API_KEY}&contentType=json`,
    );
    const data = await res.json();
    console.log(data);
    SetWeather(data);
  };
  useEffect(() => {
    getWeather(Location);
  }, []);

  const HamTimKiemViTri = () => {
    getWeather(Location);
  };

  if (!weather) return <h2>Loading...</h2>;

  return (
    <>
      <div className="container-wrap">
        <h1>Weather app</h1>
        <div className="NhapViTriHienTai">
          <input
            type="text"
            value={Location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            placeholder="Enter Your Location..."
          />
          <button onClick={HamTimKiemViTri}>Search</button>
          <button onClick={() => getWeather(Location)}>Refresh</button>
        </div>
        <div className="ThoiTietHienTai">
          <h2>{weather.address}</h2>
          <p>🌡 Temp: {weather.currentConditions.temp}°C</p>
          <p>💨 Wind: {weather.currentConditions.windspeed} km/h</p>
          <p>🌧 Rain: {weather.currentConditions.precipprob}%</p>
          <p>☁ Condition: {weather.currentConditions.conditions}</p>
        </div>
      </div>
    </>
  );
}

export default App;
