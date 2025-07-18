import React, { useState } from 'react';
import ShortenerForm from './components/ShortenerForm';
import Stats from './components/Stats';

function App() {
  const [shortened, setShortened] = useState(
    JSON.parse(localStorage.getItem("shortened") || "[]")
  );

  const addShortened = (item) => {
    const updated = [...shortened, item];
    setShortened(updated);
    localStorage.setItem("shortened", JSON.stringify(updated));
  };

  return (
    <div className="app-container">
      <h1>🔗 URL Shortener</h1>
      <ShortenerForm onShortened={addShortened} />
      <Stats items={shortened} />
    </div>
  );
}

export default App;
