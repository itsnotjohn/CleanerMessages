const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Loading = () => {
    let loadingInterval;

    const start = () => {
        const loadingFrames = ['|', '/', '-', '\\'];
        let i = 0;
        loadingInterval = setInterval(() => {
            process.stdout.write(`\rLoading ${loadingFrames[i].random}`.white);
            i = (i + 1) % loadingFrames.length;
        }, 200);
    }

    const stop = ({ error = false }) => {
        clearInterval(loadingInterval);
        if (!error)
            process.stdout.write('\rLoading complete!\n');
    }

    return { start, stop }
}

module.exports = { wait, Loading }