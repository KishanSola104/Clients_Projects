// Default mode is set to 'quotation'
let mode = "quotation";

// Function to switch between Bill and Quotation modes
function setMode(selectedMode) {
    mode = selectedMode;

    // Remove 'active' class from all toggle options
    const options = document.querySelectorAll('.capsule-toggle .toggle-option');
    options.forEach(option => option.classList.remove('active'));

    // Highlight the selected option
    if (mode === "quotation") options[0].classList.add('active');
    else options[1].classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggleOptions = document.querySelectorAll(".toggle-option");

    // Bill/Quotation header elements
    const billTitle = document.getElementById("billTitle");
    const billNumber = document.getElementById("billNumber");
    const totalMaterial = document.getElementById("totalMaterial");
    const totalWithLabor = document.getElementById("totalWithLabor");
    const discountInput = document.getElementById("discount");
    const laborCostInput = document.getElementById("laborCost");
    const finalPriceInput = document.getElementById("finalPrice");
    const advanceInput = document.getElementById("advance");
    const remainingAmount = document.getElementById("remaining");
    const amountInWords = document.getElementById("amountInWords");
    const customerNameInput = document.getElementById("customerName");

    let manualFinalPrice = false; // Track if final price is updated manually

    // =========================
    // TOGGLE BETWEEN BILL/QUOTATION
    // =========================
    toggleOptions.forEach(option => {
        option.addEventListener("click", () => {
            toggleOptions.forEach(o => o.classList.remove("active")); // Remove active state from all
            option.classList.add("active"); // Add active state to clicked option
            mode = option.textContent.trim() === "બીલ" ? "bill" : "quotation";
            updateBillMode();
        });
    });

    // Update UI based on the selected mode
    function updateBillMode() {
        billTitle.textContent = mode === "bill" ? "રામદેવ વૂડ વર્ક્સ બીલ" : "રામદેવ વૂડ વર્ક્સ ક્વોટેશન";

        // Show or hide fields that are only for "bill"
        document.querySelectorAll(".bill-only").forEach(field => {
            field.style.display = mode === "bill" ? "block" : "none";
        });

        generateBillNumber(); // Update bill number when mode changes
        calculateTotals();    // Recalculate totals
    }

    // Generate a unique bill/quotation number based on current timestamp
    function generateBillNumber() {
        const prefix = mode === "bill" ? "BILL" : "QT";
        billNumber.value = `${prefix}-${Date.now().toString().slice(-6)}`;
    }
    generateBillNumber(); // Initial call

    // =========================
    // ADD NEW ROWS IN TABLE
    // =========================

    // Add new item row
    document.querySelector(".add-row").addEventListener("click", () => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${document.querySelectorAll("#itemsBody tr").length + 1}</td>
            <td><input type="text"></td>
            <td><input type="number" value="0" class="num-field"></td>
            <td><input type="text"></td>
            <td><input type="number" value="0" class="num-field"></td>
            <td><input type="number" value="0" class="num-field"></td>`;
        document.getElementById("itemsBody").appendChild(row);
        addValidationEvents(row); // Add input validation for new row
    });

    // Add new extra work row
    document.querySelector(".add-extra-row").addEventListener("click", () => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${document.querySelectorAll("#extraWorkBody tr").length + 1}</td>
            <td><input type="text"></td>
            <td><input type="number" value="0" class="num-field"></td>`;
        document.getElementById("extraWorkBody").appendChild(row);
        addValidationEvents(row);
    });

    // =========================
    // VALIDATION FOR NUMERIC FIELDS
    // =========================
    function addValidationEvents(container) {
        container.querySelectorAll(".num-field").forEach(input => {
            input.addEventListener("input", () => {
                input.value = input.value.replace(/[^0-9]/g, ""); // Allow only numbers
                calculateTotals();
            });
            input.addEventListener("blur", calculateTotals); // Recalculate on blur
        });
    }
    addValidationEvents(document); // Initial call for existing rows

    // Recalculate totals when discount, labor, or advance changes
    [discountInput, laborCostInput, advanceInput].forEach(input => {
        input.addEventListener("input", calculateTotals);
        input.addEventListener("blur", calculateTotals);
    });

    // If final price is entered manually, lock it
    finalPriceInput.addEventListener("input", () => {
        manualFinalPrice = true;
        calculateTotals();
    });

    // =========================
    // CALCULATE TOTALS
    // =========================
    function calculateTotals() {
        let materialTotal = 0;
        let extraWorkTotal = 0;

        // Calculate material total from table rows
        document.querySelectorAll("#itemsBody tr").forEach(row => {
            const rupiya = parseFloat(row.children[5].querySelector("input").value) || 0;
            materialTotal += rupiya;
        });
        document.getElementById("itemsTotalCost").textContent = `₹ ${materialTotal.toLocaleString()}`;

        // Calculate extra work total
        document.querySelectorAll("#extraWorkBody tr").forEach(row => {
            const price = parseFloat(row.children[2].querySelector("input").value) || 0;
            extraWorkTotal += price;
        });
        document.getElementById("extraWorkTotalCost").textContent = `₹ ${extraWorkTotal.toLocaleString()}`;

        // Combined total (material + extra work)
        const combinedMaterial = materialTotal + extraWorkTotal;
        totalMaterial.textContent = `₹ ${combinedMaterial.toLocaleString()}`;

        // Add labor cost and discount
        const laborCost = parseFloat(laborCostInput.value) || 0;
        const discount = parseFloat(discountInput.value) || 0;

        const totalCostWithLabor = combinedMaterial + laborCost;
        totalWithLabor.textContent = `₹ ${totalCostWithLabor.toLocaleString()}`;

        // If final price is not manually set, update it
        if (!manualFinalPrice || finalPriceInput.value === "" || finalPriceInput.value === "0") {
            finalPriceInput.value = totalCostWithLabor - discount;
            manualFinalPrice = false;
        }

        // Calculate remaining amount after advance payment
        const advance = parseFloat(advanceInput.value) || 0;
        const remaining = (parseFloat(finalPriceInput.value) || 0) - advance;
        remainingAmount.textContent = `₹ ${remaining.toLocaleString()}`;

        // Convert remaining amount to words (Gujarati)
        amountInWords.textContent = convertNumberToWords(remaining);
    }

    // Convert number to words (Gujarati basic format)
    function convertNumberToWords(num) {
        if (num <= 0) return "શૂન્ય";
        const ones = ["", "એક", "બે", "ત્રણ", "ચાર", "પાંચ", "છ", "સાત", "આઠ", "નવ"];
        const tens = ["", "દસ", "વીસ", "ત્રીસ", "ચાલીસ", "પચાસ", "સાઠ", "સિત્તેર", "એંસી", "નેવું"];
        let words = "";
        if (num >= 1000) { words += Math.floor(num / 1000) + " હજાર "; num %= 1000; }
        if (num >= 100) { words += Math.floor(num / 100) + " સો "; num %= 100; }
        if (num >= 10) { words += tens[Math.floor(num / 10)] + " "; num %= 10; }
        if (num > 0) words += ones[num];
        return words.trim();
    }

    // =========================
    // DARK MODE TOGGLE BUTTON
    // =========================
    const darkModeBtn = document.createElement("button");
    darkModeBtn.innerHTML = "🌙";
    darkModeBtn.classList.add("dark-mode-toggle");
    document.querySelector(".header").appendChild(darkModeBtn);

    darkModeBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        darkModeBtn.innerHTML = body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    // =========================
    // PDF DOWNLOAD BUTTON
    // =========================
    const pdfBtn = document.createElement("button");
    pdfBtn.textContent = "⬇️ PDF ડાઉનલોડ કરો";
    pdfBtn.classList.add("download-pdf-btn");
    document.querySelector(".main-section").appendChild(pdfBtn);

    pdfBtn.addEventListener("click", () => {
        const customerName = (customerNameInput.value.trim() || "Customer").replace(/\s+/g, "_");
        const pdfName = `${customerName}_${mode === "bill" ? "Bill" : "Quotation"}.pdf`;

        // Temporarily hide unnecessary UI for PDF export
        const toggleSection = document.querySelector(".capsule-toggle-btn-section");
        toggleSection.style.display = "none";
        pdfBtn.style.display = "none";
        darkModeBtn.style.display = "none";

        const element = document.body;
        const opt = {
            margin: 0,
            filename: pdfName,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0, windowWidth: document.documentElement.scrollWidth, windowHeight: document.documentElement.scrollHeight },
            jsPDF: { unit: 'px', format: [1200, 1600], orientation: 'portrait' },
            pagebreak: { avoid: ['.header', '.main-section', '.footer-section'] }
        };

        // Generate and download PDF
        html2pdf()
            .from(element)
            .set(opt)
            .save()
            .finally(() => {
                // Restore UI elements after PDF generation
                toggleSection.style.display = "flex";
                pdfBtn.style.display = "inline-block";
                darkModeBtn.style.display = "inline-block";
            });
    });

    // Initial total calculation
    calculateTotals();
});
