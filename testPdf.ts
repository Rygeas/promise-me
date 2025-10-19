import { generatePdf } from "./src/common/utils/pdfGenarator";

const mockData = {
	title: "Blood Covenant",
	description:
		"This blood covenant is a sacred oath and commitment made between two parties. Each party shall be bound to this covenant unto death.",
	participants: [{ name: "Satan" }, { name: "Lucifer" }],
	conditions: [
		{
			title: "Blood Debt",
			description: "The covenant holder shall serve the other party with eternal loyalty and obedience.",
		},
		{
			title: "Soul Bond",
			description: "The spiritual bond established between the two parties cannot be severed by any force.",
		},
		{
			title: "Night's Punishment",
			description: "Those who break this covenant shall be condemned to eternal darkness.",
		},
		{
			title: "Witness of Blood",
			description: "This covenant is witnessed and sealed by the forces of darkness.",
		},
		{
			title: "Eternal Servitude",
			description: "The bearer of this covenant shall serve in perpetuity without reprieve or mercy.",
		},
		{
			title: "Binding of Names",
			description: "Both parties' names are eternally bound in the Book of Shadows, never to be forgotten.",
		},
		{
			title: "Forbidden Knowledge",
			description: "All secrets shared within this covenant must be guarded with unwavering silence.",
		},
		{
			title: "Price of Betrayal",
			description: "Any violation of this covenant shall result in the forfeiture of the violator's mortal soul.",
		},
		{
			title: "Renewal Ceremony",
			description: "This covenant shall be renewed every seven years on the anniversary of its sealing.",
		},
		{
			title: "Descendant Clause",
			description:
				"The obligations of this covenant shall pass to the descendants of both parties for seven generations.",
		},
		{
			title: "Powers Granted",
			description: "In exchange for loyalty, both parties shall receive mysterious and supernatural abilities.",
		},
		{
			title: "Protection of the Pact",
			description: "Any external force attempting to break this covenant shall be met with divine retribution.",
		},
		{
			title: "Communion of Blood",
			description: "The parties shall partake in a ritual exchange of blood to seal this pact eternally.",
		},
		{
			title: "Silence of the Grave",
			description: "Neither party shall speak of this covenant to any living soul upon penalty of death.",
		},
		{
			title: "Final Reckoning",
			description: "Upon the death of both parties, their souls shall be bound together for all eternity.",
		},
	],
	startAt: "2025-10-17",
	dueAt: "3000-12-31",
};

const beautyMockData = {
	title: "Promise of Beauty",
	description:
		"This solemn agreement binds two souls in a commitment to cherish beauty, grace, and elegance in all endeavors.",
	participants: [
		{ name: "Sophia" },
		{ name: "Aurora" },
		{ name: "Emma" },
		{ name: "Lily" },
		{ name: "Grace" },
		{ name: "Olivia" },
		{ name: "Isabella" },
		{ name: "Charlotte" },
	],
	conditions: [
		{
			title: "Grace and Elegance",
			description: "Both parties shall embody grace and elegance in their daily pursuits and interactions.",
		},
		{
			title: "Artistic Harmony",
			description: "A shared appreciation for art, music, and cultural expression shall define this partnership.",
		},
		{
			title: "Inner Radiance",
			description: "Both parties commit to cultivating inner radiance and emotional authenticity.",
		},
		{
			title: "Mutual Support",
			description: "Unwavering support and encouragement shall be provided through all seasons of life.",
		},
		{
			title: "Timeless Bond",
			description: "This bond transcends time and shall remain eternal and unbreakable.",
		},
		{
			title: "Growth Together",
			description: "Both parties commit to personal growth and inspiring one another to reach new heights.",
		},
		{
			title: "Celebration of Moments",
			description: "Every precious moment shared shall be celebrated and treasured forever.",
		},
		{
			title: "Truth and Honesty",
			description: "All communication shall be rooted in truth, honesty, and compassionate understanding.",
		},
	],
	startAt: "2025-10-18",
	dueAt: "2099-12-31",
};

export async function blood() {
	const pdfPath = await generatePdf(
		"blood.html", // src/templates/blood.html
		mockData,
		"blood_pact.pdf",
	);

	console.log("🩸 PDF CREATED AT:", pdfPath);
	return pdfPath;
}

export async function beauty() {
	const pdfPath = await generatePdf(
		"beauty.html", // src/templates/beauty.html
		beautyMockData,
		"beauty_promise.pdf",
	);

	console.log("✨ PDF CREATED AT:", pdfPath);
	return pdfPath;
}

beauty();
blood();
