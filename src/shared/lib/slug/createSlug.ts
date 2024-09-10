import slugify from 'slugify';

export function createSlug(title: string) {
    return slugify(title, {
        lower: true,
        remove: /[*+~.()'"!:@/]/g,
        locale: 'ru',
    });
}
