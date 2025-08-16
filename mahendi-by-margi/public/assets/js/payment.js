document.addEventListener("DOMContentLoaded", () => {
  const payNowBtn = document.getElementById("payNowBtn");
  const cancelBookingBtn = document.getElementById("cancelBookingBtn");
  const paymentOptions = document.querySelectorAll('input[name="payment"]');

   let lastSelected = null;

    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener("click", function () {
            if (lastSelected === this) {
                this.checked = false;
                lastSelected = null;
                document.getElementById("payNowBtn").disabled = true; 
            } else {
                lastSelected = this;
                document.getElementById("payNowBtn").disabled = false; 
            }
        });
    });

  payNowBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="payment"]:checked').value;
    alert(`Processing ₹500 payment via ${selectedOption}...`);
    // TODO: Call backend API for payment
  });

  cancelBookingBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
