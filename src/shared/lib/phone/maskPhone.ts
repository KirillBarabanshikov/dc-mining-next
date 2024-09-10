export function maskPhone(value: string) {
    let inputValue = value;

    inputValue = inputValue.replace(/\D/g, '');

    if (inputValue.startsWith('7')) {
        inputValue = inputValue.substring(1);
    }

    inputValue = inputValue.substring(0, 10);

    let formattedValue = '+7';

    if (inputValue.length > 0) {
        formattedValue += ' (' + inputValue.substring(0, 3);
    }
    if (inputValue.length >= 4) {
        formattedValue += ') ' + inputValue.substring(3, 6);
    }
    if (inputValue.length >= 7) {
        formattedValue += '-' + inputValue.substring(6, 8);
    }
    if (inputValue.length >= 9) {
        formattedValue += '-' + inputValue.substring(8, 10);
    }

    return formattedValue;
}
