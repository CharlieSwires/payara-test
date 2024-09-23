package com.charlie.payara_test;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import com.charlie.payara_test.CalculateMinimumPrice.Touple;
import com.charlie.payara_test.WeightsToCostConversion.ReturnValues;

/**
 * Unit test for simple App.
 */
public class AppTest {

	private static WeightPermutations wp;
	private static WeightsToCostConversion wtcc;
	private static CalculateMinimumPrice cmp;

	@BeforeAll
	public static void start() {
		wp = new WeightPermutations();
		wtcc = new WeightsToCostConversion();
		cmp = new CalculateMinimumPrice(wp,wtcc);
	}
	/**
	 * Rigorous Test :-)
	 */
	@Test
	public void shouldAnswerWithTrue() {
		assertTrue(true);
	}
	@Test
	public void permutations() {
		// Given array of 5 weights in kilograms
		Double[] weightsPerm = {5.0, 3.0, 2.0, 4.0, 1.0};

		// Sort the array in ascending order
		Arrays.sort(weightsPerm);

		// Generate and print all permutations
		List<Double[]> outputPerm = wp.generatePermutationsCaller(weightsPerm, 0);
//		try (BufferedWriter writer = new BufferedWriter(new FileWriter("permutations.txt"))) {
//			// Generate and write all permutations
//			for (int i = 0; i < outputPerm.size(); i++) {
//				writer.write(Arrays.toString(outputPerm.get(i)));
//				writer.newLine();
//			}
//			System.out.println("All permutations have been written to permutations.txt");
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
		List<String> filePermutations = new ArrayList<>();
		try {
			filePermutations = Files.readAllLines(Paths.get("permutations.txt"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		//check the file matches the output
		for (int i = 0; i < outputPerm.size(); i++) {
			assertTrue(Arrays.toString(outputPerm.get(i)).equals(filePermutations.get(i)));
		}

		//check there are no duplicates
		HashSet<Double[]> testSet = new HashSet<Double[]>();
		testSet.addAll(outputPerm);
		assertTrue(testSet.size() == 120);

	}
	@Test
	public void calculateCost() {
		// Given array of 5 weights in kilograms
		Double[] weights = {35.0, 10.0, 11.0, 4.0, 1.0};
		// Generate and print all permutations
		List<Double[]> output = wp.generatePermutationsCaller(weights, 0);

		List<Double> listOfCosts = new ArrayList<>();
		List<List<String>> listOfSelected = new ArrayList<>();
		for(Double[] item : output) {
			ReturnValues result = wtcc.processArrayOfWeights(item);
			listOfCosts.add(result.price);
			listOfSelected.add(result.selected);
			wtcc.reset();
		}
//		try (BufferedWriter writer = new BufferedWriter(new FileWriter("costs.txt"))) {
//			// Generate and write all permutations
//			for (int i = 0; i < output.size(); i++) {
//				writer.write(""+listOfCosts.get(i)+Arrays.toString(output.get(i)));
//				for (String item : listOfSelected.get(i)){
//					writer.write(""+item+",");
//				}
//				writer.newLine();
//			}
//			System.out.println("All permutations have been written to costs.txt");
//		} catch (IOException e) {
//			e.printStackTrace();
//		}

		List<String> filePermutations = new ArrayList<>();
		try {
			filePermutations = Files.readAllLines(Paths.get("costs.txt"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		for (int i = 0; i < output.size(); i++) {
			StringBuffer sb = new StringBuffer();
			for (String item : listOfSelected.get(i)){
				sb.append(""+item+",");
			}

			assertTrue((""+listOfCosts.get(i)+Arrays.toString(output.get(i))+sb.toString()).equals(filePermutations.get(i)));
		}

	}
	@Test
	public void calculateMinPrice() {
		// Given array of 5 weights in kilograms
		Double[] weights = {35.0, 10.0, 11.0, 4.0, 1.0};
		List<Touple> result = cmp.calculateMinimumPrice(weights);
//		System.out.println(Arrays.toString(result.toArray()));
		assertTrue(("[Touple [first=110.0, second=Cost], "
				+ "Touple [first=10.0, second=FREE_UNDER_7KG_OVERWEIGHT], "
				+ "Touple [first=35.0, second=FREE_UNDER_25KG_OVERWEIGHT], "
				+ "Touple [first=11.0, second=FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT], "
				+ "Touple [first=4.0, second=FEE_UNDER_7KG], "
				+ "Touple [first=1.0, second=FEE_UNDER_7KG]]"
				).equals(Arrays.toString(result.toArray())));
	}
	@Test
	public void calculatePrice() {
		// Given array of 5 weights in kilograms
		Double[] weights = {10.0, 35.0, 11.0, 4.0, 1.0};
		String[] names = {"FREE_UNDER_7KG_OVERWEIGHT",
				"FREE_UNDER_25KG_OVERWEIGHT",
				"FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT",
				"FEE_UNDER_7KG",
		"FEE_UNDER_7KG"};
		wtcc.reset();
		Double result = wtcc.processArrayOfWeightsGivenNames(weights, names);
//		System.out.println("Result="+result.toString());
		assertTrue("110.0".equals(result.toString()));

	}

	@Test
	public void calculatePrice2() {
		// Given array of 5 weights in kilograms
		Double[] weights = {35.0, 10.0, 11.0, 4.0, 1.0};
		String[] names = {"FREE_UNDER_7KG_OVERWEIGHT",
				"FREE_UNDER_25KG_OVERWEIGHT",
				"FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT",
				"FEE_UNDER_7KG",
		"FEE_UNDER_7KG"};
		wtcc.reset();
		Double result = wtcc.processArrayOfWeightsGivenNames(weights, names);
//		System.out.println("Result="+result.toString());
		assertTrue("185.0".equals(result.toString()));

	}
	@Test
	public void calculatePrice3() {
		// Given array of 5 weights in kilograms
		Double[] weights = {35.0, 10.0, 11.0, 4.0, 1.0};
		String[] names = {"FREE_UNDER_7KG_OVERWEIGHT",
				"FREE_UNDER_25KG_OVERWEIGHT",
				"FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT",
				"FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT",
		"FEE_UNDER_7KG"};
		wtcc.reset();
		try {
			Double result = wtcc.processArrayOfWeightsGivenNames(weights, names);
		} catch (RuntimeException e) {
			assertTrue("FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT - not in the right range 7-?kg!!".equals(e.getMessage()));
		}

	}

}
