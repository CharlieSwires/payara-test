package com.charlie.payara_test;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CalculateMinimumPrice {

	private WeightPermutations wp = null;
	private WeightsToCostConversion wtcc = null;

	public CalculateMinimumPrice(WeightPermutations wp, WeightsToCostConversion wtcc) {
		this.wp = wp;
		this.wtcc = wtcc;
	}
	
	public class Touple {
		public String first;
		public String second;
		public Touple(String first, String second) {
			this.first = first;
			this.second = second;
		}
		@Override
		public String toString() {
			return "Touple [first=" + first + ", second=" + second + "]";
		}
	}
	
	public List<Touple> calculateMinimumPrice(Double[] weights){
		List<Touple> result = new ArrayList<>();
		wp.clear();
		wp.generatePermutations(weights, 0);
		List<Double[]> output = wp.getList();

		List<Double> listOfCosts = new ArrayList<>();
		List<List<String>> listOfSelected = new ArrayList<>();
		for(Double[] item : output) {
			wtcc.clear();
			Double cost = wtcc.processArrayOfWeights(item);
			listOfCosts.add(cost);
			listOfSelected.add(wtcc.getSelected());
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
		for (int i = 0; i <output.get(minI).length; i++) {
			tempItem = new Touple(""+(output.get(minI))[i], listOfSelected.get(minI).get(i));
			result.add(tempItem);
		}
		return result;
		
	}
}
