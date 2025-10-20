interface HelperOptions {
	fn(context: unknown): string;
	inverse(context: unknown): string;
}

interface ChunkData {
	items: unknown[];
	isFirst: boolean;
	isLast: boolean;
}

export const handlebarsHelpers = {
	chunk: (array: unknown[] | null, size: number, options: HelperOptions): string => {
		if (!Array.isArray(array) || size <= 0) {
			return "";
		}

		const chunks: ChunkData[] = [];
		for (let i = 0; i < array.length; i += size) {
			chunks.push({
				items: array.slice(i, i + size),
				isFirst: chunks.length === 0,
				isLast: Math.ceil(array.length / size) === chunks.length + 1,
			});
		}

		return chunks.map((chunk) => options.fn(chunk)).join("");
	},

	if: function (this: unknown, conditional: unknown, options: HelperOptions): string {
		if (conditional) {
			return options.fn(this);
		}
		return options.inverse(this);
	},

	isFirst: function (this: ChunkData): boolean {
		return this.isFirst;
	},

	isLast: function (this: ChunkData): boolean {
		return this.isLast;
	},
};
