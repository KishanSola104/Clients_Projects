 Ramdev Wood Works – Quotation & Bill Generator
A professional Quotation and Bill Generator web application built for Ramdev Wood Works, designed to create neat, auto-calculated bills or quotations in Gujarati. The application supports dark mode, real-time cost calculations, and PDF export (with customer-specific file names).

 Features
 Bill & Quotation
Toggle between Quotation and Bill modes.

Auto-generated unique bill/quotation numbers.

Automatically updates title and form fields based on mode.

 Dynamic Cost Calculation
Real-time calculation of:

Items cost (from "રૂપિયા" column).

Extra Work cost (second table).

Labor charges.

Discounts.

Advance & Remaining amount.

Final amount also converted into Gujarati words.

 Input Validations
Only numeric values allowed in cost fields.

Auto-calculation triggered on blur events.

 Signature Section
Customer signature pad and owner signature included.

 Dark Mode
Professional dark/light mode toggle with a modern icon.

 PDF Export
Generate single-page PDFs (compressed) including header, tables, and footer.

File downloaded with dynamic name:

Example: KishanQuotation.pdf or MehulBill.pdf

Hide UI buttons (toggle & PDF button) in PDF output.

 Tech Stack
Technology	Purpose
HTML5	Page structure
CSS3	Styling (light & dark mode)
JavaScript	Dynamic calculations, validations, and PDF export
html2pdf.js	PDF generation
Google Fonts	Gujarati font (Noto Sans Gujarati)