import { editoras } from "../models/Editora.js";

class EditoraController {
  static listarEditoras = (req, res) => {
    editoras.find((err, editoras) => {
      res.status(200).json(editoras);
    });
  };

  static listarEditoraPorId = (req, res) => {
    const { id } = req.params;
    editoras.findById(id, (err, editora) => {
      if (err) {
        res
          .status(400)
          .send({ message: `${err.message} - falha ao buscar editora` });
      } else if (editora === null) {
        res
          .status(400)
          .send({ message: "Id do editora não encontrado na base de dados" });
      } else {
        res.status(200).send(editora.toJSON());
      }
    });
  };

  static cadastrarEditora = (req, res) => {
    let editora = new editoras(req.body);
    editora.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao cadastrar editora.` });
      } else {
        res.status(201).send(editora.toJSON());
      }
    });
  };

  static atualizarEditora = (req, res) => {
    const { id } = req.params;
    editoras.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res
          .status(200)
          .send({ message: "O editora foi atualizado com sucesso!" });
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao atualizar o editora` });
      }
    });
  };

  static excluirEditora = (req, res) => {
    const { id } = req.params;
    editoras.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "O editora foi deletado com sucesso!" });
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - falha ao deletar o editora` });
      }
    });
  };
}

export default EditoraController;
