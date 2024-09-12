'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/getRecipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients })
    });
    const data = await res.json();
    console.log(data.recipe);
    setRecipe(JSON.parse(data.recipe));
  };

  return (
    <div className={styles.page}>
      <h1>Recetas AI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingresa los ingredientes..."
        />
        <button type="submit">Obtener Receta</button>
      </form>
      {recipe && (
        <div>
          <h2>{recipe.nombre}</h2>
          <h3>Ingredientes:</h3>
          <ul>
            {recipe.ingredientes && recipe.ingredientes.map((ingrediente, index) => (
              <li key={index}>{ingrediente}</li>
            ))}
          </ul>
          <h3>Pasos:</h3>
          <ol>
            {recipe.pasos && recipe.pasos.map((paso, index) => (
              <li key={index}>{paso}</li>
            ))}
          </ol>
          <p>Tiempo de preparación: {recipe.tiempoPreparacion}</p>
        </div>
      )}
    </div>
  );
}