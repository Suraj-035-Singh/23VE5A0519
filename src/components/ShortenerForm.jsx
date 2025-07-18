import React, { useState } from 'react';
import axios from 'axios';

function ShortenerForm({ onShortened }) {
  const [inputs, setInputs] = useState([{ url: "", validity: "", code: "" }]);
  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const addMore = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: "", validity: "", code: "" }]);
    }
  };

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const shortenAll = async () => {
    setError("");
    for (let input of inputs) {
      if (!validateURL(input.url)) {
        setError("Invalid URL: " + input.url);
        return;
      }
    }

    for (let input of inputs) {
      try {
        const res = await axios.get(
          `https://tinyurl.com/api-create.php?url=${encodeURIComponent(input.url)}`
        );
        const shortenedURL = res.data;

        onShortened({
          original: input.url,
          short: shortenedURL,
          expiresAt: input.validity
            ? Date.now() + parseInt(input.validity) * 60 * 1000
            : null,
          code: input.code || "N/A",
        });

        // Redirect to shortened URL in new tab
        window.open(shortenedURL, "_blank");

      } catch (e) {
        setError("API error occurred. Try again.");
        console.error("TinyURL Error:", e);
      }
    }
  };

  return (
    <div>
      {inputs.map((input, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <input
            placeholder="Original URL"
            value={input.url}
            onChange={(e) => handleChange(index, "url", e.target.value)}
          />
          <input
            placeholder="Validity (mins, optional)"
            value={input.validity}
            onChange={(e) => handleChange(index, "validity", e.target.value)}
          />
          <input
            placeholder="Preferred Code (optional)"
            value={input.code}
            onChange={(e) => handleChange(index, "code", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addMore}>Add More</button>
      <button onClick={shortenAll}>Shorten All</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ShortenerForm;
