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