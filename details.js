let url = new URLSearchParams(location.search);
let id = url.get("id");
// console.log(id); // un quilombo de número

let selectedCard = (array, key) => array.filter(object => object.id == key);

let selectedMovieObject = selectedCard(movies, id)[0];

console.log(selectedMovieObject); // obtengo un array con el objeto de interes

let asideContent = (movieObject) => `
    <img class="shadow-[1px_1px_3px_#FFFFFF] w-full rounded-2xl md:w-full" src="${movieObject.image}" alt="Cover of movie ${movieObject.title}">
    <h4 class="shadow-[2px_2px_4px_#FFFFFF] text-center font-extrabold text-lg text-[#6D38E0] bg-[#d2ccff] rounded-md w-[65%] py-2 mt-4">Movie Details</h4>
    <div class="w-full m-4 bg-[#d2ccff] text-[#6D38E0] border-[2px] border-solid border-[#FFFFFF]">
        <table class="w-full p-2">        
            <tbody>
                <tr>
                    <th class="p-1.5 text-end border-[2px] border-solid border-[#6D38E0]">Original Language</th>
                    <td class="p-1.5 text-left border-[2px] border-solid border-[#6D38E0] w-[50%]">${movieObject.original_language}</td>
                </tr>
                <tr>
                    <th class="p-1.5 text-end border-[2px] border-solid border-[#6D38E0]">Release Date</th>
                    <td class="p-1.5 text-left border-[2px] border-solid border-[#6D38E0] w-[50%]">${movieObject.release_date}</td>
                </tr>
                <tr>
                    <th class="p-1.5 text-end border-[2px] border-solid border-[#6D38E0]">Runtime</th>
                    <td class="p-1.5 text-left border-[2px] border-solid border-[#6D38E0] w-[50%]">${movieObject.runtime}</td>
                </tr>
                <tr>
                    <th class="p-1.5 text-end border-[2px] border-solid border-[#6D38E0]">Status</th>
                    <td class="p-1.5 text-left border-[2px] border-solid border-[#6D38E0] w-[50%]">${movieObject.status}</td>
                </tr>
            </tbody>
        </table>
    </div>
`

let createAside = object => {
    let aside = document.createElement("aside");
    aside.className = "flex flex-col items-center gap-3 border-solid border rounded-2xl my-4 p-2 w-[90vw] justify-around bg-[#6D38E0] text-[#FFFFFF] shadow-2xl md:flex md:w-4/5 md:gap-0 md:justify-around lg:w-[38vw] lg:mx-2";
    // console.log(aside);
    aside.style = "box-shadow: 2px 2px 6px black;"
    aside.innerHTML = asideContent(object);
    return aside;
}

let aside = createAside(selectedMovieObject);
console.log(aside); // hasta aquí funciona perfectamente, y es el nodo del aside
// console.log(typeof aside); // Object.

let insertAsideContent = nodo => {
    let main = document.getElementById("main-container");
    main.classList.add("flex", "flex-wrap", "justify-center");
    // console.log(typeof main); // object
    main.appendChild(nodo);
    return main;
}

let main = insertAsideContent(aside)
console.log(main); // funciona ok.

// create Ul y li elements para los genres:
let genres = selectedMovieObject.genres;
console.log(genres) // array con los generos

let extractGenres = array => array.map(genre => {
    let createLi = document.createElement("li");
    createLi.innerText = genre;
    console.log(createLi);
    return createLi;
});

// captar createLi;
let liElement = extractGenres(genres);
console.log(liElement); // arreglo con nodos li
// console.log(typeof liElement[1]); // object
console.log(liElement[0]);

let createUl = array => {
    let ulElement = document.createElement("ul");
    ulElement.className = "flex flex-wrap mx-2 gap-2 mt-1"

    array.forEach(nodo => {
        ulElement.appendChild(nodo);
        // aside.appendChild(ulElement);
    });

    return ulElement;
}

let ulElement = createUl(liElement).outerHTML; // Obtener la representación HTML del objeto div como una cadena de texto
console.log(ulElement); // nodo

let sectionContent = (movieObject, nodo) => `
    <h2 class="font-bold text-5xl">${movieObject.title}</h2>
    <h4 class="italic">${movieObject.tagline}</h4>
    <hr class="my-4 w-full">
    <div class="flex flex-wrap w-full justify-start">
        <h4 class="font-bold text-lg">Genres:</h4>
        ${nodo}
    </div>
    <p>${movieObject.overview}</p>
    <h4 class="shadow-[2px_2px_4px_#FFFFFF] text-center self-center font-extrabold text-lg text-[#6D38E0] bg-[#d2ccff] rounded-md py-2 px-4 mt-4">More movie details</h4>
    <div class="flex w-full justify-center">
        <div class="flex w-full md:w-3/5 justify-center mt-4 text-[#6D38E0] border-[2px] border-solid border-[#FFFFFF] co">
            <table class="w-full md:w-full bg-[#d2ccff]">
                <tbody>
                    <tr>
                        <th class="p-1.5 text-end border-[2px] border-solid border-[#6D38E0]">Vote average</th>
                        <td class="p-1.5 text-left border-[2px] border-solid border-[#6D38E0] w-[50%]">${movieObject.vote_average}</td>
                    </tr>
                    <tr class="">
                        <th class="p-1.5 text-end border-[2px] border-solid border-[#6D38E0]">Budget</th>
                        <td class="p-1.5 text-left border-[2px] border-solid border-[#6D38E0] w-[50%]">usd ${movieObject.budget}</td>
                    </tr>
                    <tr class="">
                        <th class="p-1.5 text-end border-[2px] border-solid border-[#6D38E0]">Revenue</th>
                        <td class="p-1.5 text-left border-[2px] border-solid border-[#6D38E0] w-[50%]">usd ${movieObject.revenue}</td>
                    </tr        
                </tbody>
            </table>
        </div>    
    </div>
    
`

let createSection = (object, nodo) => {
    let section = document.createElement("section");
    section.className = "flex flex-col items-start gap-3 p-4 mt-10 mb-8 w-full justify-center bg-[#6D38E0] text-[#FFFFFF] shadow-2xl md:grow md:ml-16 md:mr-4 md:my-16 md:justify-between lg:w-[31vw] shadow-[0px_2px_25px_33px_#6D38E0]"
    section.innerHTML = sectionContent(object, nodo);
    console.log(section);
    main.appendChild(section);
    console.log(main);
    return section;
}

let section = createSection(selectedMovieObject, ulElement);
// console.log(section);
