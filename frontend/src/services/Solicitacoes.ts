import { EditarSolicitacaoProps } from "../types";
import api from "./api";

// alterar depois
interface Solicitacao {
    
}

interface Avaliacao {
    comite: string;
    nota: number;
    comentario: string;
}

class Solicitacoes {
    async criar(solicitacao: Solicitacao) {
        console.log(`criando solicitação`)
    }

    async atualizar(id: number, solicitacao: EditarSolicitacaoProps) {
        const {data} = await api.put(`update/solicitacao/${id}`, solicitacao);
        return data;
    }

    async deletar(id: number) {
        const {data} = await api.delete(`solicitacao/delete/${id}`);
        return data;
    }

    async getAll() {
        const {data} = await api.get('find/solicitacao')
        return data;
    }

    async getByID(id: number) {
        const {data} = await api.get(`solicitacao/${id}`);
        return data;
    }

    async getByCriador(criador: number) {
        console.log(`pegando solicitações do criador ${criador}`)
    }

    async avaliar(id: number, avaliacao: Avaliacao) {
        console.log('avaliando solicitação ', id);
    }

    async liberarParaAvaliacao(id: number) {
        console.log('liberando para avaliacao a solicitação ', id);
    }

    async liberarParaProducao(id: number) {
        console.log('liberando para produção a solicitação ', id);
    }

    async arquivar(id: number) {
        const {data} = await api.put(`update/solicitacao/${id}`, {status: 'archived'});
        return data;
    }

    async atualizarProducao(id: number, status: string) {
        const statusJSON = {status}
        console.log(`atualizando produção da solicitação ${id} para ${statusJSON.status}`)
    }
}

export default new Solicitacoes();