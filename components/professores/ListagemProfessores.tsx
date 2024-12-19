import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

interface Professor {
    Id: number;
    Nome: string;
    Email: string;
    Senha: string;
}

export default function ListagemProfessores() {
    const [professores, setProfessores] = useState<Professor[]>([]);
    const [gatilhoUpdate, setGatilhoUpdate] = useState(false);
    const [novoProfessor, setNovoProfessor] = useState<Professor>({
        Id: 0,
        Nome: "",
        Email: "",
        Senha: "",
    });
    const [professorSelecionado, setProfessorSelecionado] = useState<Professor | undefined>(undefined);
    const [professorEditado, setProfessorEditado] = useState<Professor>({
        Id: 0,
        Nome: "",
        Email: "",
        Senha: "",
    });

    const adicionarProfessor = () => {
        if (novoProfessor.Nome.trim() === "" || novoProfessor.Email.trim() === "" || novoProfessor.Senha.trim() === "") {
            alert("Todos os campos são obrigatórios!");
            return;
        }
        axios.post('http://localhost:5147/Professor', {Nome: novoProfessor.Nome, Email: novoProfessor.Email, Senha: novoProfessor.Senha})
            .then(() => {
                setNovoProfessor({ Id: 0, Nome: "", Email: "", Senha: ""});
                setGatilhoUpdate(prev => !prev);
            })
            .catch(error => {
                console.log("Erro ao adicionar o professor!", error);
            });
    };

    const removerProfessor = (professorId: number) => {
        axios.delete(`http://localhost:5147/Professor/${professorId}`)
            .then(() => setGatilhoUpdate(prev => !prev))
            .catch(error => console.log("Erro ao excluir o professor!", error));
    };

    const editarProfessor = (professorId: number) => {
        if (!professorSelecionado) {
            const professor = professores.find(p => p.Id === professorId);
            setProfessorSelecionado(professor);
            setProfessorEditado(professor || { Id: 0, Nome: "", Email: "", Senha: ""});
        } else if (
            professorEditado?.Nome === professorSelecionado?.Nome &&
            professorEditado?.Email === professorSelecionado?.Email &&
            professorEditado?.Senha === professorSelecionado?.Senha
        ) {
            setProfessorSelecionado(undefined);
        } else {
            axios.put(`http://localhost:5147/Professor/${professorId}`, professorEditado)
                .then(() => {
                    setGatilhoUpdate(prev => !prev);
                    setProfessorSelecionado(undefined);
                })
                .catch(error => console.log("Erro ao editar o professor!", error));
        }
    };


    useEffect(() => {
        axios.get('http://localhost:5147/Professor')
            .then(response => setProfessores(response.data))
            .catch(error => console.log("Erro ao buscar professores!", error));
    }, [gatilhoUpdate]);

    return (
        <div>
            <Head>
                <title>Cadastro de Professores</title>
                <meta name="description" content="Área para gerenciar professores." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col p-6">
                <h1 className="text-3xl font-semibold">Cadastro de Professores</h1>
                <p className="mt-4 text-lg text-gray-700">
                    Gerencie os professores cadastrados no sistema. Adicione, edite ou remova professores conforme necessário.
                </p>
                <div className="mt-6">
                    <label className="mr-2">Nome:</label>
                    <input
                        value={novoProfessor.Nome}
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-md w-52"
                        onChange={(e) => setNovoProfessor({ ...novoProfessor, Nome: e.target.value })}
                    />
                    <label className="ml-4 mr-2">Email:</label>
                    <input
                        value={novoProfessor.Email}
                        type="email"
                        className="px-4 py-2 border border-gray-300 rounded-md w-64"
                        onChange={(e) => setNovoProfessor({ ...novoProfessor, Email: e.target.value })}
                    />
                    <label className="ml-4 mr-2">Senha:</label>
                    <input
                        value={novoProfessor.Senha}
                        type="password"
                        className="px-4 py-2 border border-gray-300 rounded-md w-64"
                        onChange={(e) => setNovoProfessor({ ...novoProfessor, Senha: e.target.value })}
                    />
                    <button
                        className="ml-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        onClick={adicionarProfessor}
                    >
                        Adicionar Novo Professor
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
                        {professores.map(professor => (
                            <tr
                                key={professor.Id}
                                className="border-b border-gray-200 odd:bg-gray-100 even:bg-white"
                            >
                                <td className="px-4 py-2 border-r border-gray-300">{professor.Id}</td>
                                <td className="px-4 py-2 border-r border-gray-300">
                                    {professorSelecionado === professor ? (
                                        <input
                                            value={professorEditado?.Nome || ""}
                                            type="text"
                                            className="px-4 py-2 border border-gray-300 rounded-md w-64"
                                            onChange={(e) => setProfessorEditado({ ...professorEditado, Nome: e.target.value })}
                                        />
                                    ) : (
                                        professor.Nome
                                    )}
                                </td>
                                <td className="px-4 py-2 border-r border-gray-300">
                                    {professorSelecionado === professor ? (
                                        <input
                                            value={professorEditado?.Email || ""}
                                            type="email"
                                            className="px-4 py-2 border border-gray-300 rounded-md w-64"
                                            onChange={(e) => setProfessorEditado({ ...professorEditado, Email: e.target.value })}
                                        />
                                    ) : (
                                        professor.Email
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                                        onClick={() => editarProfessor(professor.Id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
                                        onClick={() => removerProfessor(professor.Id)}
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
