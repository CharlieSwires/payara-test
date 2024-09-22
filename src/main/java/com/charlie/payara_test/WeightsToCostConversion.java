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

	public static HashMap<String,Integer> singles = new HashMap<String,Integer>();
	public static List<String> selected = new ArrayList<>();
	public WeightsToCostConversion() {
		for(RuleNames item : RuleNames.values()) {
			singles.put(item.name(),item.getMany());
		}
		selected = new ArrayList<>();
	}

	public void clear() {
		for(RuleNames item : RuleNames.values()) {
			singles.put(item.name(),item.getMany());
		}
		selected = new ArrayList<>();
	}
	
	public List<String> getSelected(){
		return selected;
	}
	public Double processArrayOfWeights(Double[] weights) {
		Double sum = 0.0;
		for(int i = 0; i < weights.length; i++) {
			boolean contin = false;
			for(RuleNames item : RuleNames.values()) {
				if (contin) continue;

				switch(item.name()) {
				case "FREE_UNDER_7KG_OVERWEIGHT":
					if (singles.get("FREE_UNDER_7KG_OVERWEIGHT") > 0)
						if (weights[i] > item.getOver() && weights[i] < item.getUnder()) {
							singles.put("FREE_UNDER_7KG_OVERWEIGHT", singles.get("FREE_UNDER_7KG_OVERWEIGHT") - 1);
							selected.add(item.name());
							contin = true;
						} else if (weights[i] > item.getUnder()) {
							sum += RuleNames.valueOf("OVERWEIGHT").getPrice() * (weights[i] - item.getUnder());
							singles.put("FREE_UNDER_7KG_OVERWEIGHT", singles.get("FREE_UNDER_7KG_OVERWEIGHT") - 1);
							selected.add(item.name());
							contin = true;
						}
					break;
				case "FREE_UNDER_25KG_OVERWEIGHT":
					if (singles.get("FREE_UNDER_25KG_OVERWEIGHT")  > 0)
						if (weights[i] > item.getOver() && weights[i] < item.getUnder()) {
							singles.put("FREE_UNDER_25KG_OVERWEIGHT", singles.get("FREE_UNDER_25KG_OVERWEIGHT") - 1);
							selected.add(item.name());
							contin = true;
						} else if (weights[i] > item.getUnder()) {
							sum += RuleNames.valueOf("OVERWEIGHT").getPrice() * (weights[i] - item.getUnder());
							singles.put("FREE_UNDER_25KG_OVERWEIGHT", singles.get("FREE_UNDER_25KG_OVERWEIGHT") - 1);
							selected.add(item.name());
							contin = true;
						}
					break;
				case "FEE_UNDER_7KG":
					if (singles.get("FEE_UNDER_7KG") == USED_MANY)
						if (weights[i] > item.getOver() && weights[i] < item.getUnder()) {
							sum += item.getPrice();
							selected.add(item.name());
							contin = true;
						} 
					break;
				case "FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT":
					if (singles.get("FEE_BETWEEN_7KG_AND_25KG_OVERWEIGHT") == USED_MANY)
						if (weights[i] > item.getOver() && weights[i] < item.getUnder()) {
							sum += item.getPrice();
							selected.add(item.name());
							contin = true;
						} else if (weights[i] > item.getUnder()) {
							sum += item.getPrice();
							sum += RuleNames.valueOf("OVERWEIGHT").getPrice() * (weights[i] - item.getUnder());
							selected.add(item.name());
							contin = true;
						}
					break;
				case "OVERWEIGHT":
					break;
				default:
					throw new RuntimeException("Not Implemented");
				}
			}
		}
		return sum;
	}
}
