import { NextResponse } from 'next/server';

export async function POST(req) {
  const { ingredients } = await req.json();
  const apiKey = process.env.OPEN_AI_KEY;
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `
          Dame una receta con los siguientes ingredientes: ${ingredients}. 
          La receta debe ser facil de hacer, con un tiempo de preparacion de menos de 30 minutos.
          Respondeme en español y con el siguiente formato de JSON:
          {
            "nombre": "Nombre de la receta",
            "ingredientes": ["ingrediente1", "ingrediente2", "ingrediente3"],
            "instrucciones": "Pasos para preparar la receta"
          }
          Solo responde con el JSON, no añades ningun texto adicional.
          `
        }
      ],
      max_tokens: 150
    })
  });

  const data = await response.json();
  const recipe = data.choices[0].message.content.trim();
  
  return NextResponse.json({ recipe });
}