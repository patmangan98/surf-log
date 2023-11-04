  //API Key EXQ4HJA5WC2HZL3LRU6EANZKK damaristorrent@gmail.com
  //API Key 4PSEWATKQCJJCLS5LN8XJQQX9 damaristorrent21@gmail.com

export const isUserLoggedIn = () => {
  const token = localStorage.getItem("session_token")
  return token ? true : false
}

export const getToken = () => {
  const token = localStorage.getItem("session_token")
  return token
}

export const setToken = (token) => {
  if (typeof token !== "string") {
    throw new Error("token must be type: 'string'")
  }
  localStorage.setItem("session_token", token)
  return token
}

export const clearToken = () => {
  localStorage.removeItem("session_token")
  return true
}

export const metersToFeet = (meters) => {
  const feet = (meters * 3.28084).toFixed(2)

  return feet
}

export function celsiusToFahrenheit(celsius) {
  const fahrenheit = (celsius * 9) / 5 + 32
  return fahrenheit
}

export const getMonthString = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber]
  } else {
    return "Invalid month number"
  }
}

export const getLatestBuoyReading = (fileContent) => {
  const dataString = fileContent.split("\n")

  //Get the latest reading from the buoy
  let dataSplit = dataString[2].split(/\s+/)
  //If the latest reading does not have wave height or wave period, loop through the data string until we find one that does
  if (dataSplit[8] === "MM" || dataSplit[9] === "MM") {
    for (let i = 3; i < dataString.length; i++) {
      //Set the array to the next buoy reading
      dataSplit = dataString[i].split(/\s+/)
      //If that buoy reading has wave height and wave period, exit the loop
      if (dataSplit[8] !== "MM" && dataSplit[9] !== "MM") {
        break
      }
    }
  }
  dataSplit[8] = metersToFeet(parseFloat(dataSplit[8]))

  return dataSplit
}

export const getBuoyNumber = (urlString) => {
  const regex = /\/(\d+)\.txt$/
  const match = urlString.match(regex)

  if (match) {
    return match[1]
  }
}

export const getCurrentDate = () => {
  const currentDate = new Date()

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }

  return currentDate
    .toLocaleDateString("en-US", options)
    .replaceAll("/", "-")
    .replaceAll("_", "-")
    .replaceAll(" ", "-")
}

export const getCurrentDateV2 = () => {
  const currentDate = new Date()

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }

  return currentDate
    .toLocaleDateString("sv-SE", options)
    .replaceAll("/", "-")
    .replaceAll("_", "-")
    .replaceAll(" ", "-")
}

export const getCompassDirection = (degrees) => {
  degrees = (degrees + 360) % 360

  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ]

  const directionIndex = Math.round(degrees / 22.5)

  return directions[directionIndex % 16]
}

export const weatherSearchUrl = (dateString) => {
  

  const stringOne =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/charleston%2C%20south%20carolina/"
  const stringTwo =
    "?unitGroup=metric&include=hours&key=4PSEWATKQCJJCLS5LN8XJQQX9&contentType=json"
  return stringOne + dateString + "/" + dateString + stringTwo
}

export const getWeatherData = async (selectedDate) => {
  const searchString = weatherSearchUrl(selectedDate);

  try {
    const response = await fetch(searchString)
    if (!response.ok) {
      console.error("Error fetching data:", response.statusText)
      return null
    }

    const data = await response.json()
    const weatherData = {
        currentTemp: celsiusToFahrenheit(parseFloat(data.days[0].temp), 2).toFixed(2),
        relativeHumidity: data.days[0].humidity,
        windSpeed: data.days[0].windspeed,
        windDirectionDegrees: data.days[0].winddir,
        windDirection: getCompassDirection(data.days[0].winddir),
        maxTemp: celsiusToFahrenheit(parseFloat(data.days[0].tempmax), 2).toFixed(2),
        minTemp: celsiusToFahrenheit(parseFloat(data.days[0].tempmin), 2).toFixed(2),
        sunriseTime: data.days[0].sunrise,
        sunsetTime: data.days[0].sunset,
        uvIndex: data.days[0].uvindex,
      }
    return weatherData
  } catch (error) {
    console.error("Error fetching data:", error)
    return null
  }
}
