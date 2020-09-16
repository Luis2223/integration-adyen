import Adyen from '../../config/adyen';

class TokenRegisterController {
    async index(req, res) {
        return res.status(200).send('Hello World');
    }

    async store(req, res) {
        console.log(req.body);
        const { reference, shopperReference } = req.body;

        if (!reference) {
            return res.status(400).json({ error: 'Reference is not define.' });
        }

        if (!shopperReference) {
            return res
                .status(400)
                .json({ error: 'ShopperReference is not define.' });
        }

        try {
            const response = await Adyen.payments({
                amount: {
                    currency: 'BRL',
                    value: 0,
                },
                paymentMethod: {
                    type: 'scheme',
                    encryptedSecurityCode: 'test_737',
                    encryptedExpiryMonth: 'test_03',
                    encryptedExpiryYear: 'test_2030',
                    encryptedCardNumber: 'test_5066991111111118',
                },
                reference,
                shopperReference,
                storePaymentMethod: true,
                shopperInteraction: 'Ecommerce',
                recurringProcessingModel: 'Subscription',
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

export default new TokenRegisterController();
