import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function Chat() {
    const [query, setQuery] = useState('');
    const [answer,setAnswer]= useState('');

    const onInputChange = (e) => {
        setQuery(e.target.value);
    }
    const onFormSubmit= async(e) => {
        e.preventDefault();
        setQuery('');
        const apiKey = import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT; // replace with your API key from Google Cloud Platform
   const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        { contents: [{ parts: [{ text: query }] }] },
     
      );    
    const aiText = response.data.candidates[0].content.parts[0].text;
    console.log(aiText);
    setAnswer(aiText);
    }

  return (
    <div>
        <form onSubmit={onFormSubmit}>
            <input type='text' placeholder='ask your query' onChange={onInputChange} value={query}/>
            <button>Send</button>
            <p>{answer}</p>
        </form>

    </div>
  )
}
