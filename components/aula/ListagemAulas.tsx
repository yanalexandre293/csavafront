import Head from "next/head";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { Disciplina } from "../disciplina/ListagemDisciplinas";

interface Aula {
    Id: number;
    Nome: string;
    DisciplinaId: number;
    Disciplina: Disciplina;
}

export default function ListagemAulas() {
    const [aulas, setAulas] = useState<Aula[]>([]);
    const [gatilhoUpdate, setGatilhoUpdate] = useState(false);
    const [novaAula, setNovaAula] = useState<Aula>({Id: 0, Nome: "", DisciplinaId: 0, Disciplina: {Id: 0, Nome: "", Aulas: []}});
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);7
    const [aulaSelecionada, setAulaSelecionada] = useState<Aula | undefined>(undefined);
    const [aulaEditada, setAulaEditada] = useState<Aula>({Id: 0, Nome: "", DisciplinaId: 0, Disciplina: {Id: 0, Nome: "", Aulas: []}});

    const adicionarAula = () => {
        setNovaAula(novaAula);
        if (novaAula.Nome.trim() === "" || novaAula.DisciplinaId <= 0) {
            alert("O nome da aula e a disciplina não podem estar vazios!");
            return;
        }
        const novaAulaObj = { Nome: novaAula.Nome, DisciplinaId: novaAula.DisciplinaId };
        axios.post('http://localhost:5147/Aula', novaAulaObj)
            .then(response => {
                setNovaAula({
                    Id: 0,
                    Nome: "",
                    DisciplinaId: 0,
                    Disciplina: { Id: 0, Nome: "", Aulas: [] }
                });
                setGatilhoUpdate((prev) => !prev);
            })
            .catch(error => {
                console.log("Erro ao adicionar a aula!", error);
            });
    };

    const removerAula = (aulaId: number) => {
        axios.delete(`http://localhost:5147/Aula/${aulaId}`)
            .then(res => {
                setGatilhoUpdate((prev) => !prev);
                console.log(res);
            })
            .catch(error => {
                console.log("Erro ao excluir a aula!", error);
            });
    };

    const editarAula = (aulaId: number) => {
        if (aulaSelecionada == undefined) {
            const aula = aulas.find(aula => aula.Id === aulaId);
            setAulaSelecionada(aula);
            setAulaEditada(aula || { Id: 0, Nome: "", DisciplinaId: 0, Disciplina: { Id: 0, Nome: "", Aulas: [] } });
        } else if (aulaEditada?.Nome === aulaSelecionada?.Nome && aulaEditada?.DisciplinaId === aulaSelecionada?.DisciplinaId) {
            setAulaSelecionada(undefined);
        } else {
            axios.put(`http://localhost:5147/Aula/${aulaId}`, aulaEditada)
                .then(res => {
                    setGatilhoUpdate((prev) => !prev);
                    setAulaSelecionada(undefined);
                })
                .catch(error => {
                    console.log("Erro ao editar a aula!", error);
                });
        }
    };

    useEffect(() => {
        axios.get('http://localhost:5147/Disciplina')
            .then(response => {
                setDisciplinas(response.data);
            })
            .catch(error => {
                console.log("Erro ao buscar as disciplinas!", error);
            })
    }, [gatilhoUpdate]);

    useEffect(() => {
        axios.get('http://localhost:5147/Aula')
            .then(res => {
                setAulas(res.data)
            })
            .catch(error => {
                console.log("Erro ao buscar aulas!", error);
            });
    },[gatilhoUpdate]);

    return (
        <div>
            <Head>
                <title>Cadastro de Aulas</title>
                <meta name="description" content="Área para gerenciar aulas." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col p-6">
                <h1 className="text-3xl font-semibold">Cadastro de Aulas</h1>
                <p className="mt-4 text-lg text-gray-700">
                    Gerencie as aulas cadastradas no sistema. Adicione, edite ou remova aulas conforme necessário.
                </p>
                <div className="mt-6">
                    <label className="mr-2">Nome:</label>
                    <input
                        value={novaAula.Nome}
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-md w-64"
                        onChange={(e) => setNovaAula({ ...novaAula, Nome: e.target.value })}
                    />
                    <label className="ml-4 mr-2">Disciplina:</label>
                    <select
                        value={novaAula.DisciplinaId}
                        className="px-4 py-2 border border-gray-300 rounded-md w-64"
                        onChange={(e) => setNovaAula({ ...novaAula, DisciplinaId: Number(e.target.value) })}
                    >
                        <option value={0}>Selecione uma disciplina</option>
                        {disciplinas.map(disciplina => (
                            <option key={disciplina.Id} value={disciplina.Id}>
                                {disciplina.Nome}
                            </option>
                        ))}
                    </select>
                    <button
                        className="ml-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        onClick={adicionarAula}
                    >
                        Adicionar Nova Aula
                    </button>
                </div>

                <table className="mt-8 table-auto w-full border-collapse shadow-md bg-white">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="px-4 py-2 border-r border-gray-300 w-20">ID</th>
                            <th className="px-4 py-2 border-r border-gray-300 w-80">Nome</th>
                            <th className="px-4 py-2 border-r border-gray-300 w-80">Disciplina</th>
                            <th className="px-4 py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aulas.map((aula) => (
                            <tr
                                key={aula.Id}
                                className="border-b border-gray-200 odd:bg-gray-100 even:bg-white p-0"
                            >
                                <td className="px-4 py-2 border-r border-gray-300">{aula.Id}</td>
                                <td className="px-4 py-2 border-r border-gray-300">
                                    {aulaSelecionada == aula ? (
                                        <input
                                            value={aulaEditada?.Nome || ""}
                                            type="text"
                                            className="px-4 py-2 border border-gray-300 rounded-md w-64"
                                            onChange={(e) => setAulaEditada({ ...aulaEditada, Nome: (e.target.value) })}
                                        />
                                    ) : (
                                        aula.Nome
                                    )}
                                </td>
                                <td className="px-4 py-2 border-r border-gray-300">
                                    {aulaSelecionada == aula ? (
                                        <select
                                            value={aulaEditada?.DisciplinaId || 0}
                                            className="px-4 py-2 border border-gray-300 rounded-md w-64"
                                            onChange={(e) => setAulaEditada({ ...aulaEditada, DisciplinaId: Number(e.target.value)})}
                                        >
                                            <option value={0}>Selecione uma disciplina</option>
                                            {disciplinas.map(disciplina => (
                                                <option key={disciplina.Id} value={disciplina.Id}>
                                                    {disciplina.Nome}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        aula.Disciplina.Nome
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                                        onClick={() => editarAula(aula.Id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        onClick={() => removerAula(aula.Id)}
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