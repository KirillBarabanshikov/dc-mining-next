import { getCategories } from '@/entities/category';
import { getContacts } from '@/entities/contacts';
import { HeaderContent } from '@/widgets/Header/ui';

export const Header = async () => {
    const [contacts, categories] = await Promise.all([getContacts(), getCategories()]);

    return <HeaderContent categories={categories} contacts={contacts} />;
};
