import { useReducer, useEffect } from 'react';
import CaixaDeTexto from './CaixaDeTexto';
import { withRouter } from 'react-router-dom';
import NotasCabecalho from './NotasCabecalho';
import NotaItem from './NotaItem';

function notasReducer (estadoAtual, acao) {
  if(acao.type === "ALTERAR_USUARIO") {
    return {
      ...estadoAtual,
      usuario: acao.payload,
    }
  } else if(acao.type === "ALTERAR_FILTRO") {
    return {
      ...estadoAtual,
      filtro: acao.payload,
    }
  } else if(acao.type === "ALTERAR_NOTA") {
    return {
      ...estadoAtual,
      nota: acao.payload,
    }
  } else if(acao.type === "ALTERAR_NOTAS") {
    return {
      ...estadoAtual,
      notas: acao.payload,
    }
  } 
  
  // else if (acao.type === "ALTERAR_SENHA") {
  //   return {
  //     ...estadoAtual,
  //     senha: acao.payload,
  //   }
  // } else if (acao.type === "AUTENTICAR") {
  //   return {
  //     ...estadoAtual,
  //     autenticando: true,
  //   };
  // } else if (acao.type === "FALHAR_AUTENTICACAO") {
  //   return {
  //     ...estadoAtual,
  //     autenticando: false,
  //     loginInvalido: true,
  //   };
  // } else if (acao.type === "CONFIRMAR_AUTENTICACAO") {
  //   return {
  //     ...estadoAtual,
  //     autenticando: false,
  //     loginInvalido: false,
  //     autenticado: true,
  //   };
  // }
}

const estadoInicial = {
  filtro: "",
  usuario: {},
  nota: {},
  notas: [],
  notaSelecionada: {},
}

function Notas(props) {
  const [estado, dispatch] = useReducer(notasReducer, estadoInicial);

  useEffect(() => {
    fetchUsuario();
  }, []);

  const fetchUsuario = function () {
    const usuarioId = props.match.params.id;
    
    if (usuarioId) {
      fetch(`http://localhost:4000/usuarios/${usuarioId}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      }).then(async (response) => {
        const usuario = await response.json();
        
        if (usuario.autenticado) {
          dispatch({ type: "ALTERAR_USUARIO", payload: usuario })
          return fetchNotas(usuarioId);
        } else {
          return props.history.push(`/`);
        }
      })
    } else {
      return props.history.push(`/`);
    }
  }

  const fetchNotas = (usuarioId) =>  {
    fetch(`http://localhost:4000/notas?usuario_id=${usuarioId}${estado.filtro && `&titulo=${estado.filtro}`}`).then(async (response) => {
      const notas = await response.json();
      dispatch({ type: "ALTERAR_NOTAS", payload: notas })
    })
  }

  return  (
    <div>
      <NotasCabecalho usuario={estado.usuario} />

      <div style={{ margin: 'auto', display: 'flex', flexDirection: 'row' }}>

        <div style={{ width: '40%', minHeight: 400, border: '1px solid #e1e1e1' }}>
          <CaixaDeTexto 
            type="text"
            texto={estado.filtro}
            aoAlterarTexto={(e) => dispatch({ type: "ALTERAR_FILTRO", payload: e.target.value })}
          />
          <button onClick={() => fetchNotas(estado.usuario.id)}>
            Pesquisar
          </button>
         
          <h1>Todas as notas</h1>
          {estado.notas.map(nota => (
          <NotaItem
            nota={nota}
            aoSelecionarNota={nota => dispatch({ type: "ALTERAR_NOTA", payload: nota })} />
          ))}
        </div>

        {!!estado.nota && (
          <div style={{ width: '60%', minHeight: 400, border: '1px solid #e1e1e1' }}>
            <h1>{estado.nota.titulo} * {estado.nota.data}</h1>
            <h1>{estado.nota.categoria}</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(Notas);
