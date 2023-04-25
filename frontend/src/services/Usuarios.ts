import { UsuarioProps } from "../types";
import api from "./api";

interface Usuario {
    name: string;
    job: string;
}

interface Login {
    mail: string;
    password: string;
}

class Usuarios {
    async criar(usuario: Usuario) {
        console.log('criando usuário');
    }

    async atualizar(id: number, usuarioAtualizado: Usuario) {
        console.log(`atualizando usuário do id ${id}`);
    }

    async deletar(id: number) {
        console.log('excluindo solicitação do id ', id);
    }
    
    async getByID(id: number) {
        console.log(`lendo usuário do id ${id}`);
    }

    async getAll(): Promise<UsuarioProps[]> {
        const {data} = await api.get('find/usuario')
        return data;
    }

    async login(login: Login) {
        const {data} = await api.post('login', login)
        return data;
    }
}

export default new Usuarios();