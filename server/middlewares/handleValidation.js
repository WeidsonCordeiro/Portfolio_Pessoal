const validatePayload = ({ name, email, message }) => {
  if (!name || !email || !message) {
    return "Nome, e-mail e mensagem são obrigatórios";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "E-mail inválido";
  }

  return null;
};

module.exports = { validatePayload };
