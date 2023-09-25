exports.getCurrentDate = () => {
  const currentDate = new Date()

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',   
  }
  
  return currentDate.toLocaleDateString('sv-SE', options).replaceAll('/', '-').replaceAll('_', '-').replaceAll(' ', '-')
}