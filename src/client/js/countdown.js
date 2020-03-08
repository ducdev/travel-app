function countdown(date) {
  let endTime =
    new Date(date).getTime() / 1000 - parseInt(new Date().getTime() / 1000)
  let timeDay = parseInt(endTime / 60 / 60 / 24)
  return timeDay
}

export { countdown }