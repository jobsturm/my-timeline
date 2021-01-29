module.exports = {
    devServer: {
        overlay: {
            warnings: false,
            errors: false,
        },
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/portfolio-2020/'
        : '/',
};
