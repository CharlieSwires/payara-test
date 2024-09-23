package com.charlie.payara_test;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.charlie.payara_test.CalculateMinimumPrice.Touple;

@RestController
@RequestMapping(path = "/luggage-calculator")
public class LuggageCalculator {
	Logger log = LoggerFactory.getLogger(LuggageCalculator.class);

	@Autowired
	private WeightPermutations wp;
	
	@Autowired
	private WeightsToCostConversion wtcc;
	
	private CalculateMinimumPrice cmp;

	public LuggageCalculator(WeightPermutations wp, WeightsToCostConversion wtcc) {
		cmp = new CalculateMinimumPrice(wp,wtcc);
	}

    @PostMapping(path = "/min-cost", consumes = "application/json", produces = "application/json")
    public ResponseEntity<List<Touple>> minCost( @RequestBody RequestBean input) {
    	log.info(input.toString());
    	List<Touple> result = cmp.calculateMinimumPrice(input.getWeights());
    	return new ResponseEntity<List<Touple>>(result, HttpStatus.OK);
    }
    
    @PostMapping(path = "/cost", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Double> cost( @RequestBody RequestBeanWithNames input) {
    	log.info(input.toString());
		wtcc.reset();
		Double result = wtcc.processArrayOfWeightsGivenNames(input.getWeights(), input.getNames());
    	return new ResponseEntity<Double>(result, HttpStatus.OK);
    }

}
