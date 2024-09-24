package com.charlie.payara_test;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class WeightPermutations {

	private List<Double[]> listOfArraysOfWeights = null;
	
	public WeightPermutations() {
		listOfArraysOfWeights = new ArrayList<Double[]>();
	}
    // Recursive method to generate permutations
    private void generatePermutations(Double[] arr, int start, List<Double[]> listOfArraysOfWeights) {
        if (start == arr.length - 1) {
            listOfArraysOfWeights.add(arr.clone());
            return;
        }
        for (int i = start; i < arr.length; i++) {
            // Swap the current element with the start element
            swap(arr, i, start);
            // Recursively generate permutations for the remaining elements
            generatePermutations(arr, start + 1, listOfArraysOfWeights);
            // Backtrack by swapping the elements back to their original positions
            swap(arr, i, start);
        }
    }

    private void clear() {
    		listOfArraysOfWeights = new ArrayList<Double[]>();
    }
    // Helper method to swap two elements in the array
    private static void swap(Double[] arr, int i, int j) {
        if (i != j) {
            double temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
	public List<Double[]> generatePermutationsCaller(Double[] weights, int start) {
		clear();
		generatePermutations(weights, start, listOfArraysOfWeights);
		return listOfArraysOfWeights;
	}
}
