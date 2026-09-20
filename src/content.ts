export const NAV = [
  { label: "Process", href: "#process" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Proof", href: "#proof" },
  { label: "Principles", href: "#principles" },
  { label: "Contact", href: "#contact" },
];

export const CONTACT_PRIMARY = "mustafasagheer.business@gmail.com";
export const CONTACT_SECONDARY = "daftrify.services@gmail.com";
export const MAILTO = `mailto:${CONTACT_PRIMARY}?subject=${encodeURIComponent(
  "DAFTRIFY — Start a Review"
)}&body=${encodeURIComponent(
  "Briefly describe the document-heavy workflow you would like reviewed:\n\n"
)}`;

export const PROBLEMS = [
  "Information spread across multiple files",
  "Inconsistent names, dates, numbers, or other fields",
  "Repetitive manual extraction",
  "Unstructured information",
  "Missing or incomplete supporting documents",
  "Difficult cross-document comparison",
  "Exceptions that are easy to overlook",
  "Unclear evidence or document gaps",
  "Time-consuming preparation and packaging",
];

export const CAPABILITIES = [
  { n: "01", title: "Extract", body: "Turn information contained in documents into structured working data." },
  { n: "02", title: "Organize", body: "Bring source documents and extracted information into a clear working structure." },
  { n: "03", title: "Normalize", body: "Standardize relevant fields and formats so records can be compared consistently." },
  { n: "04", title: "Compare / Reconcile", body: "Cross-check information across records and identify differences or inconsistencies." },
  { n: "05", title: "Flag", body: "Make exceptions, missing information, and areas requiring attention visible." },
  { n: "06", title: "Review Gaps", body: "Identify missing, incomplete, or unsupported documentation where applicable." },
  { n: "07", title: "Human Verify", body: "Review important findings against the source record before delivery." },
  { n: "08", title: "Package", body: "Return a clearer, structured output that is ready for the client's next workflow stage." },
];

export const PROCESS = [
  { step: "Collect", body: "Gather the documents and records required for the requested workflow." },
  { step: "Extract", body: "Identify and structure relevant information from the source material." },
  { step: "Organize", body: "Arrange documents and extracted information into a usable working structure." },
  { step: "Normalize", body: "Standardize information where necessary for reliable comparison." },
  { step: "Reconcile", body: "Compare records and identify inconsistencies or mismatches." },
  { step: "Flag", body: "Surface exceptions, missing information, or items requiring attention." },
  { step: "Human Verify", body: "Check important findings against the underlying source record." },
  { step: "Package", body: "Present the reviewed output in a clear, organized form for the next stage." },
];

export const WORK_TYPES = [
  "Document extraction and structuring",
  "Document comparison",
  "Data and document reconciliation",
  "Document consistency review",
  "Evidence / document gap analysis",
  "Pre-submission document review",
  "Dossier organization and packaging",
  "Custom document-operation workflows",
];

export const FITS = [
  "extracted",
  "structured",
  "compared",
  "reconciled",
  "checked for consistency",
  "reviewed for gaps",
  "organized",
  "packaged",
];

export const PRINCIPLES = [
  { title: "Source first", body: "The source record comes before assumptions." },
  { title: "Exceptions are visible", body: "Differences and unresolved items should be surfaced, not hidden." },
  { title: "Verify against the record", body: "Important findings are checked against the underlying document or source." },
  { title: "No invented facts", body: "Missing information is not filled with guesses." },
  { title: "No fake proof", body: "Simulated work is clearly labeled and never presented as client history." },
  { title: "Output should be clearer than input", body: "The final working package should make the document situation easier to understand and act on." },
];

// Examples of where document-heavy work appears — not industry positioning.
export const NICHES = [
  "Immigration & visa document packages",
  "Legal case files & disclosure bundles",
  "Accounting, audit & tax records",
  "Banking & loan application files",
  "Insurance & medical claims files",
  "Real-estate & property transactions",
  "Corporate filings & registrations",
  "HR, payroll & employee records",
  "Procurement, tenders & contracts",
  "Education & credential files",
  "Logistics, customs & trade documents",
  "Grants, NGO & compliance reporting",
];

