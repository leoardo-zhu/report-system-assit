function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
}

export default {
  'POST  /api/user/login': (req, res) => {
    const { password, userName, type } = req.body;

    if (password === 'ant.design' && userName === 'manager') {
      res.send({
        flag: true,
        data: {
          role: 'MANAGER',
          token:
            'eyJhbGciOiJIUzI1NiJ9.eyJST0xFXyI6IlVTRVIiLCJzdWIiOiIxMTUyMTExMzE3NzI1NzY1NjMyIiwiZXhwIjoxNTY0NTg5OTg4LCJpYXQiOjE1NjQ1NTM5ODh9.DtDBLW12UjSjN7Gx97uEzM9O9h8VmcjgIB89coXIj0E',
        },
        message: '登录成功',
      });
      return;
    }

    if (password === 'ant.design' && userName === 'user') {
      res.send({
        flag: true,
        data: {
          role: 'USER',
          token:
            'eyJhbGciOiJIUzI1NiJ9.eyJST0xFXyI6IlVTRVIiLCJzdWIiOiIxMTUyMTExMzE3NzI1NzY1NjMyIiwiZXhwIjoxNTY0NTg5OTg4LCJpYXQiOjE1NjQ1NTM5ODh9.DtDBLW12UjSjN7Gx97uEzM9O9h8VmcjgIB89coXIj0E',
        },
        message: '登录成功',
      });
      return;
    }

    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        flag: true,
        data: {
          role: 'ADMIN',
          token:
            'eyJhbGciOiJIUzI1NiJ9.eyJST0xFXyI6IlVTRVIiLCJzdWIiOiIxMTUyMTExMzE3NzI1NzY1NjMyIiwiZXhwIjoxNTY0NTg5OTg4LCJpYXQiOjE1NjQ1NTM5ODh9.DtDBLW12UjSjN7Gx97uEzM9O9h8VmcjgIB89coXIj0E',
        },
        message: '登录成功',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
