import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

interface Disciplina {
    Id: number;
    Nome: string;
    Aulas: any[]; // Adaptar conforme necessário
}

interface Aula {
    Id: number;
    Titulo: string;
    Conteudo: string;
}

interface Estudante {
    Id: number;
    Nome: string;
    Email: string;
    Senha: string;
    DisciplinasCursadas?: Disciplina[];
    AulasAssistidas?: Aula[];
}

export default function ListagemEstudantes() {
    const [estudantes, setEstudantes] = useState<Estudante[]>([]);
    const [gatilhoUpdate, setGatilhoUpdate] = useState(false);
    const [novoEstudante, setNovoEstudante] = useState<Estudante>({
        Id: 0,
        Nome: "",
        Email: "",
        Senha: "",
        DisciplinasCursadas: [],
        AulasAssistidas: []
    });
    const [estudanteSelecionado, setEstudanteSelecionado] = useState<Estudante | undefined>(undefined);
    const [estudanteEditado, setEstudanteEditado] = useState<Estudante>({
        Id: 0,
        Nome: "",
        Email: "",
        Senha: "",
        DisciplinasCursadas: [],
        AulasAssistidas: []
    });

    const adicionarEstudante = () => {
        if (novoEstudante.Nome.trim() === "" || novoEstudante.Email.trim() === "" || novoEstudante.Senha.trim() === "") {
            alert("Todos os campos são obrigatórios!");
            return;
        }
        axios.post('http://localhost:5147/Estudante', {Nome: novoEstudante.Nome, Email: novoEstudante.Email, Senha: novoEstudante.Senha})
            .then(() => {
                setNovoEstudante({ Id: 0, Nome: "", Email: "", Senha: "", DisciplinasCursadas: [], AulasAssistidas: [] });
                setGatilhoUpdate(prev => !prev);
            })
            .catch(error => {
                console.log("Erro ao adicionar o estudante!", error);
            });
    };

    const removerEstudante = (estudanteId: number) => {
        axios.delete(`http://localhost:5147/Estudante/${estudanteId}`)
            .then(() => setGatilhoUpdate(prev => !prev))
            .catch(error => console.log("Erro ao excluir o estudante!", error));
    };

    const editarEstudante = (estudanteId: number) => {
        if (!estudanteSelecionado) {
            const estudante = estudantes.find(e => e.Id === estudanteId);
            setEstudanteSelecionado(estudante);
            setEstudanteEditado(estudante || { Id: 0, Nome: "", Email: "", Senha: "", DisciplinasCursadas: [], AulasAssistidas: [] });
        } else if (
            estudanteEditado?.Nome === estudanteSelecionado?.Nome &&
            estudanteEditado?.Email === estudanteSelecionado?.Email &&
            estudanteEditado?.Senha === estudanteSelecionado?.Senha
        ) {
            setEstudanteSelecionado(undefined);
        } else {
            axios.put(`http://localhost:5147/Estudante/${estudanteId}`, estudanteEditado)
                .then(() => {
                    setGatilhoUpdate(prev => !prev);
                    setEstudanteSelecionado(undefined);
                })
                .catch(error => console.log("Erro ao editar o estudante!", error));
        }
    };

    useEffect(() => {
        axios.get('http://localhost:5147/Estudante')
            .then(response => setEstudantes(response.data))
            .catch(error => console.log("Erro ao buscar estudantes!", error));
    }, [gatilhoUpdate]);

    return (
        <div>
            <Head>
                <title>Cadastro de Estudantes</title>
                <meta name="description" content="Área para gerenciar estudantes." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col p-6">
                <h1 className="text-3xl font-semibold">Cadastro de Estudantes</h1>
                <p className="mt-4 text-lg text-gray-700">
                    Gerencie os estudantes cadastrados no sistema. Adicione, edite ou remova estudantes conforme necessário.
                </p>
                <div className="mt-6">
                    <label className="mr-2">Nome:</label>
                    <input
                        value={novoEstudante.Nome}
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-md w-52"
                        onChange={(e) => setNovoEstudante({ ...novoEstudante, Nome: e.target.value })}
                    />
                    <label className="ml-4 mr-2">Email:</label>
                    <input
                        value={novoEstudante.Email}
                        type="email"
                        className="px-4 py-2 border border-gray-300 rounded-md w-64"
                        onChange={(e) => setNovoEstudante({ ...novoEstudante, Email: e.target.value })}
                    />
                    <label className="ml-4 mr-2">Senha:</label>
                    <input
                        value={novoEstudante.Senha}
                        type="password"
                        className="px-4 py-2 border border-gray-300 rounded-md w-64"
                        onChange={(e) => setNovoEstudante({ ...novoEstudante, Senha: e.target.value })}
                    />
                    <button
                        className="ml-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        onClick={adicionarEstudante}
                    >
                        Adicionar Novo Estudante
                    </button>
                </div>

                <table className="mt-8 table-auto w-full border-collapse shadow-md bg-white">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="px-4 py-2 border-r border-gray-300">ID</th>
                            <th className="px-4 py-2 border-r border-gray-300">Nome</th>
                            <th className="px-4 py-2 border-r border-gray-300">Email</th>
                            <th className="px-4 py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estudantes.map(estudante => (
                            <tr
                                key={estudante.Id}
                                className="border-b border-gray-200 odd:bg-gray-100 even:bg-white"
                            >
                                <td className="px-4 py-2 border-r border-gray-300">{estudante.Id}</td>
                                <td className="px-4 py-2 border-r border-gray-300">
                                    {estudanteSelecionado === estudante ? (
                                        <input
                                            value={estudanteEditado?.Nome || ""}
                                            type="text"
                                            className="px-4 py-2 border border-gray-300 rounded-md w-64"
                                            onChange={(e) => setEstudanteEditado({ ...estudanteEditado, Nome: e.target.value })}
                                        />
                                    ) : (
                                        estudante.Nome
                                    )}
                                </td>
                                <td className="px-4 py-2 border-r border-gray-300">
                                    {estudanteSelecionado === estudante ? (
                                        <input
                                            value={estudanteEditado?.Email || ""}
                                            type="email"
                                            className="px-4 py-2 border border-gray-300 rounded-md w-64"
                                            onChange={(e) => setEstudanteEditado({ ...estudanteEditado, Email: e.target.value })}
                                        />
                                    ) : (
                                        estudante.Email
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                                        onClick={() => editarEstudante(estudante.Id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        onClick={() => removerEstudante(estudante.Id)}
                                    >
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
