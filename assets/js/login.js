$(function () {
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  let form = layui.form
  let layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能为空格'],
    repwd: function (value) {
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    let data = {
      username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status != 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功,请登录');
      // 跳转到登录
      $('#link_login').click()
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        // 将登录成功的token字符串保存到本地存储
        localStorage.setItem('token', res.token)
        location.href = './index.html'
      }
    })
  })
})