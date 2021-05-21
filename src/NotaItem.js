import { useReducer } from 'react';
import { withRouter } from 'react-router-dom';

function NotaItem({ nota, aoSelecionarNota }) {

  return (
    <div onClick={() => aoSelecionarNota(nota)} style={{ width: '95%',  margin: 10, border: '1px solid #000' }}>
      <h3>{nota.titulo} - {nota.data}</h3>
    </div>
  )
}

export default withRouter(NotaItem);
