import * as yup from 'yup';

export const sendRequestFormScheme = yup.object().shape({
    name: yup.string().required(),
    phone: yup.string().min(18).required(),
    email: yup.string().email().required(),
    buy: yup.number().integer().required(),
    title: yup.string().required(),
    address: yup.string().required(),
    description: yup.string().required(),
    mediaFile: yup
        .mixed<FileList>()
        .test('fileSize', 'Максимальный размер файла: 10МБ', (value) => {
            if (value && !value.length) return true;
            return value && value[0].size <= 10485760;
        })
        .test('fileFormat', 'Неверный формат файла', (value) => {
            if (value && !value.length) return true;
            return (
                value &&
                [
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.ms-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/pdf',
                    'image/png',
                    'image/jpeg',
                ].includes(value[0].type)
            );
        }),
});

export type TSendRequestFormScheme = yup.InferType<typeof sendRequestFormScheme>;
