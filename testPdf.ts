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

export async function blood() {
	const pdfPath = await generatePdf(
		"blood.html", // src/templates/blood.html
		mockData,
		"blood_pact.pdf",
	);

	console.log("🩸 PDF CREATED AT:", pdfPath);
	return pdfPath;
}

blood();
