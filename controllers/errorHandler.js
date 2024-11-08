const handleServerError = async (h, error) => {
    console.error(error);
    return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
        error: error.message,
    }).code(500);
}
const handleScanError = async (error) => {
    console.error(error);
    return {
        status: 'error',
        message: 'Terjadi kesalahan ketika Scanning',
        error: error.message,
    };
}

module.exports = {handleServerError, handleScanError};
