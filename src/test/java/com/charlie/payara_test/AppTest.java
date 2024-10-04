package com.charlie.payara_test;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

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
		List<Double> listOfCosts = null;
		List<List<String>> listOfSelected = null;
		// Generate and print all permutations
		List<Double[]> output = null;
		synchronized (wtcc) {
			output = wp.generatePermutationsCaller(weights, 0);
			listOfCosts = new ArrayList<>();
			listOfSelected = new ArrayList<>();
			for(Double[] item : output) {
				ReturnValues result = wtcc.processArrayOfWeightsCaller(item);
				listOfCosts.add(result.price);
				listOfSelected.add(result.selected);
			}
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
		Double[] weights = {25.0, 25.0, 7.0, 7.0, 7.0};
		List<Touple> result = cmp.calculateMinimumPrice(weights);
		//		System.out.println(Arrays.toString(result.toArray()));
		assertTrue(("[Touple [amount=45.0, enumeration=Cost], "
				+ "Touple [amount=7.0, enumeration=FREE_UNDER_7KG_OVERWEIGHT], "
				+ "Touple [amount=25.0, enumeration=FREE_UNDER_25KG_OVERWEIGHT], "
				+ "Touple [amount=25.0, enumeration=FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT], "
				+ "Touple [amount=7.0, enumeration=FEE_UNDER_7KG], "
				+ "Touple [amount=7.0, enumeration=FEE_UNDER_7KG]]"
				).equals(Arrays.toString(result.toArray())));
	}
	@Test
	public void calculateMinPriceRandom() {
		// Given array of 5 weights in kilograms
		Double[] weights = new Double[5];
		Random rnd = new Random(0);
		try {
			for (int count = 0; count < 1000; count++) {
				for (int i = 0; i < weights.length; i++) {
					weights[i] = rnd.nextDouble()*30.0;
				}
				List<Touple> result = cmp.calculateMinimumPrice(weights);
				assertTrue(weights.length == result.size() - 1);
			}
		} catch (Exception e) {
			e.printStackTrace();
			assertTrue(false);
		}
		assertTrue(true);
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
		Double result = wtcc.processArrayOfWeightsGivenNamesCaller(weights, names);
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
		Double result = wtcc.processArrayOfWeightsGivenNamesCaller(weights, names);
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
		try {
			Double result = wtcc.processArrayOfWeightsGivenNamesCaller(weights, names);
		} catch (RuntimeException e) {
			assertTrue("FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT - not in the right range 7-?kg!!".equals(e.getMessage()));
		}

	}

}
