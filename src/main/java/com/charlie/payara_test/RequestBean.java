package com.charlie.payara_test;

import java.util.Arrays;

public class RequestBean {

	private Double[] weights;

	public RequestBean() {
	}

	public Double[] getWeights() {
		return weights;
	}

	public void setWeights(Double[] weights) {
		this.weights = weights;
	}

	@Override
	public String toString() {
		return "RequestBean [weights=" + Arrays.toString(weights) + "]";
	}

	
}
