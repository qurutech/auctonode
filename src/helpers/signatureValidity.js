const sg = require('@waves/signature-generator');
const crypto = sg.utils.crypto;
const StringWithLength = sg.StringWithLength;
const generate = sg.generate;
const base58 = sg.libs.base58;


export const validate = {
    addressValidate,
    authValidate
};
const generator = new generate([
    new StringWithLength('prefix'),
    new StringWithLength('host'),
    new StringWithLength('data')
]);

function authValidate(data, sign, publicKey) {
    const prefix = 'WavesWalletAuthentication';

    const byteGen = new generator({
    prefix: prefix,
    host: data.host,
    data : data.data,
    });

    return byteGen.getBytes()
    .then(
        function (bytes) {
        return crypto.isValidSignature(bytes, sign, publicKey)
        });
}

function addressValidate(publicKey, address) {
    var publicKeyBytes = base58.decode(publicKey);
    var addressFromPublicKey = crypto.buildRawAddress(publicKeyBytes);

    return (addressFromPublicKey == address);
}

// //Signed data from example link
// var signedData = {
//     host: 'example.com',
//     data: '0123456789abc'
// };

// var realSignature = '2w7QKSkxKEUwCVhx2VGrt5YiYVtAdoBZ8KQcxuNjGfN6n4fi1bn7PfPTnmdygZ6d87WhSXF1B9hW2pSmP7HucVbh';
// var publicKey = '2M25DqL2W4rGFLCFadgATboS8EPqyWAN3DjH12AH5Kdr';
// var address = '3PCAB4sHXgvtu5NPoen6EXR5yaNbvsEA8Fj';

// //Check returned address and address from public key
// var addressValidation = addressValidate(publicKey, address);
// console.log('Address validation: ' + addressValidation + '\n');

// //Example with real signature
// let signatureCheck = authValidate(signedData, realSignature, publicKey);

// signatureCheck.then(function(result) {
//     console.log('Host: ' + signedData.host);
//     console.log('Data: ' + signedData.data);
//     console.log('Public key: ' + publicKey);
//     console.log('Address: ' + address);
//     console.log('Real signature: ' + realSignature)
//     console.log('Real signature check: ' + result + '\n')
// })

// //Example with fake signature
// var fakeSignature = '29qWReHU9RXrQdQyXVXVciZarWXu7DXwekyV1zPivkrAzf4VSHb2Aq2FCKgRkKSozHFknKeq99dQaSmkhUDtZWsw'
// signatureCheck = authValidate(signedData, fakeSignature, publicKey)

// signatureCheck.then(function(result) {
//     console.log('Host: ' + signedData.host)
//     console.log('Data: ' + signedData.data)
//     console.log('Public key: ' + publicKey)
//     console.log('Address: ' + address)
//     console.log('Fake signature: ' + fakeSignature)
//     console.log('Fake signature check: ' + result + '\n')
// });

