class SamplePaymentController {
    async index(req, res) {
        return res.status(200).json({ message: 'Hello World' });
    }

    // async store(req, res) {
    //     return res.status(522).send();
    // }
}

export default new SamplePaymentController();
