function checkForDate(inputText) {
  let reg = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
  if (!reg.test(inputText)) {
    alert('Correct format: MM/DD/YYYY')
    return false
  } else {
    return true
  }
}

export { checkForDate }