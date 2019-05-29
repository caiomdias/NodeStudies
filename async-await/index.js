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
        number: 181
      })
    }, 2000);
  }
}

main = async () => {
  try {
    console.time('medida de tempo da promise')
    const user = await obterUsuario();
    // const tell = await obterTelefone(user.id);
    // const address = await obterEndereco(user.id);
    
    const result = await Promise.all([
      obterTelefone(user.id),
      obterEnderecoAsync(user.id),
    ])

    const tell = result[0];
    const address = result[1];

    console.log(`
      usuario: ${user.nome} ${user.dataNascimento}
      telefone: (${tell.ddd}) - ${tell.telefone}
      endereço: ${address.rua} - ${address.number}
    `)
    console.timeEnd('medida de tempo da promise')
  
  } 
  catch (error) {
    console.log(error);
  }
}


main();