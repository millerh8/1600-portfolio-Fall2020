//reusable async function to fetch data from provided url
async function getAPIData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

//using the async getAPIData function in a function to load pokemon on page
function loadPage(url) {
    getAPIData(url).then
    (async (data) => {
        for (const pokemon of data.results) {
            await getAPIData(pokemon.url).then((pokeData) => {
                populatePokeCard(pokeData);
            })
        }
    })
}

const pokemonGrid = document.querySelector('.pokemonGrid');

function populatePokeCard(pokemon) {
    let pokeScene = document.createElement('div');
    pokeScene.className = 'scene';
    let pokeCard = document.createElement('div');
    pokeCard.className = 'card';
    pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped');
    })
    
    pokeCard.appendChild(populateCardFront(pokemon));
    pokeCard.appendChild(populateCardBack(pokemon));
    pokeScene.appendChild(pokeCard);
    pokemonGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
    let cardFront = document.createElement('div');
    cardFront.className = 'card-face card-face-front';
    let frontLabel = document.createElement('p');
    let frontImage = document.createElement('img');
    frontLabel.textContent = pokemon.name;
    frontImage.src = `../images/pokemon/${getImageFileName(pokemon)}.png`;
    cardFront.appendChild(frontLabel);
    cardFront.appendChild(frontImage);
    return cardFront;
}

function populateCardBack(pokemon) {
    let cardBack = document.createElement('div');
    cardBack.className = 'card-face card-face-back';
    let backLabel = document.createElement('p');
    backLabel.textContent = `I'm the back of the card`;
    cardBack.appendChild(backLabel);
    return cardBack;
}

function getImageFileName(pokemon) {
    if (pokemon.id < 10) {
        return `00${pokemon.id}`;
    } else if (pokemon.id > 9 && pokemon.id < 99) {
        return `0${pokemon.id}`;
    }
}
//https://pokeapi.co/api/v2/pokemon
loadPage(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=1`);
//loadPage(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=25`);