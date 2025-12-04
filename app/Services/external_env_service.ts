// app/services/external_env_service.ts
import axios from 'axios'

type AddressResult = {
  display_name: string
  address: Record<string, any>
}

type WeatherResult = {
  temp: number
  feels_like: number
  humidity: number
  wind_speed: number
  weather_main: string
  weather_desc: string
  icon: string
}

// ============ Nominatim (OpenStreetMap) ============
// - Jangan bulk request
// - Konfigurasi diambil dari .env
async function getAddressFromNominatim(lat: number, lon: number): Promise<AddressResult> {
  const baseUrl = process.env.NOMINATIM_BASE_URL || 'https://nominatim.openstreetmap.org'
  const userAgent = process.env.NOMINATIM_USER_AGENT || 'GeoWaste-TubesAPI/1.0'
  const email = process.env.NOMINATIM_EMAIL || 'contact@example.com'

  try {
    const res = await axios.get(`${baseUrl}/reverse`, {
      params: {
        format: 'jsonv2',
        lat,
        lon,
        addressdetails: 1,
        zoom: 18,
      },
      headers: {
        'User-Agent': `${userAgent} (${email})`,
        'Accept-Language': 'id',
      },
      timeout: 10000,
    })

    return {
      display_name: res.data.display_name || `${lat}, ${lon}`,
      address: res.data.address ?? {},
    }
  } catch (error: any) {
    console.error('Nominatim error:', error.message)
    // Fallback ke OpenWeatherMap jika Nominatim gagal
    return getAddressFromOpenWeather(lat, lon)
  }
}

// ============ OpenWeatherMap Geocoding (Backup) ============
async function getAddressFromOpenWeather(lat: number, lon: number): Promise<AddressResult> {
  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey) {
    return { display_name: `${lat}, ${lon}`, address: {} }
  }

  try {
    const res = await axios.get('https://api.openweathermap.org/geo/1.0/reverse', {
      params: {
        lat,
        lon,
        limit: 1,
        appid: apiKey,
      },
      timeout: 10000,
    })

    if (res.data && res.data.length > 0) {
      const loc = res.data[0]
      return {
        display_name: [loc.name, loc.state, loc.country].filter(Boolean).join(', '),
        address: {
          city: loc.name,
          state: loc.state,
          country: loc.country,
        },
      }
    }
    return { display_name: `${lat}, ${lon}`, address: {} }
  } catch (error) {
    console.error('OpenWeather Geocoding error:', error)
    return { display_name: `${lat}, ${lon}`, address: {} }
  }
}

// Fungsi utama - coba Nominatim dulu, fallback ke OpenWeather
export async function getAddressFromCoords(lat: number, lon: number): Promise<AddressResult> {
  // Coba Nominatim dulu (lebih detail)
  return getAddressFromNominatim(lat, lon)
}

export async function getWeatherFromCoords(lat: number, lon: number): Promise<WeatherResult> {
  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey) {
    throw new Error('OPENWEATHER_API_KEY not set')
  }

  const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,
      lon,
      appid: apiKey,
      units: 'metric',
      lang: 'id',
    },
  })

  const data = res.data

  return {
    temp: data.main?.temp,
    feels_like: data.main?.feels_like,
    humidity: data.main?.humidity,
    wind_speed: data.wind?.speed,
    weather_main: data.weather?.[0]?.main,
    weather_desc: data.weather?.[0]?.description,
    icon: data.weather?.[0]?.icon,
  }
}

export async function getEnvSummary(lat: number, lon: number) {
  const [address, weather] = await Promise.all([
    getAddressFromCoords(lat, lon),
    getWeatherFromCoords(lat, lon),
  ])

  return {
    lat,
    lon,
    address: {
      display_name: address.display_name,
      ...address.address,
    },
    weather: {
      temp: weather.temp,
      feels_like: weather.feels_like,
      description: weather.weather_desc,
      humidity: weather.humidity,
      wind_speed: weather.wind_speed,
      icon: weather.icon,
    },
  }
}
