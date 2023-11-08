const urlEndpoint = "https://pokeapi.co/api/v2/pokemon/";
const listaPokemons = document.getElementById("listaPokemons");
const inputFiltrar = document.getElementById("barra_pesquisa");
const totalPokemons = document.getElementById("totalRegistros");

async function CarregarPokemons() {
    try {
        const resposta = await fetch(urlEndpoint);
        const data = await resposta.json();
        const pokemons = data.results;

        totalPokemons.textContent = pokemons.length + " Pokémon(s)";

        pokemons.forEach(async (pokemon) => {
            try {
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonResponse.json();

                const li = document.createElement("li");

                const pokemonName = document.createElement("span");
                pokemonName.textContent = pokemon.name;
                li.appendChild(pokemonName);

                const types = document.createElement("p");
                types.textContent = `Type: ${pokemonData.types.map((type) => type.type.name).join(", ")}`;
                li.appendChild(types);

                const pokemonImage = document.createElement("img");
                pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;
                pokemonImage.alt = `${pokemon.name} Image`;
                pokemonImage.classList.add('pokemon-image');
                li.appendChild(pokemonImage);

                li.classList.add('pokemon-item');
                listaPokemons.appendChild(li);
            } catch (error) {
                console.error("Erro ao carregar dados do Pokémon: " + error);
            }
        });

    } catch (error) {
        console.error("Falha no processamento: " + error);
    }
}

CarregarPokemons();

inputFiltrar.addEventListener("input", () => {
    const filtro = inputFiltrar.value.toLowerCase();
    const pokemons = document.querySelectorAll('.pokemon-item');
    let total = 0;

    pokemons.forEach((item) => {
        const nomePoke = item.firstChild.textContent.toLowerCase();

        if (nomePoke.includes(filtro)) {
            item.style.display = "block";
            total++;
        } else {
            item.style.display = "none";
        }
    });

    totalPokemons.textContent = total + " Pokémon(s)";
});

