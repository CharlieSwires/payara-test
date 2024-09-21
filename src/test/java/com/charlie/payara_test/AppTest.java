package com.charlie.payara_test;

import static org.junit.jupiter.api.Assertions.assertTrue;

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
	
	@BeforeAll
	public static void start() {
		wp = new WeightPermutations();
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
            Double[] weights = {5.0, 3.0, 2.0, 4.0, 1.0};
            
            // Sort the array in ascending order
            Arrays.sort(weights);
            
            // Generate and print all permutations
            wp.generatePermutations(weights, 0);
            List<Double[]> output = wp.getList();

            List<String> filePermutations = new ArrayList<>();
            try {
                filePermutations = Files.readAllLines(Paths.get("permutations.txt"));
            } catch (IOException e) {
                e.printStackTrace();
            }
            //check the file matches the output
            for (int i = 0; i < output.size(); i++) {
            	assertTrue(Arrays.toString(output.get(i)).equals(filePermutations.get(i)));
            }
            
            //check there are no duplicates
            HashSet<Double[]> testSet = new HashSet<Double[]>();
            testSet.addAll(output);
            assertTrue(testSet.size() == 120);
            
    }
}
