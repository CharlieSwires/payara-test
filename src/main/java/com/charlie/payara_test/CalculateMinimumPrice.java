package com.charlie.payara_test;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.charlie.payara_test.WeightsToCostConversion.ReturnValues;

@Service
public class CalculateMinimumPrice {

	private WeightPermutations wp = null;
	private WeightsToCostConversion wtcc = null;

	public CalculateMinimumPrice(WeightPermutations wp, WeightsToCostConversion wtcc) {
		this.wp = wp;
		this.wtcc = wtcc;
	}
	
	public class Touple {
		public String amount;
		public String enumeration;
		public Touple(String first, String second) {
			this.amount = first;
			this.enumeration = second;
		}
		@Override
		public String toString() {
			return "Touple [amount=" + amount + ", enumeration=" + enumeration + "]";
		}
	}
	
	public List<Touple> calculateMinimumPrice(Double[] weights){
		List<Touple> result = new ArrayList<>();
		List<Double[]> output;
		synchronized(wp) {
			output = wp.generatePermutationsCaller(weights, 0);
		}
		List<Double> listOfCosts = new ArrayList<>();
		List<List<String>> listOfSelected = new ArrayList<>();
		for(Double[] item : output) {
			synchronized(wp) {
				wtcc.reset();
				ReturnValues result2 = wtcc.processArrayOfWeights(item);
				listOfCosts.add(result2.price);
				listOfSelected.add(result2.selected);
			}
		}
		
		Double minCost = listOfCosts.get(0);
		int minI = 0;
		for (int i = 0; i < output.size(); i++) {
			if (minCost > listOfCosts.get(i)) {
				minCost = listOfCosts.get(i);
				minI = i;
			}
		}
		
		Touple tempItem = new Touple(""+minCost, "Cost");
		result.add(tempItem);
		for (int i = 0; i < output.get(minI).length; i++) {
			tempItem = new Touple(""+(output.get(minI))[i], listOfSelected.get(minI).get(i));
			result.add(tempItem);
		}
		return result;
		
	}
}
