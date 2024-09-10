export function formatDate(date: string) {
    const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return formattedDate.replace(/ г\.$/, '');
}
