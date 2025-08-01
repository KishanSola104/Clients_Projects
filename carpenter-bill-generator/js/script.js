let mode = "quotation"; // Default mode

function setMode(selectedMode) {
    mode = selectedMode;
    const options = document.querySelectorAll('.capsule-toggle .toggle-option');
    options.forEach(option => option.classList.remove('active'));

    if (mode === "quotation") {
        options[0].classList.add('active');
    } else {
        options[1].classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggleOptions = document.querySelectorAll(".toggle-option");
    const billTitle = document.getElementById("billTitle");
    const billNumber = document.getElementById("billNumber");
    const itemsBody = document.getElementById("itemsBody");
    const extraWorkBody = document.getElementById("extraWorkBody");
    const totalMaterial = document.getElementById("totalMaterial");
    const totalWithLabor = document.getElementById("totalWithLabor");
    const discountInput = document.getElementById("discount");
    const laborCostInput = document.getElementById("laborCost");
    const finalPriceInput = document.getElementById("finalPrice");
    const advanceInput = document.getElementById("advance");
    const remainingAmount = document.getElementById("remaining");
    const amountInWords = document.getElementById("amountInWords");
    const customerNameInput = document.getElementById("customerName");

    /* =======================
       1. Quotation / Bill Toggle
    ======================= */
    toggleOptions.forEach(option => {
        option.addEventListener("click", () => {
            toggleOptions.forEach(o => o.classList.remove("active"));
            option.classList.add("active");
            mode = option.textContent.trim() === "બીલ" ? "bill" : "quotation";
            updateBillMode();
        });
    });

    function updateBillMode() {
        billTitle.textContent = mode === "bill"
            ? "રામદેવ વૂડ વર્ક્સ બીલ"
            : "રામદેવ વૂડ વર્ક્સ ક્વોટેશન";

        document.querySelectorAll(".bill-only").forEach(field => {
            field.style.display = mode === "bill" ? "block" : "none";
        });

        generateBillNumber();
    }

    /* =======================
       2. Auto Bill/Quotation Number
    ======================= */
    function generateBillNumber() {
        const prefix = mode === "bill" ? "BILL" : "QT";
        billNumber.value = `${prefix}-${Date.now().toString().slice(-6)}`;
    }
    generateBillNumber();

    /* =======================
       3. Add Row (Items Table)
    ======================= */
    document.querySelector(".add-row").addEventListener("click", () => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${itemsBody.children.length + 1}</td>
            <td><input type="text"></td>
            <td><input type="number" value="0" class="num-field"></td>
            <td><input type="text"></td>
            <td><input type="number" value="0" class="num-field"></td>
            <td><input type="number" value="0" class="num-field"></td>
        `;
        itemsBody.appendChild(row);
        addValidationEvents(row);
    });

    /* =======================
       4. Add Row (Extra Work)
    ======================= */
    document.querySelector(".add-extra-row").addEventListener("click", () => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${extraWorkBody.children.length + 1}</td>
            <td><input type="text"></td>
            <td><input type="number" value="0" class="num-field"></td>
        `;
        extraWorkBody.appendChild(row);
        addValidationEvents(row);
    });

   /* =======================
   5. Validations (Number Only) + Auto Calculation
======================= */
function addValidationEvents(container) {
    container.querySelectorAll(".num-field").forEach(input => {
        input.addEventListener("input", () => {
            input.value = input.value.replace(/[^0-9]/g, ""); // Only digits
            calculateTotals();
        });
        input.addEventListener("blur", calculateTotals);
    });
}

addValidationEvents(document);

[discountInput, laborCostInput, finalPriceInput, advanceInput].forEach(input => {
    input.addEventListener("input", calculateTotals);
    input.addEventListener("blur", calculateTotals);
});

/* =======================
   6. Auto Calculations (Corrected)
======================= */
function calculateTotals() {
    let materialTotal = 0;

    //  Items Table (Only Rupiya column)
    document.querySelectorAll("#itemsBody tr").forEach(row => {
        const rupiya = parseFloat(row.children[5].querySelector("input").value) || 0;
        materialTotal += rupiya;
    });

    //  Extra Work Table (Rupiya column)
    let extraWorkTotal = 0;
    document.querySelectorAll("#extraWorkBody tr").forEach(row => {
        const price = parseFloat(row.children[2].querySelector("input").value) || 0;
        extraWorkTotal += price;
    });

    //  Total Material + Extra Work
    const combinedMaterial = materialTotal + extraWorkTotal;
    totalMaterial.textContent = `₹ ${combinedMaterial.toLocaleString()}`;

    //  Add Labor cost
    const laborCost = parseFloat(laborCostInput.value) || 0;
    const discount = parseFloat(discountInput.value) || 0;

    const totalCostWithLabor = combinedMaterial + laborCost;
    totalWithLabor.textContent = `₹ ${totalCostWithLabor.toLocaleString()}`;

    // Final Price (after discount)
    const finalPrice = totalCostWithLabor - discount;
    finalPriceInput.value = finalPrice;

    //  Remaining amount
    const advance = parseFloat(advanceInput.value) || 0;
    const remaining = finalPrice - advance;
    remainingAmount.textContent = `₹ ${remaining.toLocaleString()}`;

    //  Convert remaining amount to words
    amountInWords.textContent = convertNumberToWords(remaining);
}


    /* =======================
       7. Convert Number to Gujarati Words
    ======================= */
    function convertNumberToWords(num) {
        if (num <= 0) return "શૂન્ય";

        const ones = ["", "એક", "બે", "ત્રણ", "ચાર", "પાંચ", "છ", "સાત", "આઠ", "નવ"];
        const tens = ["", "દસ", "વીસ", "ત્રીસ", "ચાલીસ", "પચાસ", "સાઠ", "સિત્તેર", "એંસી", "નેવું"];

        let words = "";

        if (num >= 1000) {
            words += Math.floor(num / 1000) + " હજાર ";
            num %= 1000;
        }
        if (num >= 100) {
            words += Math.floor(num / 100) + " સો ";
            num %= 100;
        }
        if (num >= 10) {
            words += tens[Math.floor(num / 10)] + " ";
            num %= 10;
        }
        if (num > 0) words += ones[num];

        return words.trim();
    }

    /* =======================
       8. Professional Dark Mode Button
    ======================= */
    const darkModeBtn = document.createElement("button");
    darkModeBtn.innerHTML = "🌙";
    darkModeBtn.classList.add("dark-mode-toggle");
    document.querySelector(".header").appendChild(darkModeBtn);

    darkModeBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        darkModeBtn.innerHTML = body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    /* =======================
       9. Download PDF using html2pdf.js
    ======================= */
    const pdfBtn = document.createElement("button");
    pdfBtn.textContent = "⬇️ PDF ડાઉનલોડ કરો";
    pdfBtn.classList.add("download-pdf-btn");
    document.querySelector(".main-section").appendChild(pdfBtn);

pdfBtn.addEventListener("click", () => {
    const customerName = customerNameInput.value.trim() || "Customer";
    const pdfName = `${customerName}${mode === "bill" ? "Bill" : "Quotation"}.pdf`;

    const toggleSection = document.querySelector(".capsule-toggle-btn-section");

    // Hide UI buttons temporarily
    toggleSection.style.display = "none";
    pdfBtn.style.display = "none";
    darkModeBtn.style.display = "none";

    const element = document.body;

    const opt = {
        margin: 0,
        filename: pdfName,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: document.documentElement.scrollWidth,
            windowHeight: document.documentElement.scrollHeight
        },
        jsPDF: {
            unit: 'px',       // Use pixel-based rendering
            format: [1200, 1600], // Force a larger canvas size for single page
            orientation: 'portrait'
        },
        pagebreak: { avoid: ['.header', '.main-section', '.footer-section'] }
    };

    // Generate and force single page
    html2pdf()
        .from(element)
        .set(opt)
        .toPdf()
        .get('pdf')
        .then(pdf => {
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Scale down content to fit into one page
            pdf.internal.scaleFactor = 2.5; // Compress everything to fit in one page
            pdf.save(pdfName);
        })
        .finally(() => {
            toggleSection.style.display = "flex";
            pdfBtn.style.display = "inline-block";
            darkModeBtn.style.display = "inline-block";
        });
});


    // Initial calculation
    calculateTotals();
});
