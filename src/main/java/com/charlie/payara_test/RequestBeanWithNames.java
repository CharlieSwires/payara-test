package com.charlie.payara_test;

import java.util.Arrays;

public class RequestBeanWithNames {

	private String[] names;
	private Double[] weights;
	
	public RequestBeanWithNames() {
		
	}
	
	public String[] getNames() {
		return names;
	}

	public void setNames(String[] names) {
		this.names = names;
	}

	public Double[] getWeights() {
		return weights;
	}

	public void setWeights(Double[] weights) {
		this.weights = weights;
	}

	@Override
	public String toString() {
		return "RequestBeanWithNames [names=" + Arrays.toString(names) + ", weights=" + Arrays.toString(weights) + "]";
	}

}
