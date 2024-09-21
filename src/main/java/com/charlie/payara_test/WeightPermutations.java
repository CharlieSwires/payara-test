package com.charlie.payara_test;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class WeightPermutations {

	private static List<Double[]> listOfArrays = null;
	
	public WeightPermutations() {
		listOfArrays = new ArrayList<Double[]>();
	}
    // Recursive method to generate permutations
    public void generatePermutations(Double[] arr, int start) {
        if (start == arr.length - 1) {
            listOfArrays.add(arr.clone());
            return;
        }
        for (int i = start; i < arr.length; i++) {
            // Swap the current element with the start element
            swap(arr, i, start);
            // Recursively generate permutations for the remaining elements
            generatePermutations(arr, start + 1);
            // Backtrack by swapping the elements back to their original positions
            swap(arr, i, start);
        }
    }

    public List<Double[]> getList(){
    	return listOfArrays;
    }
    // Helper method to swap two elements in the array
    private static void swap(Double[] arr, int i, int j) {
        if (i != j) {
            double temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}
