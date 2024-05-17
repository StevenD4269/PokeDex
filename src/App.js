// Display the list of Pokemon however you like, making sure to show their “name,” “num,” “type,” and “weaknesses.”
// Make this list searchable via a search box. For simplicity, just search through the names of the Pokemon, only.
// Also, make this list filterable via the “type” and “weaknesses” fields.
// You should be able to apply multiple filters at a time. This means that the search should narrow by name, or type, or weakness, depending on how the user (or you as the developer) designs the search.
// For example, I may want to search for type "Grass" and weakness "Fire". The filtered Pokemon should be both of type "Grass" and weakness "Fire"
// NOTE: You may use checkboxes, dropdowns, text input fields, or any other search filter method.
// REMEMBER: The main goal is functionality. You can always come back and style/refactor/optimize/etc.

//import my modules
import React, { useState, useEffect } from "react";
import "./App.css";

//usestate hooks to manage my pokemon list, what is seatched. and types/weakness so i can filter
function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedWeaknesses, setSelectedWeaknesses] = useState([]);

  // https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json for my fetch
  //fetches the info from the URL then updates pokemonList for myself or the user
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    )
      .then((response) => response.json())
      .then((data) => setPokemonList(data.pokemon));
  }, []);
  //filter some pokemon by term, type, weakness
  const filterPokemon = pokemonList.filter((pokemon) => {
    // use filter to take only pokemon objects
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()); //turns name and turn to lowercase with a true/false
    const matchesTypes =
      selectedTypes.length === 0 ||
      selectedTypes.some((type) => pokemon.type.includes(type)); //use anothe true/false. .some tests if an element passes the test = true
    const matchesWeaknesses =
      selectedWeaknesses.length === 0 ||
      selectedWeaknesses.some((weakness) =>
        pokemon.weaknesses.includes(weakness)
      );
    return matchesSearch && matchesTypes && matchesWeaknesses; // treturns the pokemon that matches all the filters
  });

  // using event handlers to to update the term/type/weakness
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTypes([...selectedTypes, value]);
    } else {
      setSelectedTypes(selectedTypes.filter((type) => type !== value));
    }
  };

  const handleWeaknessChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedWeaknesses([...selectedWeaknesses, value]);
    } else {
      setSelectedWeaknesses(
        selectedWeaknesses.filter((weakness) => weakness !== value)
      );
    }
  };

  return (
    <div className="App">
      <h1>Poke Trainer Dan's Pokemon Index</h1>
      <input //create an input they can look for pokemon
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={handleSearchChange} //use my event handler
      />
      {/* use divs to contain my filters, use input to make input boxes with handletypechange function */}
      <div>
        <h2>Filter by Type:</h2>
        <label>
          <input type="checkbox" value="Grass" onChange={handleTypeChange} />
          Grass
        </label>
        <label>
          <input type="checkbox" value="Fire" onChange={handleTypeChange} />
          Fire
        </label>
        <label>
          <input type="checkbox" value="Water" onChange={handleTypeChange} />
          Water
        </label>
        <label className="psychicType">
          <input type="checkbox" value="Psychic" onChange={handleTypeChange} />
          Psychic - the best type
        </label>
      </div>
      <div>
        <h2>Filter by Weakness:</h2>
        <label>
          <input
            type="checkbox"
            value="Grass"
            onChange={handleWeaknessChange}
          />
          Grass
        </label>
        <label>
          <input type="checkbox" value="Fire" onChange={handleWeaknessChange} />
          Fire
        </label>
        <label>
          <input
            type="checkbox"
            value="Water"
            onChange={handleWeaknessChange}
          />
          Water
        </label>
        <label className="psychicType2">
          <input
            type="checkbox"
            value="Psychic"
            onChange={handleWeaknessChange}
          />
          Psychic - Still the best type
        </label>
      </div>
      {/* create a div and use.map and give me back name, number, type, weakness */}
      <div className="pokemon-list">
        {filterPokemon.map((pokemon) => (
          <div
            key={pokemon.id}
            className={`pokemon-card ${
              pokemon.type.includes("Psychic") ? "psychic-pokemon" : ""
            }`}
          >
            <img src={pokemon.img} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p>Number: {pokemon.num}</p>
            <p>Type: {pokemon.type.join(", ")}</p>
            <p>Weaknesses: {pokemon.weaknesses.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
