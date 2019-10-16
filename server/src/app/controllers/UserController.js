import { User } from '../models';

class UserController {
  async create(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).send({ errors: ['Preencha todos os dados'] });
    }

    if (!email.match(emailRegex)) {
      return res
        .status(400)
        .send({ errors: ['O e-mail informado está inválido'] });
    }

    if (!password.match(passwordRegex)) {
      return res.status(400).send({
        errors: [
          'Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.',
        ],
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({ errors: ['Senhas não conferem.'] });
    }

    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send({ errors: ['Usuário já cadastrado.'] });
    }

    await User.create(req.body);

    return res.status(201).send({ name, email });
  }
}

module.exports = new UserController();
