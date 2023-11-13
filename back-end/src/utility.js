exports.getCurrentDate = () => {
  const currentDate = new Date()

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',   
  }
  
  return currentDate.toLocaleDateString('sv-SE', options).replaceAll('/', '-').replaceAll('_', '-').replaceAll(' ', '-')
}

exports.metersToFeet = (meters) => {
  // 1 meter is approximately equal to 3.28084 feet
  const feet = (meters * 3.28084).toFixed(2)

  return feet
}

exports.isGreaterThan45Days = (date1, date2) => {

  const tempDate1 = new Date(date1)
  const tempDate2 = new Date(date2)

  // Calculate the time difference in milliseconds
  const timeDifference = tempDate2 - tempDate1;

  // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  if (daysDifference > 45) {
    return true
  }
  else {
    return false
  }
}

exports.getYearFromDate = (date) => {

  const tempDate = new Date(date);

  const year = tempDate.getUTCFullYear()

  return year;
}

exports.getMonthFromDate = (date) =>{
  // Create a Date object from the date string

  const tempDate = new Date(date).getUTCDate()

  //Get the month (0-11) from the date
  const tempMonth = new Date(date).getUTCMonth()

  //Create an array of month names
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const month = {
    monthName:  monthNames[tempMonth],
    monthNumber: tempMonth +1,
    date: tempDate
  }
  return month;
}

exports.isCurrentYear = (year) => {
 
  const currentYear = new Date().getFullYear()
  
  return year === currentYear;

}

