// src/LuggageCalculator.js
import React, { useState, useEffect } from 'react';

function LuggageCalculator({ weightsInput, onBack }) {
  const [data, setData] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);     
  const [result, setResult] = useState('');     // For displaying the result from /cost endpoint

  // Fetch rules from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:9999/payara/luggage-calculator/rules')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch rules: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(rulesData => {
        setRules(rulesData);
      })
      .catch(err => {
        console.error('Error fetching rules:', err);
        setError(err);
      });
  }, []);

  useEffect(() => {
    handleSubmit(); // Automatically submit when weightsInput changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weightsInput]);

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    setResult(''); // Reset any previous result

    const requestData = {
      weights: weightsInput.map(w => parseFloat(w) || 0) // Ensure values are numbers
    };

    fetch('http://localhost:9999/payara/luggage-calculator/min-cost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        // Initialize selectedRule for each item
        const dataWithRules = data.map(item => ({ ...item, selectedRule: '' }));
        setData(dataWithRules);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  const handleRuleChange = (index, value) => {
    const newData = [...data];
    newData[index].selectedRule = value;
    setData(newData);
  };

  const handleCalculateWithRules = () => {
    setLoading(true);
    setError(null);
    setResult(''); // Reset any previous result

    // Filter out the row where Enumeration is 'Cost'
    const filteredData = data.filter(item => item.enumeration !== 'Cost');

    // Map the weights and names
    const weights = filteredData.map(item => parseFloat(item.amount) || 0);
    const names = filteredData.map(item => item.selectedRule || '');

    // Check if any rule is not selected
    if (names.includes('')) {
      setError(new Error('Please select a rule for each item.'));
      setLoading(false);
      return;
    }

    const requestData = {
      weights: weights,
      names: names
    };

    fetch('http://localhost:9999/payara/luggage-calculator/cost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        return response.text().then(text => {
          if (!response.ok) {
            // Throw an error with the response text
            throw new Error(text || `Server error: ${response.status} ${response.statusText}`);
          }
          return text;
        });
      })
      .then(resultData => {
        setResult(resultData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        // Set the result to the error message to display it in the Result section
        setResult(err.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Luggage Calculator</h1>
      <button onClick={onBack} style={{ marginBottom: '20px' }}>Back to Input</button>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
      {data.length > 0 && (
        <div>
          <h2>Results</h2>
          <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Enumeration</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.amount}</td>
                  <td>{item.enumeration}</td>
                  <td>
                    {item.enumeration !== 'Cost' ? (
                      rules.length > 0 ? (
                        <select
                          value={item.selectedRule || ''}
                          onChange={(e) => handleRuleChange(index, e.target.value)}
                        >
                          <option value="" disabled>Select Rule</option>
                          {rules.map((rule, ruleIndex) => (
                            <option key={ruleIndex} value={rule}>{rule}</option>
                          ))}
                        </select>
                      ) : (
                        'Loading rules...'
                      )
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleCalculateWithRules} style={{ marginTop: '10px' }}>
            Calculate with Rules
          </button>
        </div>
      )}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Calculate with Rules Result</h2>
          <div>{result}</div>
        </div>
      )}
    </div>
  );
}

export default LuggageCalculator;
