import puppeteer from "puppeteer";
import { renderTemplate } from "./templateRenderer";

interface PdfGenerationOptions {
	marginTop?: string;
	marginBottom?: string;
	marginLeft?: string;
	marginRight?: string;
	scale?: number;
}

export async function generatePdf(
	templateFile: string,
	data: unknown,
	outputPath: string,
	options: PdfGenerationOptions = {},
): Promise<string> {
	const html = renderTemplate(templateFile, data);

	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();

	// Set viewport for proper text wrapping
	await page.setViewport({
		width: 794, // A4 width in pixels at 96 DPI
		height: 1123, // A4 height in pixels at 96 DPI
	});

	await page.setContent(html, { waitUntil: "networkidle0" });

	await page.pdf({
		path: outputPath,
		format: "A4",
		printBackground: true,
		margin: {
			top: options.marginTop || "0mm",
			bottom: options.marginBottom || "0mm",
			left: options.marginLeft || "0mm",
			right: options.marginRight || "0mm",
		},
		scale: options.scale || 1,
	});

	await browser.close();

	return outputPath;
}
