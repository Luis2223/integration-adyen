import { Client, Config, CheckoutAPI } from '@adyen/api-library';

class Adyen {
    constructor() {
        const config = new Config();
        config.apiKey = process.env.API_KEY;
        const client = new Client({ config });
        client.setEnvironment('TEST');
        this.checkout = new CheckoutAPI(client);
    }
}

export default new Adyen().checkout;
