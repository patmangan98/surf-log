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
  // 1 meter is approximately equal to 3.28084 feet
  const feet = (meters * 3.28084).toFixed(2)

  return feet
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
  console.log(fileContent)
  console.log(typeof fileContent)
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
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',   
  }
  
  return currentDate.toLocaleDateString('en-US', options).replaceAll('/', '-').replaceAll('_', '-').replaceAll(' ', '-')
}

export const getCurrentDateV2 = () => {
  const currentDate = new Date()

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',   
  }
  
  return currentDate.toLocaleDateString('sv-SE', options).replaceAll('/', '-').replaceAll('_', '-').replaceAll(' ', '-')
}
