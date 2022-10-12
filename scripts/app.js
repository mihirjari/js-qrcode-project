const headerBtn = document.getElementById('to-portfolio');

headerBtn.onclick = () => {

   window.location = "https://mihir-jariwala.netlify.app/";
}

const form = document.getElementById('generate-form');
const qrcode = document.getElementById('qrcode');


const validateInputs = (e) => {

    e.preventDefault();

    clearQrCode();

    const urlInput = document.getElementById('url');
    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    
   if(!urlInput.checkValidity() || url === ''){

        alert("Please enter a valid URL");
   }else{

        showSpinner();

        setTimeout(() => {
            hideSpinner();

            generateQrCode(url, size);

            setTimeout(() => {

                const saveUrl = qrcode.querySelector('img').src;
                createSaveButton(saveUrl);

            }, 500);

        }, 1500);


   }
}

const showSpinner = () => {

    document.getElementById('spinner').style.display = 'block';
}

const hideSpinner = () => {

    document.getElementById('spinner').style.display = 'none';
}

hideSpinner();

const generateQrCode = (url, size) => {

    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    });
}


const clearQrCode = () => {
    qrcode.innerHTML = '';
    const saveBtn = document.getElementById('save-link');
    if(saveBtn){
        saveBtn.remove();
    }
}

const createSaveButton = (saveUrl) => {

    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-600 hover:bg-red-900 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    link.ariaLabel = 'Save QR code image'
    document.getElementById('generated').appendChild(link);
}


form.addEventListener('submit', validateInputs);