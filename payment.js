const ccInput = document.getElementById('credit-card-number');
if (ccInput) {
  ccInput.setAttribute('maxlength', '19');
  ccInput.addEventListener('input', function (e) {
    let value = ccInput.value.replace(/\D/g, '').slice(0, 16);
    let formatted = '';
    for (let i = 0; i < value.length; i += 4) {
      if (i > 0) formatted += ' ';
      formatted += value.substring(i, i + 4);
    }
    ccInput.value = formatted;
  });
}

const form = document.getElementById('payment-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Processing payment');
    setTimeout(function () {
      alert('Payment successful');
      window.location.href = 'index.html';
    }, 2000);
  });
}