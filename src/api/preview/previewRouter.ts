import { Router } from "express";
import { beautyMockData, bloodMockData, medievalMockData } from "./mockData";

const previewRouter = Router();

// Mock Data for Templates
const templatesMockData: Record<string, any> = {
	blood: bloodMockData,
	beauty: beautyMockData,
	medieval: medievalMockData,
	allBorder: beautyMockData,
	free: medievalMockData,
};

// Dynamic Template Preview Route
previewRouter.get("/:name", (req, res) => {
	const { name } = req.params;
	const data = templatesMockData[name];

	if (!data) {
		return res.status(404).json({
			error: `Template '${name}' not found. Available: ${Object.keys(templatesMockData).join(", ")}`,
		});
	}

	res.render(name, data);
});

export { previewRouter };
