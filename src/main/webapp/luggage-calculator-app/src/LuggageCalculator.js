import React, { useState, useEffect } from 'react';

function LuggageCalculator({ weightsInput, personIndex, onBack, onPay, checkInBoothId }) {
  const [data, setData] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);     
  const [result, setResult] = useState('');     // For displaying the result from /cost endpoint
  const [minimumAmount, setMinimumAmount] = useState(null);
  const [userDefinedAmount, setUserDefinedAmount] = useState(null);

  // Fetch rules from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:9999/payara/luggage-calculator/rules')
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch rules: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((rulesData) => {
        setRules(rulesData);
      })
      .catch((err) => {
        console.error('Error fetching rules:', err);
        setError(err);
      });
  }, []);

  useEffect(() => {
    handleSubmit(); // Automatically submit when weightsInput changes
  }, [weightsInput]);

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    setResult(''); // Reset any previous result

    const requestData = {
      weights: weightsInput.map((w) => parseFloat(w) || 0), // Ensure values are numbers
    };

    fetch('http://localhost:9999/payara/luggage-calculator/min-cost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Server error: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        // Initialize selectedRule for each item
        const dataWithRules = data.map((item) => ({
          ...item,
          selectedRule: '',
        }));
        setData(dataWithRules);

        // Extract the 'Cost' amount
        const costItem = dataWithRules.find(
          (item) => item.enumeration === 'Cost'
        );
        if (costItem) {
          setMinimumAmount(parseFloat(costItem.amount));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError(err);
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
    const filteredData = data.filter((item) => item.enumeration !== 'Cost');

    // Map the weights and names
    const weights = filteredData.map((item) => parseFloat(item.amount) || 0);
    const names = filteredData.map((item) => item.selectedRule || '');

    // Check if any rule is not selected
    if (names.includes('')) {
      setError(new Error('Please select a rule for each item.'));
      setLoading(false);
      return;
    }

    const requestData = {
      weights: weights,
      names: names,
    };

    fetch('http://localhost:9999/payara/luggage-calculator/cost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        return response.text().then((text) => {
          if (!response.ok) {
            throw new Error(
              text || `Server error: ${response.status} ${response.statusText}`
            );
          }
          return text;
        });
      })
      .then((resultData) => {
        setResult(resultData);
        setUserDefinedAmount(parseFloat(resultData)); // Assuming resultData is a numeric string
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        // Set the result to the error message to display it in the Result section
        setResult(err.message);
        setLoading(false);
      });
  };

  const handlePayMinimum = () => {
    if (minimumAmount !== null) {
      // Call onPay and pass personIndex and minimumAmount to navigate to PaymentScreen
      onPay(personIndex, minimumAmount);  // Pass payment and navigate to PaymentScreen
    } else {
      alert('Minimum amount is not available.');
    }
  };

  const handlePayUserDefined = () => {
    if (userDefinedAmount !== null) {
      // Call onPay and pass personIndex and userDefinedAmount to navigate to PaymentScreen
      onPay(personIndex, userDefinedAmount);  // Pass payment and navigate to PaymentScreen
    } else {
      alert('User-defined amount is not available.');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Luggage Calculator</h1>
      <div className="text-right" style={{ marginBottom: '20px' }}>
        <button onClick={onBack} className="btn btn-default">
          Back to Input
        </button>
      </div>

      {loading && (
        <div className="alert alert-info">
          <strong>Loading...</strong>
        </div>
      )}
      {error && (
        <div className="alert alert-danger">
          <strong>Error:</strong> {error.message}
        </div>
      )}

      {data.length > 0 && (
        <div>
          <h2 className="text-center">Results</h2>
          <table className="table table-bordered table-striped">
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
                          className="form-control"
                        >
                          <option value="" disabled>
                            Select Rule
                          </option>
                          {rules.map((rule, ruleIndex) => (
                            <option key={ruleIndex} value={rule}>
                              {rule}
                            </option>
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
          <div className="text-center" style={{ marginTop: '20px' }}>
            <button
              onClick={handleCalculateWithRules}
              className="btn btn-success"
              style={{ marginRight: '10px' }}
            >
              Calculate with Rules
            </button>
            {/* Add Pay Buttons */}
            <button
              onClick={handlePayMinimum}
              className="btn btn-primary"
              disabled={minimumAmount === null}
              style={{ marginRight: '10px' }}
            >
              Pay Minimum
            </button>
            <button
              onClick={handlePayUserDefined}
              className="btn btn-primary"
              disabled={userDefinedAmount === null}
            >
              Pay User Defined
            </button>
          </div>
        </div>
      )}
      {result && (
        <div className="well" style={{ marginTop: '20px' }}>
          <h2>Calculate with Rules Result</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default LuggageCalculator;
