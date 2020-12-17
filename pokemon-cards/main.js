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
    let frontImage = document.createElement('img');
    let frontLabel = document.createElement('h2');
    frontImage.src = `../images/pokemon/${getImageFileName(pokemon)}.png`;
    frontLabel.textContent = pokemon.name;
    cardFront.appendChild(frontImage);
    cardFront.appendChild(frontLabel);
    return cardFront;
}

function populateCardBack(pokemon) {
    let cardBack = document.createElement('div');
    cardBack.className = 'card-face card-face-back';
    let backLabel = document.createElement('h2');
    backLabel.textContent = `Abilities:`;
    let abilityList = document.createElement('ul');
    pokemon.abilities.forEach(ability => {
        let abilityName = document.createElement('li');
        abilityName.textContent = ability.ability.name;
        abilityList.appendChild(abilityName);
    });
    //let moveLabel = document.createElement('h2');
    //moveLabel.textContent = `Most Accurate Move:`;
    //let moveAccuracy = document.createElement('h4');
    //const mostAccurateMove = getBestAccuracy(pokemon.moves);
    //moveAccuracy.textContent = `${mostAccurateMove.move.name}`;
    cardBack.appendChild(backLabel);
    cardBack.appendChild(abilityList);
    //cardBack.appendChild(moveLabel);
    //cardBack.appendChild(moveAccuracy);
    return cardBack;
}

/* function getBestAccuracyAndPower(pokemoves) {
    return pokemoves.reduce((mostAccurate, move) => {

        getAPIData(move.move.url).then
        {async (data) => {

        }}
        return mostAccurate.accuracy > move.accuracy ? mostAccurate : move; 
    }, {} )
} */

function getImageFileName(pokemon) {
    if (pokemon.id < 10) {
        return `00${pokemon.id}`;
    } else if (pokemon.id > 9 && pokemon.id < 99) {
        return `0${pokemon.id}`;
    }
}
//https://pokeapi.co/api/v2/pokemon
loadPage(`https://pokeapi.co/api/v2/pokemon?limit=25&off`);
//loadPage(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=25`);