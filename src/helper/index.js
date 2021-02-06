module.exports = {
    response : (res, status, result, error) => {
        const response = {
            statusCode: status,
            messageStatus: status === 200 ? 'success' : 'error',
            result,
            error: error || null
        }
        return res.status(status).json(response)
    }
}