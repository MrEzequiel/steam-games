let keyAPI = '78537744d4a643539e50a3dbcccd5384'
let games = null

const setGames = games => {
  games.forEach(game => {
    let gameName = game.name
    let gameImage = game.background_image
    let gameRating = game.metacritic

    updateGames(gameName, gameImage, gameRating)
  })
}

const updateGames = (name, image, rating) => {
  let element = crateGameHTML(name, rating)

  document.querySelector('#cards').appendChild(element)
  document.querySelector(
    `.image-card[title="${name}"]`
  ).style.background = `url('${image}') no-repeat center/cover`

  VanillaTilt.init(document.querySelectorAll('.card'), {
    reverse: false,
    max: 15,
    perspective: 1000,
    speed: 200,
    axis: 'y',
    gyroscope: false
  })
}

const crateGameHTML = (name, rating) => {
  let element = document.createElement('div')
  element.classList.add('card', 'flex')

  element.innerHTML = `
  <div class="image-card" title="${name}"></div>
  <div class="rating-card flex">${rating}</div>
  `
  return element
}

// FAZENDO A REQUISIÇÃO A API RAWG
fetch(`https://api.rawg.io/api/games?key=${keyAPI}`).then(async response => {
  games = await response.json()
  setGames(games.results)
})
