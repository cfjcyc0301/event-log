$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        nickname: function (value) { //value：表单的值、item：表单的DOM对象
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！';
            }
        }
    })

    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userInfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
})