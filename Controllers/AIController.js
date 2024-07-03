const openai = require('openai');

const openaiClient = new openai.OpenAI(process.env.OPENAI_API_KEY);

module.exports.ChatWithBot = async (req, res, next) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(404).json({ msg: 'Data not received', status: false });
        }

        const response = await openaiClient.completions.create({
            model: 'gpt-3.5-turbo',
            engine: 'text-davinci-002',
            messages: [{ role: "user", content: message }],
            max_tokens: 150,
            stop: ['\n']
        });

        
        if (response && response.data && response.data.choices && response.data.choices.length > 0) {
            return res.status(200).json({ response: response.data.choices[0].text.trim(), status: true });
        } else {
            return res.status(400).json({ status: false, msg: 'No message from AI' });
        }
    } catch (ex) {
        next(ex);
    }
};