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

/**
 * Unit test for simple App.
 */
public class AppTest {

	private static WeightPermutations wp;
	private static WeightsToCostConversion wtcc;

	@BeforeAll
	public static void start() {
		wp = new WeightPermutations();
		wtcc = new WeightsToCostConversion();
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
		wp.generatePermutations(weightsPerm, 0);
		List<Double[]> outputPerm = wp.getList();
		wp.clear();
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
		wp.generatePermutations(weights, 0);
		List<Double[]> output = wp.getList();
		wp.clear();

		List<Double> listOfCosts = new ArrayList<>();
		List<List<String>> listOfSelected = new ArrayList<>();
		for(Double[] item : output) {
			Double cost = wtcc.processArrayOfWeights(item);
			listOfCosts.add(cost);
			listOfSelected.add(wtcc.getSelected());
			wtcc.clear();
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
}
