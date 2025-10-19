import fs from "fs";
import Handlebars from "handlebars";
import path from "path";

// Register chunk helper to split arrays into chunks
Handlebars.registerHelper("chunk", (array: any[], size: number, options: any) => {
	if (!Array.isArray(array) || size <= 0) {
		return "";
	}

	const chunks = [];
	for (let i = 0; i < array.length; i += size) {
		chunks.push({
			items: array.slice(i, i + size),
			isFirst: chunks.length === 0,
			isLast: Math.ceil(array.length / size) === chunks.length + 1,
		});
	}

	return chunks.map((chunk) => options.fn(chunk)).join("");
});

export function renderTemplate(templateFile: string, data: any): string {
	const filePath = path.join(process.cwd(), "src", "templates", templateFile);
	const source = fs.readFileSync(filePath, "utf-8");
	const compiled = Handlebars.compile(source);
	return compiled(data);
}
