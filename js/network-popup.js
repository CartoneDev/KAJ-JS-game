function showNetworkErrorPopup() {
    var popup = document.createElement('div');
    popup.textContent = 'Отключено от сети';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.background = '#fff';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    popup.setAttribute('id', 'network-error-popup'); // id
    document.body.appendChild(popup);
}


function hideNetworkErrorPopup() {
    var popup = document.getElementById('network-error-popup');
    if (popup) {
        document.body.removeChild(popup);
    }
}


function checkNetworkStatus() {
    console.log('checkNetworkStatus');
    if (!navigator.onLine) {
        showNetworkErrorPopup();
    } else {
        hideNetworkErrorPopup();
    }
}

window.addEventListener('load', checkNetworkStatus);

window.addEventListener('online', checkNetworkStatus);
window.addEventListener('offline', checkNetworkStatus);

window.addEventListener('offline', function() {
    console.log('offline');
});
