
const BASE_URL = 'https://dragonball-api.com/api';



export async function getCharacters(limit = 10) {
    try {
        const response = await fetch(`${BASE_URL}/characters?limit=${limit}`);
        if (!response.ok) throw new Error('Error al obtener los personajes');
        const data = await response.json();
   
        return data.items || data;
    } catch (error) {
        console.error('API Error (getCharacters):', error);
        return [];
    }
}

export async function getCharacterById(id) {
    try {
        const response = await fetch(`${BASE_URL}/characters/${id}`);
        if (!response.ok) throw new Error(`Error al obtener el personaje con ID ${id}`);
        return await response.json();
    } catch (error) {
        console.error(`API Error (getCharacterById - ID: ${id}):`, error);
        return null;
    }
}


export async function getPlanetById(id) {
    try {
        const response = await fetch(`${BASE_URL}/planets/${id}`);
        if (!response.ok) throw new Error(`Error al obtener el planeta con ID ${id}`);
        return await response.json();
    } catch (error) {
        console.error(`API Error (getPlanetById - ID: ${id}):`, error);
        return null;
    }
}