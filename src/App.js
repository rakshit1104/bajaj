import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await axios.post('https://task1-api.vercel.app/api.json/bfhl', parsedInput);
            setResponse(res.data);
        } catch (error) {
            alert('Invalid JSON or API Error');
        }
    };

    const handleSelectChange = (e) => {
        const { options } = e.target;
        const selected = [];
        for (const option of options) {
            if (option.selected) {
                selected.push(option.value);
            }
        }
        setSelectedOptions(selected);
    };

    const renderResponse = () => {
        if (!response) return null;

        return (
            <div>
                {selectedOptions.includes('Numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                {selectedOptions.includes('Alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                {selectedOptions.includes('Highest lowercase alphabet') && <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>}
            </div>
        );
    };

    return (
        <div>
            <h1>Your Roll Number</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON here'
                />
                <br />
                <button type='submit'>Submit</button>
            </form>
            <br />
            <select multiple={true} onChange={handleSelectChange}>
                <option value='Numbers'>Numbers</option>
                <option value='Alphabets'>Alphabets</option>
                <option value='Highest lowercase alphabet'>Highest Lowercase Alphabet</option>
            </select>

            {renderResponse()}
        </div>
    );
}

export default App;