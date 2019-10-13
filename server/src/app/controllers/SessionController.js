require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user && (await user.checkPassword(password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      const { name } = user;
      return res.status(200).send({ name, email, token });
    }

    return res.status(400).send({ errors: ['Usuário/Senha inválidos'] });
  }
}

module.exports = new SessionController();
