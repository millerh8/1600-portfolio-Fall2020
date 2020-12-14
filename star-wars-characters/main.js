import { people } from '../data/people.js'

/* const main = document.querySelector('main');

for (let step = 0; step < 7; step++) {
    //runs 7 times, with values of step 0 through 6
    let figure = document.createElement('figure');
    let figImg = document.createElement('img'); //new image instance
    figImg.src = `https://starwars-visualguide.com/assets/img/characters/${step +1}.jpg`; // set the source
    let figCaption = document.createElement('figcaption')
    figCaption.textContent = people[step].title;

    figure.appendChild(figImg);// append image to DOM
    figure.appendChild(figCaption);

    main.appendChild(figure);
} */

//define main section for use
const mainContent = document.querySelector('#main')

//create header
const mainHeader = document.createElement('header');
mainHeader.className = 'mainHeader';
document.body.insertBefore(mainHeader, mainContent);


//create button for male characters
const maleButton = document.createElement('button');
maleButton.textContent = 'Male Characters';
mainHeader.appendChild(maleButton);

//create button for female characters
const femaleButton = document.createElement('button');
femaleButton.textContent = 'Female Characters';
mainHeader.appendChild(femaleButton);

//create button for other characters
const otherButton = document.createElement('button');
otherButton.textContent = 'Other Characters';
mainHeader.appendChild(otherButton);

//sort characters into new array by gender
const maleCharacters = people.filter(person => person.gender === 'male');
const femaleCharacters = people.filter(person => person.gender === 'female');
const otherCharacters = people.filter(person => person.gender === 'n/a');

//give buttons events for respective gender
maleButton.addEventListener('click', () => populateDOM(maleCharacters));
femaleButton.addEventListener('click', () => populateDOM(femaleCharacters));
otherButton.addEventListener('click', () =>  populateDOM(otherCharacters));

//create function to sort through character image and title and post in the DOM
function populateDOM (characters) {
    removeChildren(mainContent)
    characters.forEach((element) => {
    
    const charFigure = document.createElement('figure');
    const charImg = document.createElement('img');
    let charNum = getLastNumber(element.url);
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;
    charImg.addEventListener('error', () => charImg.hidden = true);
    const charCaption = document.createElement('figcaption');
    charCaption.textContent = element.name;

    charFigure.appendChild(charImg);
    charFigure.appendChild(charCaption);

    mainContent.appendChild(charFigure);
    })
}

//function for locating the number for each character image
function getLastNumber(url) {
    let end = url.lastIndexOf('/');
    let start = end -2;
    if (url.charAt(start) === '/') {
        start++;
    }
    return url.slice(start, end);
}

//function to remove children when appending new ones
function removeChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}