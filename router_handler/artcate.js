const db = require('../db/index')

exports.getArtCates = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        console.log(results);
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章列表数据成功',
            data: results,
        })
    })
}

exports.addArticleCates = (req, res) => {
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)

        // 判断名称和别名被占用的4种情况
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        // 定义更新文章分类的 SQL 语句
        const sql = 'insert into ev_article_cate set ?'
        // 执行更新文章分类的 SQL 语句
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
            res.cc('新增文章分类成功！', 0)
        })
    })
}

exports.deleteCateById = (req, res) => {
    const sql = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败')
        res.cc('删除文章分类成功', 0)
    })
}

exports.getArtCatesById = (req, res) => {
    const sql = 'select * from ev_article_cate where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1 || results[0].is_delete === 1) return res.cc('获取文章分类失败')
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: results[0],
        })
    })
}

exports.updateCateById = (req, res) => {
    const sql = 'select * from ev_article_cate where Id<>? and (name=? or alias=?)'
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('用户名称和别名重复')
        if (results.length === 1 && req.body.name === results[0].name) return res.cc('用户名称重复')
        if (results.length === 1 && req.body.alias === results[0].alias) return res.cc('用户别名重复')
        if (results.length === 1 && req.body.name === results[0].name && req.body.alias === results[0].alias) return res.cc('用户名称和别名重复')

        const sql = 'update ev_article_cate set ? where Id=?'
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败')
            res.cc('更新文章分类成功', 0)
        })
    })
}