/**
 * Utility functions for measuring and calculating text content
 * for A4 page sizing and pagination
 */

// A4 dimensions in mm
const A4_HEIGHT_MM = 297;
const PADDING_MM = 15;

// Usable content area
const USABLE_HEIGHT_MM = A4_HEIGHT_MM - 2 * PADDING_MM; // 267mm

// Font metrics (approximate)
// These values vary by font, so they're estimates
const FONT_METRICS = {
	sm: { charsPerLine: 100, linesPerMM: 3 },
	base: { charsPerLine: 80, linesPerMM: 2.5 },
	lg: { charsPerLine: 60, linesPerMM: 2 },
	xl: { charsPerLine: 50, linesPerMM: 1.5 },
};

interface TextMeasurementConfig {
	fontSize?: "sm" | "base" | "lg" | "xl";
	lineHeight?: number;
	contentMarginMM?: number;
}

/**
 * Estima o número de linhas que um texto ocupará
 */
export function estimateTextLines(text: string, fontSize: "sm" | "base" | "lg" | "xl" = "base"): number {
	const metrics = FONT_METRICS[fontSize];
	const lines = Math.ceil(text.length / metrics.charsPerLine);
	return lines;
}

/**
 * Estima a altura em MM que um texto ocupará
 */
export function estimateTextHeightMM(text: string, fontSize: "sm" | "base" | "lg" | "xl" = "base"): number {
	const metrics = FONT_METRICS[fontSize];
	const lines = estimateTextLines(text, fontSize);
	const heightMM = lines / metrics.linesPerMM;
	return heightMM;
}

/**
 * Verifica se um texto cabe em uma linha
 */
export function fitsInLine(text: string, fontSize: "sm" | "base" | "lg" | "xl" = "base"): boolean {
	const metrics = FONT_METRICS[fontSize];
	return text.length <= metrics.charsPerLine;
}

/**
 * Verifica se um conteúdo total cabe em uma página
 */
export function fitsInPage(
	content: string,
	config: TextMeasurementConfig = {},
): { fits: boolean; heightMM: number; capacityPercentage: number } {
	const fontSize = config.fontSize || "base";
	const contentMarginMM = config.contentMarginMM || 2;
	const availableHeightMM = USABLE_HEIGHT_MM - contentMarginMM;

	const heightMM = estimateTextHeightMM(content, fontSize);
	const fits = heightMM <= availableHeightMM;
	const capacityPercentage = (heightMM / availableHeightMM) * 100;

	return {
		fits,
		heightMM,
		capacityPercentage,
	};
}

/**
 * Divide um texto em pedaços que cabem em páginas A4
 */
export function splitTextIntoPages(text: string, config: TextMeasurementConfig = {}): string[] {
	const fontSize = config.fontSize || "base";
	const contentMarginMM = config.contentMarginMM || 2;
	const availableHeightMM = USABLE_HEIGHT_MM - contentMarginMM;

	const metrics = FONT_METRICS[fontSize];
	const linesPerPage = Math.floor(availableHeightMM * metrics.linesPerMM);
	const charsPerPage = linesPerPage * metrics.charsPerLine;

	const pages: string[] = [];
	let remaining = text;

	while (remaining.length > 0) {
		const chunk = remaining.substring(0, charsPerPage);
		pages.push(chunk);
		remaining = remaining.substring(charsPerPage);
	}

	return pages;
}

/**
 * Divide array de items em páginas baseado em tamanho total
 */
export function distributeItemsAcrossPages<T>(
	items: T[],
	getItemSize: (item: T) => number,
	config: TextMeasurementConfig = {},
): T[][] {
	const fontSize = config.fontSize || "base";
	const contentMarginMM = config.contentMarginMM || 2;
	const availableHeightMM = USABLE_HEIGHT_MM - contentMarginMM;

	const metrics = FONT_METRICS[fontSize];
	const maxCharsPerPage = Math.floor(availableHeightMM * metrics.linesPerMM * metrics.charsPerLine);

	const pages: T[][] = [];
	let currentPage: T[] = [];
	let currentPageSize = 0;

	items.forEach((item) => {
		const itemSize = getItemSize(item);

		// Se adicionando este item excede a capacidade da página
		if (currentPageSize + itemSize > maxCharsPerPage && currentPage.length > 0) {
			pages.push(currentPage);
			currentPage = [];
			currentPageSize = 0;
		}

		currentPage.push(item);
		currentPageSize += itemSize;
	});

	// Adiciona última página se tiver itens
	if (currentPage.length > 0) {
		pages.push(currentPage);
	}

	return pages;
}

/**
 * Calcula estatísticas sobre o conteúdo
 */
export function analyzeContent(content: string) {
	return {
		charCount: content.length,
		wordCount: content.split(/\s+/).length,
		lineCount: content.split("\n").length,
		avgCharsPerLine: Math.round(content.length / content.split("\n").length),
	};
}

/**
 * Formata tamanho de arquivo para display
 */
export function formatContentSize(bytes: number): string {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / k ** i).toFixed(2)) + " " + sizes[i];
}
