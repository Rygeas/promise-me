import { Router } from "express";
import { beautyMockData, bloodMockData, medievalMockData } from "./mockData";

const previewRouter = Router();

interface TemplateData {
	title: string;
	description: string;
	participants: Array<{ name: string }>;
	conditions: Array<{ title: string; description: string }>;
	startAt: string;
	dueAt: string;
}

// Mock Data for Templates
const templatesMockData: Record<string, TemplateData> = {
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

	// Build the base URL from the request
	const protocol = req.protocol || "http";
	const host = req.get("host") || "localhost:3000";
	const baseUrl = `${protocol}://${host}`;

	// Add baseUrl directly to template data
	const templateData = {
		...data,
		baseUrl,
	};

	res.render(name, templateData);
});

export { previewRouter };
