exports.allAccess = (req, res) => {
    res.status(200).send("Conteúdo público.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("Conteúdo de usuário.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Conteúdo de administrador.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Conteúdo de moderador.");
};