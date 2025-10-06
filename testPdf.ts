import { generatePdf } from "./src/common/utils/pdfGenarator";

export async function main() {
	const pdfPath = await generatePdf(
		"rome.html", // src/templates/rome.html
		{
			title: "SPQR",
			description: "DECREE OF THE SENATE",
			participants: [
				{ side: { title: "MARCUS AURELIUS" }, status: "ACCEPTED" },
				{ side: { title: "GAIUS CASSIUS" }, status: "ACCEPTED" },
			],
			conditions: [
				{
					title: "I.",
					description:
						"BOTH PARTIES SHALL MAINTAIN UNWAVERING LOYALTY TO THE REPUBLIC OF ROME UNTIL THE KALENDS OF NOVEMBER.",
				},
				{ title: "II.", description: "NO LEGION SHALL MARCH BEYOND THE SACRED TIBER RIVER WITHOUT SENATE APPROVAL." },
				{
					title: "III.",
					description:
						"ALL TRIBUTES AND TAXES SHALL BE PAID IN FULL BEFORE THE IDES OF OCTOBER, WITH PENALTIES FOR DELAY.",
				},
				{
					title: "IV.",
					description:
						"ANY DISPUTES SHALL BE RESOLVED BY THE PRAETOR URBANUS UNDER ROMAN LAW, WITH DECISIONS BINDING UPON ALL PARTIES.",
				},
				{
					title: "V.",
					description:
						"THIS DECREE SHALL BE INSCRIBED IN BRONZE AND DISPLAYED IN THE FORUM ROMANUM FOR ALL CITIZENS TO WITNESS.",
				},
				{
					title: "VI.",
					description:
						"ALL MILITARY COMMANDERS SHALL SUBMIT MONTHLY REPORTS OF EXPENDITURES AND MOVEMENTS TO THE SENATE.",
				},
				{
					title: "VII.",
					description:
						"IN CASE OF EXTERNAL THREATS, ALL SIGNATORIES SHALL IMMEDIATELY MOBILIZE FORCES AND COORDINATE DEFENSE STRATEGIES.",
				},
				{
					title: "VIII.",
					description:
						"ALL RELIGIOUS CEREMONIES SHALL BE CONDUCTED ACCORDING TO ROMAN TRADITION, UNDER THE PONTIFEX MAXIMUS.",
				},
				{
					title: "IX.",
					description:
						"THIS AGREEMENT SHALL BE RENEWED ANNUALLY ON THE KALENDS OF JANUARY, REQUIRING FULL RECOMMITMENT BY ALL PARTIES.",
				},
				{
					title: "X.",
					description:
						"VIOLATION OF ANY TERM SHALL RESULT IN EXPULSION FROM THE SENATE, LOSS OF CITIZENSHIP, AND CONFISCATION OF PROPERTY.",
				},
			],
			startAt: "2025-10-01",
			dueAt: "2025-10-31",
		},
		"output.pdf",
	);

	console.log("✅ PDF CREATED AT:", pdfPath);
}

export async function blood() {
	const pdfPath = await generatePdf(
		"blood.html", // src/templates/blood.html
		{
			title: "Pactum Pactorum",
			description: "Foedus aeternum inter animam et Diabolum",
			participants: [
				{ side: { title: "Homo Mortalis" }, role: "Anima" },
				{ side: { title: "Princeps Tenebrarum" }, role: "Diabolus" },
			],
			conditions: [
				{
					title: "Sacramentum Sanguinis",
					description: "The mortal shall seal this pact with his own blood, binding soul and body alike.",
				},
				{
					title: "Donum Tenebrarum",
					description: "The Prince of Darkness shall grant forbidden knowledge, wealth, and power beyond mortal reach.",
				},
				{
					title: "Tempus Pactum",
					description: "This agreement shall endure forty years, unless broken by divine intervention.",
				},
				{
					title: "Exitium Animae",
					description: "Upon conclusion, the soul shall descend into the abyss without hope of release.",
				},
				{
					title: "Sigillum Aeternum",
					description: "This contract is sanctified in blood and shadow, irrevocable by mortal hand.",
				},
			],
			latinHeader: "In Nomine Tenebrarum",
			footerLatin: "Ex auctoritate Principis Inferni",
			footerNote: "Scriptum et signatum nocte obscura sub sigillo sanguinis.",
			startAt: "2025-10-04",
			dueAt: "2065-10-04",
		},
		"blood_pact.pdf",
	);

	console.log("🩸 PDF CREATED AT:", pdfPath);
	return pdfPath;
}
