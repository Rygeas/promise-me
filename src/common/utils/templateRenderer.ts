import fs from "fs";
import Handlebars from "handlebars";
import path from "path";
import { handlebarsHelpers } from "./handlebarsHelpers";

// Register all shared helpers
Object.entries(handlebarsHelpers).forEach(([name, helper]) => {
	Handlebars.registerHelper(name, helper);
});

export function renderTemplate(templateFile: string, data: any): string {
	const filePath = path.join(process.cwd(), "src", "templates", templateFile);
	const source = fs.readFileSync(filePath, "utf-8");
	const compiled = Handlebars.compile(source);
	return compiled(data);
}
