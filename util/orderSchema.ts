import * as yup from "yup";

export const useOrderValidationSchema = (openBillingAddress) => {

    return yup.object().shape({
        paymentCard: yup.object().shape({
            cardHolderName: yup
                .string()
                .required("Zorunlu Alan"),
            cardNumber: yup
                .string()
                .required("Zorunlu Alan"),
            expireMonth: yup
                .string()
                .required("Zorunlu Alan"),
            expireYear: yup
                .string()
                .required("Zorunlu Alan"),
            cvc: yup.string().required("Zorunlu Alan"),
        }),
        buyer: yup.object({
            name: yup.string().required("Zorunlu Alan"),
            surname: yup.string().required("Zorunlu Alan"),
            gsmNumber: yup.string().required("Zorunlu Alan"),
            email: yup
                .string()
                .email("Lütfen email formatında giriniz")
                .required("Zorunlu Alan"),
        }),
        shippingAddress: yup.object({
            city: yup.string().required("Zorunlu Alan"),
            state: yup.string().required("Zorunlu Alan"),
            address: yup.string().required("Zorunlu Alan"),
            street: yup
                .string()
                .required("Zorunlu Alan"),
        }),
        ...(openBillingAddress
            ? {
                billingAddress: yup.object({
                    city: yup.string().required("Zorunlu Alan"),
                    state: yup.string().required("Zorunlu Alan"),
                    address: yup.string().required("Zorunlu Alan"),
                    street: yup
                        .string()
                        .required("Zorunlu Alan"),
                }),
            }
            : {}),
    });
};