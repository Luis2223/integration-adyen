import Adyen from '../../config/adyen';

class SubscriptionController {
    async index(req, res) {}

    async store(req, res) {
        const { reference, shopperReference, storedPaymentMethodId } = req.body;

        try {
            const response = await Adyen.payments({
                amount: {
                    currency: 'BRL',
                    value: 3490,
                },
                paymentMethod: {
                    type: 'scheme',
                    storedPaymentMethodId,
                },
                reference,
                shopperReference,
                merchantAccount: process.env.MERCHANT_ACOUNT,
                shopperInteraction: 'ContAuth',
                recurringProcessingModel: 'Subscription',
            });

            return res.json(response);
        } catch (error) {
            console.error(error);
            console.error(
                `Error: ${error.message}, error code: ${error.errorCode}`
            );
            return res.status(error.statusCode).json(error.message);
        }
    }
}

export default new SubscriptionController();
