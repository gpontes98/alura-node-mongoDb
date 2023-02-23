import { livros } from "../models/Livro.js";

class LivroController {
  static listarLivros = (req, res) => {
    livros
      .find()
      .populate("autor")
      .populate("editora")
      .exec((err, livros) => {
        res.status(200).json(livros);
      });
  };

  static listarLivroPorId = (req, res) => {
    const { id } = req.params;
    livros
      .findById(id)
      .populate("autor", "nome")
      .populate("editora", "endereco")
      .exec((err, livro) => {
        if (err) {
          res
            .status(400)
            .send({ message: `${err.message} - falha ao buscar livro` });
        } else if (livro === null) {
          res
            .status(400)
            .send({ message: "Id do livro não encontrado na base de dados" });
        } else {
          res.status(200).send(livro.toJSON());
        }
      });
  };

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);
    livro.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar livro.` });
      } else {
        res.status(201).send(livro.toJSON());
      }
    });
  };

  static atualizarLivro = (req, res) => {
    const { id } = req.params;
    livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res
          .status(200)
          .send({ message: "O livro foi atualizado com sucesso!" });
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao atualizar o livro` });
      }
    });
  };

  static excluirLivro = (req, res) => {
    const { id } = req.params;
    livros.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "O livro foi deletado com sucesso!" });
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao deletar o livro` });
      }
    });
  };

  static listarLivroPorEditora = (req, res) => {
    const editora = req.query.editora;
    livros.find({ editora: editora }, {})
    .populate("autor")
    .populate("editora")
    .exec((err, livros) => {
      if (!err) {
        res.status(200).send(livros);
      } else {
        res
          .status(400)
          .send({
            message: `${err.message} - falha ao buscar o livro por editora`,
          });
      }
    });
  };
}

export default LivroController;
