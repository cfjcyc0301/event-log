$.ajaxPrefilter(function (options) {
    // options.url = 'http://www.liulongbin.top:3007' + options.url
    options.url = 'http://127.0.0.1:3007' + options.url

    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = './login.html'
        }
    }
})