package com.charlie.payara_test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class WeightsToCostConversion {
	public static final Integer USED_ONCE = 1;
	public static final Integer USED_MANY = -1;

	public enum RuleNames {
		FREE_ZERO_CASE(0.0, 0.0, 0.0, USED_MANY),
		FREE_UNDER_7KG_OVERWEIGHT(0.0, 0.0, 7.0, USED_ONCE),
		FREE_UNDER_25KG_OVERWEIGHT(0.0, 0.0, 25.0, USED_ONCE),
		FEE_UNDER_7KG(10.0, 0.0, 7.0, USED_MANY),
		FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT(25.0, 7.0, 25.0, USED_MANY),
		OVERWEIGHT(5.0, 1.0, null, USED_MANY);

		private Double price;
		private Double over;
		private Double under;
		private Integer many;

		RuleNames(Double price, Double over, Double under, Integer many) {
			this.price = price;
			this.over = over;
			this.under = under;
			this.many = many;
		}
		public Double getPrice() {
			return price;
		}
		public Double getOver() {
			return over;
		}
		public Double getUnder() {
			return under;
		}
		public Integer getMany() {
			return many;
		}
	}

	public class ReturnValues {
		public ReturnValues(Double price, List<String> selected) {
			super();
			this.price = price;
			this.selected = selected;
		}
		public Double price;
		public List<String> selected;
	}
	
	public static HashMap<String,Integer> singles = new HashMap<String,Integer>();
	public WeightsToCostConversion() {
		singles = new HashMap<String,Integer>();
		for(RuleNames item : RuleNames.values()) {
			singles.put(item.name(),item.getMany());
		}
	}

	public void reset() {
		singles = new HashMap<String,Integer>();
		for(RuleNames item : RuleNames.values()) {
			singles.put(item.name(),item.getMany());
		}
	}

	public ReturnValues processArrayOfWeights(Double[] weights) {
		Double sum = 0.0;
		List<String> selected = new ArrayList<>();
		for(int i = 0; i < weights.length; i++) {
			boolean contin = false;
			for(RuleNames item : RuleNames.values()) {
				if (contin) continue;

				switch(item.name()) {
				case "FREE_ZERO_CASE":
					if (singles.get("FREE_ZERO_CASE") == USED_MANY) {
						if (weights[i].toString().equals(item.getOver().toString()) &&
								weights[i].toString().equals(item.getUnder().toString())) {
							sum += item.getPrice();
							selected.add(item.name());
							contin = true;
						} 
					} else {
						throw new RuntimeException(item.name() + " - expected USED_MANY!!");
					}
					break;
				case "FREE_UNDER_7KG_OVERWEIGHT":
					int timesLeft = singles.get("FREE_UNDER_7KG_OVERWEIGHT");

					if (timesLeft > 0) {
						if (weights[i] >= item.getOver() && weights[i] < item.getUnder()) {
							singles.put("FREE_UNDER_7KG_OVERWEIGHT", --timesLeft);
							selected.add(item.name());
							contin = true;
						} else if (weights[i] > item.getUnder()) {
							sum += RuleNames.valueOf("OVERWEIGHT").getPrice() * (weights[i] - item.getUnder());
							singles.put("FREE_UNDER_7KG_OVERWEIGHT", --timesLeft);
							selected.add(item.name());
							contin = true;
						}
					}
					break;
				case "FREE_UNDER_25KG_OVERWEIGHT":
					timesLeft = singles.get("FREE_UNDER_25KG_OVERWEIGHT");
					if (timesLeft  > 0) {
						if (weights[i] >= item.getOver() && weights[i] < item.getUnder()) {
							singles.put("FREE_UNDER_25KG_OVERWEIGHT", --timesLeft);
							selected.add(item.name());
							contin = true;
						} else if (weights[i] > item.getUnder()) {
							sum += RuleNames.valueOf("OVERWEIGHT").getPrice() * (weights[i] - item.getUnder());
							singles.put("FREE_UNDER_25KG_OVERWEIGHT", --timesLeft);
							selected.add(item.name());
							contin = true;
						}
					}
					break;
				case "FEE_UNDER_7KG":
					if (singles.get("FEE_UNDER_7KG") == USED_MANY) {
						if (weights[i] >= item.getOver() && weights[i] < item.getUnder()) {
							sum += item.getPrice();
							selected.add(item.name());
							contin = true;
						} 
					} else {
						throw new RuntimeException(item.name() + " - expected USED_MANY!!");
					}
					break;
				case "FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT":
					if (singles.get("FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT") == USED_MANY) {
						if (weights[i] >= item.getOver() && weights[i] < item.getUnder()) {
							sum += item.getPrice();
							selected.add(item.name());
							contin = true;
						} else if (weights[i] > item.getUnder()) {
							sum += item.getPrice();
							sum += RuleNames.valueOf("OVERWEIGHT").getPrice() * (weights[i] - item.getUnder());
							selected.add(item.name());
							contin = true;
						}
					} else {
						throw new RuntimeException(item.name() + " - expected USED_MANY!!");
					}
					break;
				case "OVERWEIGHT":
					break;
				default:
					throw new RuntimeException("Not Implemented");
				}
			}
		}
		ReturnValues result = new ReturnValues(sum, selected);
		return result;
	}

	public Double processArrayOfWeightsGivenNames(Double[] weights, String[] names) {
		Double sum = 0.0;
		for(int i = 0; i < weights.length; i++) {
			String name = names[i];

			RuleNames item = RuleNames.valueOf(name);

			switch(name) {
			case "FREE_ZERO_CASE":
				if (singles.get("FREE_ZERO_CASE") == USED_MANY) {
					if (weights[i].toString().equals(item.getOver().toString()) &&
							weights[i].toString().equals(item.getUnder().toString())) {
						sum += item.getPrice();
						continue;
					} 
				} else {
					throw new RuntimeException(item.name() + " - expected USED_MANY!!");
				}
			case "FREE_UNDER_7KG_OVERWEIGHT":
				int timesLeft = singles.get("FREE_UNDER_7KG_OVERWEIGHT");

				if (timesLeft > 0) {
					if (weights[i] >= item.getOver() && weights[i] < item.getUnder()) {
						singles.put("FREE_UNDER_7KG_OVERWEIGHT", --timesLeft);
						continue;
					} else if (weights[i] > item.getUnder()) {
						sum += RuleNames.valueOf("OVERWEIGHT").getPrice() * (weights[i] - item.getUnder());
						singles.put("FREE_UNDER_7KG_OVERWEIGHT", --timesLeft);
						continue;
					} else {
						throw new RuntimeException(name + " - not in the correct range!!");
					}
				} else {
					throw new RuntimeException(name + " - can't be used more than once!!");
				}
			case "FREE_UNDER_25KG_OVERWEIGHT":
				int timesLeft2 = singles.get("FREE_UNDER_25KG_OVERWEIGHT");

				if (timesLeft2  > 0) {
					if (weights[i] >= item.getOver() && weights[i] < item.getUnder()) {
						singles.put("FREE_UNDER_25KG_OVERWEIGHT", --timesLeft2);
						continue;
					} else if (weights[i] > item.getUnder()) {
						sum += RuleNames.valueOf("OVERWEIGHT").getPrice() * (weights[i] - item.getUnder());
						singles.put("FREE_UNDER_25KG_OVERWEIGHT", --timesLeft2);
						continue;
					} else {
						throw new RuntimeException(name + " - not in the correct range!!");
					}
				} else {
					throw new RuntimeException(name + " - can't be used more than once!!");
				}
			case "FEE_UNDER_7KG":
				if (singles.get("FEE_UNDER_7KG") == USED_MANY) {
					if (weights[i] >= item.getOver() && weights[i] < item.getUnder()) {
						sum += item.getPrice();
						continue;
					} else {
						throw new RuntimeException(name + " - not in the right range 0-7kg!!");
					}
				} else {
					throw new RuntimeException(name + " - expected USED_MANY!!");
				}
			case "FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT":
				if (singles.get("FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT") == USED_MANY) {
					if (weights[i] >= item.getOver() && weights[i] < item.getUnder()) {
						sum += item.getPrice();
						continue;
					} else if (weights[i] > item.getUnder()) {
						sum += item.getPrice();
						sum += RuleNames.valueOf("OVERWEIGHT").getPrice() * (weights[i] - item.getUnder());
						continue;
					} else {
						throw new RuntimeException(name + " - not in the right range 7-?kg!!");
					}
				} else {
					throw new RuntimeException(name + " - expected USED_MANY!!");
				}
			case "OVERWEIGHT":
				throw new IllegalArgumentException(name+ " - can't use this!!");
			default:
				throw new RuntimeException("Not Implemented");
			}
		}

		return sum;
	}
}
