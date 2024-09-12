export interface IAboutInfo {
    id: number;
    description: string;
    image: string;
    advantages: IAdvantage[];
    massMedia: IMassMedia[];
    partners: {
        id: number;
        image: string;
        preview: string;
    }[];
    main: { id: number; title: string; description: string; image: string }[];
}

export interface IAdvantage {
    id: number;
    title: string;
    description: string;
    image: string;
}

export interface IMassMedia {
    id: number;
    image: string;
    dateAt: string;
    title: string;
    description: string;
    display: boolean;
    link?: string;
}

export interface ILeasingInfo {
    id: number;
    description: string;
    information: {
        id: number;
        title: string;
        description: string;
    }[];
    steps: {
        id: number;
        number: number;
        description: string;
    }[];
    informationTitle: string;
}

export interface IDataCenterInfo {
    id: number;
    title: string;
    description: string;
    information: {
        id: number;
        title: string;
        description: string;
    }[];
    steps: {
        id: number;
        number: number;
        description: string;
    }[];
    containerTitle: string;
    containerDescription: string;
    containerTerm: string;
    containerPrice: number;
    containerCapacity: string;
    containerImage: string;
    top: {
        id: number;
        description: string;
        image: string;
        title: string;
    }[];
    images: { image: string }[];
}

export interface IDeliveryAndPaymentInfo {
    id: number;
    image: string;
    title: string;
    description: string;
}
