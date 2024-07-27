export let cardContent = movie => {
    return `
        <img class="mb-4 md:max-h-[55%]" src="https://moviestack.onrender.com/static/${movie.image}" alt="${movie.title}" style="box-shadow: 1px 1px 3px white;" >
        <div class="relative">
            <button data-fav=${movie.id}">
            <img src="../assets/heart.png" class="absolute -top-4 right-0 w-10 h-10" data-fav="${movie.id}"/>
            </button>
            <h3><span class="font-bold">Title:</span> ${movie.title}</h3>
            <h5 class="italic">${movie.tagline}</h5>
            <hr class="my-4">
            <p class="md:line-clamp-5 mb-8 xl:line-clamp-3"><span class="font-bold">Review: </span>${movie.overview}</p>
            <a href="./details.html?id=${movie.id}" id="button" target="_blank" class="rounded-2xl border border-white border-solid px-2 absolute -bottom-2 -right-2 bg-[#FFFFFF] hover:bg-black hover:text-white text-[#6D38E0] font-bold">See more</a>
        </div>
    `
}

export let favCardContent = movie => {
    return `
        <img class="mb-4 md:max-h-[55%]" src="https://moviestack.onrender.com/static/${movie.image}" alt="${movie.title}" style="box-shadow: 1px 1px 3px white;" >
        <div class="relative">
            <button data-fav=${movie.id}">
            <img src="../assets/filled-heart.png" class="heart absolute -top-4 right-0 w-10 h-10" data-fav="${movie.id}"/>
            </button>
            <h3><span class="font-bold">Title:</span> ${movie.title}</h3>
            <h5 class="italic">${movie.tagline}</h5>
            <hr class="my-4">
            <p class="md:line-clamp-5 mb-8 xl:line-clamp-3"><span class="font-bold">Review: </span>${movie.overview}</p>
            <a href="./details.html?id=${movie.id}" id="button" target="_blank" class="rounded-2xl border border-white border-solid px-2 absolute -bottom-2 -right-2 bg-[#FFFFFF] hover:bg-black hover:text-white text-[#6D38E0] font-bold">See more</a>
        </div>
    `
}

export let createFavCards = movies => movies.forEach(movie => {
    let fragment = new DocumentFragment();
    let divCard = document.createElement("div");
    const cardContainer = document.querySelector(".card-container");
    divCard.className = `card flex flex-col gap-3 border-solid border rounded-2xl shadow-[2px_2px_6px_#000000] shadow-[2px_2px_6px_#000000] hover:shadow-[0px_2px_10px_5px_#6D38E0] hover:border-none p-4 w-[90vw] justify-center bg-[#6D38E0] text-[#FFFFFF] md:w-[45vw] md:justify-between lg:w-[31vw] xl:w-[22vw]`;
    divCard.id = `${movie.id}`
    divCard.innerHTML = favCardContent(movie);
    fragment.appendChild(divCard); // se usa el fragment y queda vacío.
    cardContainer.appendChild(fragment);
    return divCard;
});

export let createCards = movies => movies.forEach(movie => {
    let fragment = new DocumentFragment();
    let divCard = document.createElement("div");
    const cardContainer = document.querySelector(".card-container");
    divCard.className = "card flex flex-col gap-3 border-solid border rounded-2xl shadow-[2px_2px_6px_#000000] shadow-[2px_2px_6px_#000000] hover:shadow-[0px_2px_10px_5px_#6D38E0] hover:border-none p-4 w-[90vw] justify-center bg-[#6D38E0] text-[#FFFFFF] md:w-[45vw] md:justify-between lg:w-[31vw] xl:w-[22vw]";
    // divCard.style = "box-shadow: 2px 2px 6px black;"
    divCard.innerHTML = cardContent(movie);
    fragment.appendChild(divCard); // se usa el fragment y queda vacío.
    cardContainer.appendChild(fragment);
    return divCard;
});

export let genresFiltering = movies => Array.from(new Set(movies.map(movie => movie.genres).flat()));

export let createSelectElement = genres => {
    let mainSection = document.getElementById("main-section");
    let selectElement = document.getElementById("select-genres");    
    let filtersSection = document.getElementById("filters");
    genres.forEach(genre => {
        let option = document.createElement("option");
        option.value = genre;
        option.innerText = genre;
        selectElement.appendChild(option);
    })
    
    return selectElement;
}

