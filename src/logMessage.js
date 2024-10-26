module.exports = ({ color, symbol, text }) => {
    const timestamp = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
    const message = `[${symbol[color]}] ${timestamp} | ${text}`.white;

    console.log(message);
}
