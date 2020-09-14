import Adyen from '../../config/adyen';

class SamplePaymentController {
    async index(req, res) {
        try {
            const response = await Adyen.paymentMethods({
                channel: 'Web',
                merchantAccount: process.env.MERCHANT_ACOUNT,
            });
            return res.json(response);
        } catch (error) {
            console.error(
                `Error: ${error.message}, error code: ${error.errorCode}`
            );
            return res.status(error.statusCode).json(error.message);
        }
    }

    async store(req, res) {
        try {
            const response = await Adyen.payments({
                amount: {
                    currency: 'BRL',
                    value: 1000,
                },
                reference: 'Teste de token e assinatura',
                paymentMethod: {
                    type: 'scheme',
                    number: '5066991111111118',
                    expiryMonth: '03',
                    expiryYear: '2030',
                    cvc: '737',
                },
                merchantAccount: process.env.MERCHANT_ACOUNT,
                storePaymentMethod: 'true',
                shopperInteraction: 'Ecommerce',
                recurringProcessingModel: 'Subscription',
                returnUrl: 'http://localhost/',
            });

            return res.status(200).json(response);
        } catch (error) {
            console.error(error);
            console.error(
                `Error: ${error.message}, error code: ${error.errorCode}`
            );
            return res.status(error.statusCode).json(error.message);
        }
    }
}

export default new SamplePaymentController();
