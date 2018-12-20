// Obter de um usuario:
// numero de telefone a partir do seu ID
// endereco pelo id

const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(callback) {
  return new Promise(function resolvePromse(resolve, reject) {
    setTimeout(() => {
      // return reject( new Error('DEU RUIM MESMO'))
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      })
    }, 1000);
  });
}

function obterTelefone(userId) {
  if(userId) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        return resolve({
          telefone: '11111111111',
          ddd: 11
        })
      }, 2000);
    })
  }
}


function obterEndereco(userId, callback) {
  if(userId) {
    setTimeout(() => {
      return callback(null, {
        rua: 'Rua Top',
        ddd: 0
      })
    }, 2000);
  }
}

const usuarioPromisse = obterUsuario()

usuarioPromisse
.then(function (respostaUsuario) {
    return obterTelefone(respostaUsuario.id)
      .then(function resolverTelefone(respostaTelefone) {
        return {
          usuario: {
            nome: respostaUsuario.nome,
            id: respostaUsuario.id,
          },
          telefone: respostaTelefone,
        }
      })
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolveEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result,

      }
    })
  })
  .then(function (resultado) {
    console.log(resultado)
  })
  .catch(function (error) {
    console.error('DEU RUIM', error)
  })
