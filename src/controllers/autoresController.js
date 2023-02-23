import { autores } from "../models/Autor.js";

class AutorController {
  static listarAutores = (req, res) => {
    autores.find((err, autores) => {
      res.status(200).json(autores);
    });
  };

  static listarAutorPorId = (req, res) => {
    const { id } = req.params;
    autores.findById(id, (err, autor) => {
      if (err) {
        res
          .status(400)
          .send({ message: `${err.message} - falha ao buscar autor` });
      } else if (autor === null) {
        res
          .status(400)
          .send({ message: "Id do autor não encontrado na base de dados" });
      } else {
        res.status(200).send(autor.toJSON());
      }
    });
  };

  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body);
    autor.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar autor.` });
      } else {
        res.status(201).send(autor.toJSON());
      }
    });
  };

  static atualizarAutor = (req, res) => {
    const { id } = req.params;
    autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res
          .status(200)
          .send({ message: "O autor foi atualizado com sucesso!" });
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao atualizar o autor` });
      }
    });
  };

  static excluirAutor = (req, res) => {
    const { id } = req.params;
    autores.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "O autor foi deletado com sucesso!" });
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao deletar o autor` });
      }
    });
  };
}

export default AutorController;
