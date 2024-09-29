function cleanPhoneNumber(number: string): string {
    const cleanedPhoneNumber = ('' + number).replace(/\D/g, '');

    if (cleanedPhoneNumber.length !== 11) {
        return number;
    }

    return cleanedPhoneNumber;
}

export function formatPhoneNumber(number: string) {
    const cleaned = cleanPhoneNumber(number);
    const formatted = cleaned.startsWith('7') ? '8' + cleaned.slice(1) : cleaned;
    return formatted.replace(/^8(\d{3})(\d{3})(\d{2})(\d{2})$/, '8 ($1) $2 $3 $4');
}

export function intFormatPhoneNumber(number: string) {
    const cleaned = cleanPhoneNumber(number);
    return '+7' + cleaned.substring(1);
}
