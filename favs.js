import { favCardContent } from './function.js'
import { createFavCards } from './function.js'


let $cardContainer = document.querySelector(".card-container");
console.log($cardContainer);
const $clearBtn = document.querySelector("#clear-btn");
console.log($clearBtn);

let favList = [];

let favIdMovies = JSON.parse(localStorage.getItem('favList')) || [];
console.log(favIdMovies);

fetch('https://moviestack.onrender.com/api/movies', {
	headers: {
		'x-api-key': '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
	}
})
	.then(res => res.json())
	.then(data => {
		let moviesAPI = data.movies;
		let moviesById = moviesAPI.filter(movie => favIdMovies.includes(movie.id))
		console.log(moviesById);
		createFavCards(moviesById);

		$cardContainer.addEventListener("click", event => {

			// Verificar si se hizo clic en el corazón de la carta
			let clickedHeart = event.target.classList.contains("heart");

			if (clickedHeart) {
				// Obtener el ID de la película asociada al corazón
				const favId = event.target.dataset.fav;

				// Eliminar el ID del localStorage
				let favList = JSON.parse(localStorage.getItem('favList')) || [];
				favList = favList.filter(id => id !== favId);
				localStorage.setItem('favList', JSON.stringify(favList));

				// Eliminar la carta del DOM
				const card = event.target.closest(".card");
				if (card) {
					card.remove();
				}
			}
		});

		$clearBtn.addEventListener('click', event => {
			let eraser = event.target.closest(".clear-btn");

			if (eraser) {
				localStorage.clear();
				$cardContainer.innerHTML = `<h4 class="text-2xl text-center text-bold">No movies in your list</h4>`;
				eraser.remove();
			}
		})

		console.log(favList);
	})
	.catch(err => console.log(err));

if (favIdMovies.length === 0) {
	$cardContainer.innerHTML = `<h4 class="text-2xl text-center text-bold">No movies in your list</h4>`;
	$clearBtn.remove();
}


