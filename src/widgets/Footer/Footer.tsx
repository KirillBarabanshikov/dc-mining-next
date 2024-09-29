import { getCategories } from '@/entities/category';
import { getContacts } from '@/entities/contacts';
import { FooterContent } from '@/widgets/Footer/FooterContent';

export const Footer = async () => {
    const [contacts, categories] = await Promise.all([getContacts(), getCategories()]);

    return <FooterContent contacts={contacts} categories={categories} />;
};
