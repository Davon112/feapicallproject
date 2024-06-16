// STEP 1: Grab this DATA from the form
async function handleSubmit(event){
    event.preventDefault();
    
    // grab our search terms from the form
    // console.log(event)
    const search = event.target.search.value;
    console.log(search);
    
    const pokeData = await fetchPokeData(search);
    console.log(pokeData)
    
    displayPoke(pokeData);
}


// STEP 2: Making a GET Request to our API

async function fetchPokeData(name){
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return await response.json()
}

// create  a globaal id value that we increment (Option 1 for unique)
// let id = 1

// STEP 3: Make Cards for our Display
function displayPoke(name) {
    
    const id = Math.floor(Math.random() * 100000) //fake id creation
    const liHTML = name.abilities.map( (abilityObject) => `<li>${abilityObject.ability.name}</li>`).join(" ");
    const tyHTML = name.types.map((typeObject) => `<li> ${typeObject.type.name}</li>`).join(" ");
    const stHTML = name.stats.map( (statObject) => `<li> ${statObject.stat.name}: ${statObject["base_stat"]} </li>`).join(" ")
    const html = `<div class="card bg-dark border rounded shadow text-white p-4 mx-auto">
                        <div class="d-md-flex">
                        <div class="border rounded" id="image">
                            <img src=${name.sprites.other['dream_world']['front_default']} class="img-fluid" alt="pokemon image">
                        </div>
                        <div class="mt-3 mt-md-0 ms-md-3" id="text">
                            <h1>${name.name}</h1>
                            <p>Height: ${name.height} ' </p>
                            
                            <p>Weight: ${name.weight} pounds</p>
                            <p>Abilities:</p>
                            <ul>
                            ${liHTML}
                            </ul>

                            <p>Types:<p>
                            <ul>
                            ${tyHTML}
                            </ul>

                            <p>Stats:<p>
                            <ul>
                            ${stHTML}
                            </ul>

                        
                        </div>
                        </div>
                    </div>
    `
    // create a new object we can append to our document
    const card = document.createElement('div');
    card.setAttribute('id', id)
    card.innerHTML = html;
    
    // find the parent to append to
    const display = document.getElementById("poke-display");
    display.appendChild(card);
}