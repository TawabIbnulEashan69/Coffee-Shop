document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    alert('Processing payment...');
    setTimeout(() => {
        alert('Payment succeeded!');

        localStorage.removeItem('myShopArr');


        window.location.href = 'index.html';
    }, 2000);
});


document.getElementById('card-number').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
    e.target.value = formattedValue;
});