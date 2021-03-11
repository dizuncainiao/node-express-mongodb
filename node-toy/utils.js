module.exports = {
    setResponse(data = null, msg = '', code = 200) {
        return {
            code,
            data,
            msg
        }
    }
}
