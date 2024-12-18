import Head from "next/head";
import { useEffect, useState } from "react";
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
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

    const adicionarAula = () => {
        setNovaAula(novaAula);
        if (novaAula.Nome.trim() === "") {
            alert("O nome da aula não pode estar vazio!");
            return;
        }
        const disciplina = disciplinas.find(disciplina => disciplina.Id === novaAula.DisciplinaId);
        const novaAulaObj = { Nome: novaAula.Nome, DisciplinaId: novaAula.DisciplinaId };
        axios.post('http://localhost:5147/Aula', novaAulaObj)
            .then(response => {
                setNovaAula({Id: 0, Nome: "", DisciplinaId: 0, Disciplina: {Id: 0, Nome: "", Aulas: []}});
                setGatilhoUpdate((prev) => !prev);
            })
            .catch(error => {
                console.log("Erro ao adicionar a aula!", error);
            });
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
                        className="px-4 py-2 border border-gray-300 rounded-md w-64"
                        onChange={(e) => setNovaAula({ ...novaAula, DisciplinaId: Number(e.target.value) })}
                    >
                        <option value="">Selecione uma disciplina</option>
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
                                <td className="px-4 py-2 border-r border-gray-300">{aula.Nome}</td>
                                <td className="px-4 py-2 border-r border-gray-300">{aula.Disciplina.Nome}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
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