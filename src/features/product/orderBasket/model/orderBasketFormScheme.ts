import * as yup from 'yup';

export const orderBasketFormScheme = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string().min(18).required(),
  checked: yup.bool().oneOf([true]),
});

export type TOrderBasketFormScheme = yup.InferType<
  typeof orderBasketFormScheme
>;
