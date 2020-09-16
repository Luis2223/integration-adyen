import Adyen from '../../config/adyen';

class SamplePaymentController {
    async index(req, res) {
        try {
            // Lista os metodos de pagamentos disponiveis
            const response = await Adyen.paymentMethods({
                channel: 'Web',
                merchantAccount: process.env.MERCHANT_ACOUNT,
                countryCode: 'BR',
                shopperLocale: 'pt-BR',
                amount: {
                    currency: 'BRL',
                    value: 1000,
                },
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
            // Criando um token atraves de um pagamento
            const response = await Adyen.payments({
                amount: {
                    currency: 'BRL',
                    value: 1000,
                },
                paymentMethod: {
                    type: 'scheme',
                    encryptedSecurityCode: 'test_737',
                    encryptedExpiryMonth: 'test_03',
                    encryptedExpiryYear: 'test_2030',
                    encryptedCardNumber: 'test_5066991111111118',
                },
                reference: '20181920',
                shopperReference: '88032223',
                storePaymentMethod: true,
                shopperInteraction: 'Ecommerce',
                recurringProcessingModel: 'CardOnFile',
                returnUrl: 'https://grupozelo.com/',
                merchantAccount: process.env.MERCHANT_ACOUNT,
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
