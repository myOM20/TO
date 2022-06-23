
const Admin = require('../models/admin');

const getIndex = (req, res, next) => {
  return res.render('../views/Admin/registerAdmin');
  
};

const getLogin = (req, res, next) => {
  return res.render('../views/Admin/loginAdmin');
};

const getRegister = (req, res, next) => {
  return res.render('../views/Admin/registerAdmin');
};

const getForgetPassword = (req, res, next) => {
  res.render('forget.ejs');
};


const postIndex = (req, res, next) => {
  let personInfo = req.body;

  if (
    !personInfo.email ||
    !personInfo.username ||
    !personInfo.password ||
    !personInfo.passwordConf
  ) {
    res.send();
  } else {
    if (personInfo.password == personInfo.passwordConf) {
      Admin.findOne({ email: personInfo.email }, (err, data) => {
        if (!data) {
          let c;
          Admin.findOne({}, (err, data) => {
            if (data) {
              c = data.unique_id + 1;
            } else {
              c = 1;
            }

            let newPerson = new Admin({
              unique_id: c,
              email: personInfo.email,
              username: personInfo.username,
              password: personInfo.password,
              passwordConf: personInfo.passwordConf,
              NumberPhone : personInfo.NumberPhone,
            });

            newPerson.save((err, Person) => {
              if (err) console.log(err);
              else console.log('Success');
            });
          })
            .sort({ _id: -1 })
            .limit(1);
          res.send({ Success: 'You are regestered,You can login now.' });
        } else {
          res.send({ Success: 'Email is already used.' });
        }
      });
    } else {
      res.send({ Confrimntion: 'password is not matched' });
    }
  }
};

const postLogin = (req, res, next) => {
  Admin.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      if (data.password == req.body.password) {
        req.session.userId = data.unique_id;
        res.send({ Success: 'Success!' });
      } else {
        res.send({ Success: 'Wrong password!' });
      }
    } else {
      res.send({ Success: 'This Email Is not regestered!' });
    }
  });
};

const postForgetPassword = (req, res, next) => {
  Admin.findOne({ email: req.body.email }, (err, data) => {
    if (!data) {
      res.send({ Success: 'This Email Is not regestered!' });
    } else {
      if (req.body.password == req.body.passwordConf) {
        data.password = req.body.password;
        data.passwordConf = req.body.passwordConf;

        data.save((err, Person) => {
          if (err) console.log(err);
          else console.log('Success');
          res.send({ Success: 'Password changed!' });
        });
      } else {
        res.send({
          Success: 'Password does not matched! Both Password should be same.',
        });
      }
    }
  });
};
const getProfile = ( (req, res, next) => {
	Admin.findOne({ unique_id: req.session.userId }, (err, data) => {
		if (!data) {
			res.redirect('/');
		} else {
			return res.render('data.ejs', { "name": data.username, "email": data.email });
		}
	});
});

const logout = (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
};



module.exports = {
  getIndex,
  getLogin,
  getRegister,
  getForgetPassword,
  postIndex,
  postLogin,
  postForgetPassword,
  getProfile,
  logout,

}