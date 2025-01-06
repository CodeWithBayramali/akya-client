import * as yup from 'yup'

export const productScheme = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required(),
    stock: yup.number().required(),
    sex: yup.string().required(),
    description: yup.string().required(),
})
