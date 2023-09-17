// /**
//  * Checks if a user is currently logged in.
//  *
//  * @function
//  * @returns {boolean} - True if a session token exists, otherwise false.
//  */
export const isUserLoggedIn = () => {
  const token = localStorage.getItem("session_token")
  console.log("Token is " + token)
  return token ? true : false
}

// /**
//  * Retrieves the current session token.
//  *
//  * @function
//  * @returns {string} - A session token as a string.
//  */
export const getToken = () => {
  const token = localStorage.getItem("session_token")
  return token
}

// /**
//  * Sets the session token in local storage.
//  *
//  * @function
//  * @param {string} token - The session token to set.
//  * @returns {string} - The session token that was set.
//  * @throws {Error} - Throws an error if the token argument is not a string.
//  */
export const setToken = (token) => {
  if (typeof token !== "string") {
    throw new Error("token must be type: 'string'")
  }
  localStorage.setItem("session_token", token)
  return token
}

// /**
//  * Removes the current session token from local storage.
//  *
//  * @function
//  * @returns {boolean} - Always returns true.
//  */
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
  const dataString = fileContent.split("\n")

  //Get the latest reading from the buoy
  let dataSplit = dataString[2].split(/\s+/)
  console.log("first data split", dataSplit)
  //If the latest reading does not have wave height or wave period, loop through the data string until we find one that does

  if (dataSplit[8] === "MM" || dataSplit[9] === "MM") {
    for (let i = 3; i < dataString.length; i++) {
      //Set the array to the next buoy reading
      dataSplit = dataString[i].split(/\s+/)
      console.log("new data split", dataSplit)
      //If that buoy reading has wave height and wave period, exit the loop
      if (dataSplit[8] !== "MM" && dataSplit[9] !== "MM") {
        break
      }
    }
  }
  dataSplit[8] = metersToFeet(parseFloat(dataSplit[8]))

  return dataSplit
}
