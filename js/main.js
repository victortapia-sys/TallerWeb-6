
import { getCharacters } from './api.js';

let allCharacters = [];

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('characters-container');
    const searchInput = document.getElementById('search');
    const raceFilter = document.getElementById('race-filter');

   
    container.innerHTML = '<p style="text-align:center; width:100%;">Cargando guerreros Z...</p>';

   
    allCharacters = await getCharacters(20); 
    
    renderCharacters(allCharacters);

   
    searchInput.addEventListener('input', filterData);
    raceFilter.addEventListener('change', filterData);
});

function renderCharacters(characters) {
    const container = document.getElementById('characters-container');
    container.innerHTML = '';

    if(characters.length === 0) {
        container.innerHTML = '<p style="text-align:center; width:100%;">No se encontraron personajes.</p>';
        return;
    }

    characters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${char.image}" alt="${char.name}" loading="lazy">
            </div>
            <div class="card-body">
                <h3>${char.name}</h3>
                <p class="card-info-text"><span>Raza:</span> ${char.race}</p>
                <p class="card-info-text"><span>Género:</span> ${char.gender}</p>
                <p class="card-info-text"><span>Base KI:</span> ${char.ki}</p>
                <p class="card-info-text"><span>Total KI:</span> ${char.maxKi}</p>
                <a href="personaje.html?id=${char.id}" class="btn-detail">Ver detalle</a>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterData() {
    const query = document.getElementById('search').value.toLowerCase();
    const selectedRace = document.getElementById('race-filter').value;

    const filtered = allCharacters.filter(char => {
        const matchesSearch = char.name.toLowerCase().includes(query);
        const matchesRace = selectedRace === "" || char.race === selectedRace;
        return matchesSearch && matchesRace;
    });

    renderCharacters(filtered);
}