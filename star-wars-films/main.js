import { films } from '../data/films.js';

//console.log(people[0]);
//console.log(films[0]);

/* films.forEach(film => {
    let newParagraph = document.body.appendChild(document.createElement('p'));
    newParagraph.textContent = film.title;
}) */

//https://starwars-visualguide.com/assets/img/characters/1.jpg

const main = document.querySelector('main');

for (let step = 0; step < 7; step++) {
    //runs 7 times, with values of step 0 through 6
    let figure = document.createElement('figure');
    let figImg = document.createElement('img'); //new image instance
    figImg.src = `https://starwars-visualguide.com/assets/img/films/${step +1}.jpg`; // set the source
    let figCaption = document.createElement('figcaption')
    
    const foundFilm = films.find(film => getLastNumber(film.url) === (step + 1).toString());
    figCaption.textContent = foundFilm.title;

    figure.appendChild(figImg);// append image to DOM
    figure.appendChild(figCaption);

    main.appendChild(figure);
}

function getLastNumber(url) {
    let end = url.lastIndexOf('/');
    let start = end -2;
    if (url.charAt(start) === '/') {
        start++;
    }
    return url.slice(start, end);
}

/* for (const film of films){
    let newImg = document.createElement('img'); //new image instance
    newImg.src = 'https://starwars-visualguide.com/assets/img/films/1.jpg'; // set the source
    main.appendChild(newImg);// append image to DOM

    console.log(film.title);
} */

