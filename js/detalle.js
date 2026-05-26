
import { getCharacterById, getPlanetById } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const characterId = params.get('id');
    const planetId = params.get('planetId');
    const container = document.getElementById('detail-view-container');
    const backNavLink = document.getElementById('back-nav-link');

    if (characterId) {
        // --- ESCENARIO RF2: DETALLE DE PERSONAJE ---
        backNavLink.textContent = "Volver al inicio";
        backNavLink.href = "index.html";
        
        container.innerHTML = '<p>Cargando detalles del personaje...</p>';
        const character = await getCharacterById(characterId);

        if (!character) {
            container.innerHTML = '<p>Error al cargar el personaje.</p>';
            return;
        }

        renderCharacterDetail(container, character);

    } else if (planetId) {
      
        backNavLink.textContent = "Personajes";
        backNavLink.href = "index.html";

        container.innerHTML = '<p>Cargando información planetaria...</p>';
        const planet = await getPlanetById(planetId);

        if (!planet) {
            container.innerHTML = '<p>Error al cargar el planeta.</p>';
            return;
        }

        renderPlanetDetail(container, planet);
    } else {
    
        window.location.href = 'index.html';
    }
});



function renderCharacterDetail(target, char) {
    
    const planetId = char.originPlanet ? char.originPlanet.id : null;

    let html = `
        <div class="detail-main-card">
            <div class="detail-img-box">
                <img src="${char.image}" alt="${char.name}">
            </div>
            <div class="detail-content">
                <h2>${char.name}</h2>
                <div class="detail-subtitle">${char.race} - ${char.gender} - ${char.affiliation}</div>
                
                <div class="ki-badges">
                    <div class="badge">
                        <span class="badge-label">Base Ki</span>
                        <span class="badge-value yellow">${char.ki}</span>
                    </div>
                    <div class="badge">
                        <span class="badge-label">Max Ki</span>
                        <span class="badge-value yellow">${char.maxKi}</span>
                    </div>
                    <div class="badge">
                        <span class="badge-label">ID</span>
                        <span class="badge-value">${char.id}</span>
                    </div>
                </div>

                <p class="detail-description">${char.description}</p>
                
                ${planetId ? `<a href="personaje.html?planetId=${planetId}" class="btn-planet">Ver planeta: ${char.originPlanet.name}</a>` : ''}
            </div>
        </div>
    `;

    html += `<h3 class="section-title">Transformaciones</h3>`;
    if (char.transformations && char.transformations.length > 0) {
        html += `<div class="grid-characters">`;
        char.transformations.forEach(trans => {
            html += `
                <div class="card">
                    <div class="card-img-container">
                        <img src="${trans.image}" alt="${trans.name}" loading="lazy">
                    </div>
                    <div class="card-body">
                        <h3>${trans.name}</h3>
                        <p class="card-info-text"><span>Ki:</span> ${trans.ki}</p>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    } else {
        html += `<p style="color: var(--text-muted);">Este personaje no posee transformaciones registradas.</p>`;
    }

    target.innerHTML = html;
}



function renderPlanetDetail(target, planet) {
    let html = `
        <div class="detail-main-card">
            <div class="detail-img-box">
                <img src="${planet.image}" alt="${planet.name}">
            </div>
            <div class="detail-content">
                <h2>${planet.name}</h2>
                <p class="text-destroyed">${planet.isDestroyed ? 'Planeta destruido' : 'Planeta Activo'}</p>
                <p class="detail-description">${planet.description || 'Sin descripción disponible.'}</p>
            </div>
        </div>
    `;

    html += `<h3 class="section-title">Personajes del planeta</h3>`;
    if (planet.characters && planet.characters.length > 0) {
        html += `<div class="grid-characters">`;
        planet.characters.forEach(char => {
            html += `
                <div class="card">
                    <div class="card-img-container">
                        <img src="${char.image}" alt="${char.name}" loading="lazy">
                    </div>
                    <div class="card-body">
                        <h3>${char.name}</h3>
                        <p class="card-info-text"><span>Raza:</span> ${char.race}</p>
                        <p class="card-info-text"><span>Ki:</span> ${char.ki}</p>
                        <a href="personaje.html?id=${char.id}" class="btn-detail" style="margin-top:15px;">Ver detalle</a>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    } else {
        html += `<p style="color: var(--text-muted);">No hay personajes registrados habitando este planeta.</p>`;
    }

    target.innerHTML = html;
}