export let replaceMainContent = (nodo, container) => {
    container = document.querySelector(".card-container");
    if (container.hasChildNodes) {
        container.replaceChildren(nodo); // y si encuentra hijos en el main, le digo que lo reemplace por el nuevo container.
    }
}

export let createFilteredCards = (movies, container) => {
    let filteredCardsContainer = document.createElement("div"); // creo un contenedor para las nuevas cards filtradas.
    filteredCardsContainer.className = "card-container flex flex-wrap gap-4 justify-center"; // le creo también las mismas clases del contenedor en el html para que se ajuste igual.
    movies.forEach(movie => {
        let divFilteredCard = document.createElement("div");
        divFilteredCard.className = "card flex flex-col gap-3 border-solid border rounded-2xl shadow-[2px_2px_6px_#000000] shadow-[2px_2px_6px_#000000] hover:shadow-[0px_2px_10px_5px_#6D38E0] hover:border-none p-4 w-[90vw] justify-center bg-[#6D38E0] text-[#FFFFFF] md:w-[45vw] md:justify-between lg:w-[31vw] xl:w-[22vw]";
        // divFilteredCard.style = "box-shadow: 2px 2px 6px black;";
        divFilteredCard.innerHTML = cardContent(movie);
        filteredCardsContainer.appendChild(divFilteredCard); // inserto las cards dentro del contenedor recién creado
    })

    replaceMainContent(filteredCardsContainer, container);
    return filteredCardsContainer;
}

/* export let createFilteredCards = (movies, container) => {
    let filteredCardsContainer = document.createElement("div"); // creo un contenedor para las nuevas cards filtradas.
    filteredCardsContainer.className = "card-container flex flex-wrap gap-4 justify-center"; // le creo también las mismas clases del contenedor en el html para que se ajuste igual.
    movies.forEach(element => {
        let divFilteredCard = document.createElement("div");
        divFilteredCard.className = "card flex flex-col gap-3 border-solid border rounded-2xl shadow-[2px_2px_6px_#000000] shadow-[2px_2px_6px_#000000] hover:shadow-[0px_2px_10px_5px_#6D38E0] hover:border-none p-4 w-[90vw] justify-center bg-[#6D38E0] text-[#FFFFFF] md:w-[45vw] md:justify-between lg:w-[31vw] xl:w-[22vw]";
        // divFilteredCard.style = "box-shadow: 2px 2px 6px black;";
        divFilteredCard.innerHTML = cardContent(element);
        filteredCardsContainer.appendChild(divFilteredCard); // inserto las cards dentro del contenedor recién creado
    })
    replaceMainContent(filteredCardsContainer, container);
} */


export let filterMoviesByGenre = (movies, input) => movies.filter(movie => movie.genres.includes(input));

export let filterMoviesByTitles = (movies, option) => movies.filter(element => element.title.toLowerCase().trim().includes(option));

export function crossedFilter(movies, inputText, inputSelect, container) {
    let moviesByText = filterMoviesByTitles(movies, inputText);
    let crossedFilter = filterMoviesByGenre(moviesByText, inputSelect);


    if (crossedFilter.length === 0) {
        if (inputSelect == "all-movies") {
            createFilteredCards(movies, container);
        } else {
            let h4 = document.createElement("h4");
            let sadFaceCode = "&#x1F61E;";
            h4.className = "text-2xl text-bold";
            h4.innerHTML = `${sadFaceCode} We're sorry! we don't have this title, please try another entry`;
            // cardContainer.appendChild(h4);
            replaceMainContent(h4, container);
            return h4;
        }
    }
    return crossedFilter;
}

export function retrieveHeart (movies, idMovies) {
    movies.forEach(movie => {
        if (idMovies.includes(movie.id)) {
            // Obtener el corazón correspondiente a esta película
            const heart = document.querySelector(`[data-fav="${movie.id}"]`);
            if (heart) {
                // Cambiar la imagen del corazón a lleno
                heart.src = "../assets/filled-heart.png";
            }
        }
    });
}
