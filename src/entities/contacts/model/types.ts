export interface IContacts {
    id: number;
    phone: string;
    email: string;
    office: string;
    images: IContactsImages[];
    contactHeaders: IContactHeaders[];
    details: string;
    coordinatesOffice: number[];
    coordinatesHosting: number[];
    hosting: string;
}

interface IContactsImages {
    id: number;
    image: string;
    url: string;
}

interface IContactHeaders {
    id: number;
    image: string;
    title: string;
    url: string;
}
