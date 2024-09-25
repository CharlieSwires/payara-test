// src/WeightsInputScreen.js
import React from 'react';
import { Form, FormGroup, FormControl, Button, Table, Container, Row, Col } from 'react-bootstrap';

function WeightsInputScreen({
  peopleList,
  onWeightsChange,
  onWeightsSubmit,
  checkInBoothId,
  onCheckInBoothIdChange,
  onPersonDetailsChange,
}) {
  const handleSubmit = (personIndex) => {
    onWeightsSubmit(personIndex);
  };

  const handlePersonDetailsChangeLocal = (personIndex, field, value) => {
    onPersonDetailsChange(personIndex, field, value);
  };

  return (
	   <Container fluid className="px-0">
	     {/* Title, Check-in Booth ID Label, and Input on the Same Line */}
	     <Row className="align-items-center mb-4 mx-0">
	    {/* Title Column */}
	    <Col xs={12} md={7} className="text-center text-md-left mb-3 mb-md-0">
	      <h1>Enter Weights for Each Person</h1>
	    </Col>

	    {/* Check-in Booth ID Label Column */}
	    <Col xs={12} md={2} className="d-flex justify-content-center justify-content-md-end mb-3 mb-md-0">
	      <Form.Label className="font-weight-bold mb-0">Check-in Booth ID:</Form.Label>
	    </Col>

	    {/* Check-in Booth ID Input Column */}
	    <Col xs={12} md={2} className="d-flex justify-content-center justify-content-md-start">
	      <FormControl
	        type="text"
	        value={checkInBoothId}
	        onChange={(e) => onCheckInBoothIdChange(e.target.value)}
	        placeholder="Enter 10-digit ID"
	        maxLength="10"
	        style={{ width: '200px' }}
	      />
	    </Col>
	  </Row>

	  {/* Person Data Table */}
	       <Row className="justify-content-center mx-0">
	         <Col xs={12} lg={12}>
	           <div style={{ overflowX: 'auto' }}>
		  <Table bordered hover responsive className="text-center">
		  <thead className="thead-dark">
		    <tr>
		      <th style={{ width: '3%' }}>#</th>
		      <th style={{ width: '15%' }}>Full Name</th>
		      <th style={{ width: '15%' }}>Passport Number</th>
		      <th style={{ width: '6%' }}>W1</th>
		      <th style={{ width: '6%' }}>W2</th>
		      <th style={{ width: '6%' }}>W3</th>
		      <th style={{ width: '6%' }}>W4</th>
		      <th style={{ width: '6%' }}>W5</th>
		      <th style={{ width: '8%' }}>Submit</th>
		      <th style={{ width: '8%' }}>Amount Paid</th>
		      <th style={{ width: '21%' }}>Transaction ID</th>
		    </tr>
		  </thead>
	          <tbody>
	             {peopleList.map((person, personIndex) => (
                <tr key={personIndex}>
                  <td>{personIndex + 1}</td>
                  {/* Full Name */}
                  <td>
                    <FormControl
                      type="text"
                      value={person.name}
                      onChange={(e) => handlePersonDetailsChangeLocal(personIndex, 'name', e.target.value)}
                      placeholder="Full Name"
                      maxLength="30"
                    />
                  </td>
                  {/* Passport Number */}
                  <td>
                    <FormControl
                      type="text"
                      value={person.passportNumber}
                      onChange={(e) => handlePersonDetailsChangeLocal(personIndex, 'passportNumber', e.target.value)}
                      placeholder="Passport Number"
                      maxLength="30"
                    />
                  </td>
                  {/* Weights W1 to W5 */}
                  {person.weights.map((weight, weightIndex) => (
                    <td key={weightIndex}>
                      <FormControl
                        type="number"
                        value={weight}
                        onChange={(e) => onWeightsChange(personIndex, weightIndex, e.target.value)}
                        placeholder={`W${weightIndex + 1}`}
                        min="0"
                      />
                    </td>
                  ))}
                  {/* Submit Button */}
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleSubmit(personIndex)}
                      disabled={
                        !person.name ||
                        !person.passportNumber ||
						!checkInBoothId ||
                        person.weights.some((w) => w === '' || isNaN(w))
                      }
                    >
                      Submit
                    </Button>
                  </td>
                  {/* Amount Paid */}
                  <td>
                    <FormControl
                      type="text"
                      value={person.amountPaid}
                      readOnly
                      placeholder="Amount Paid"
                    />
                  </td>
                  {/* Transaction ID */}
                  <td>
                    <FormControl
                      type="text"
                      value={person.transactionId}
                      readOnly
                      placeholder="Transaction ID"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
		  </div>
        </Col>
		
      </Row>
    </Container>
  );
}

export default WeightsInputScreen;
