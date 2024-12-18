import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

interface Aula {
    Id: number;
    Nome: string;
    Disciplina: Disciplina;
}

export interface Disciplina {
    Id: number;
    Nome: string;
    Aulas: Aula[];
}

export default function ListagemDisciplinas() {
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [novaDisciplina, setNovaDisciplina] = useState("");
    const [gatilhoUpdate, setGatilhoUpdate] = useState(false);
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<Disciplina | undefined>(undefined);
    const [novoNome, setNovoNome] = useState("");

    const adicionarDisciplina = () => {
        if(!novaDisciplina.trim()){
            alert("O nome da disciplina não pode estar vazio!");
            return;
        }
        const novaDisciplinaObj = { Nome: novaDisciplina, Aulas: [] };
        axios.post('http://localhost:5147/Disciplina', novaDisciplinaObj)
            .then(response => {
                setNovaDisciplina("");
                setGatilhoUpdate((prev) => !prev);
            })
            .catch(error => {
                console.log("Erro ao adicionar a disciplina!", error);
            })
    };

    const editarDisciplina = (disciplinaId: number) => {
        if(disciplinaSelecionada == undefined){
            const disciplina = disciplinas.find(disciplina => disciplina.Id === disciplinaId);
            setDisciplinaSelecionada(disciplina);
            setNovoNome(disciplina?.Nome || "");
        }else if(novoNome == disciplinaSelecionada?.Nome){
            setDisciplinaSelecionada(undefined);
        }else{
            axios.put(`http://localhost:5147/Disciplina/${disciplinaId}`, { ...disciplinaSelecionada, Nome: novoNome })
                .then(res => {
                    setGatilhoUpdate((prev) => !prev);
                    setDisciplinaSelecionada(undefined);
                })
                .catch(error => {
                    console.log("Erro ao editar a disciplina!", error);
                })
        }
    };

    const removerDisciplina = (disciplinaId: number) => {
        axios.delete(`http://localhost:5147/Disciplina/${disciplinaId}`)
            .then(res => {
                setGatilhoUpdate((prev) => !prev);
                console.log(res);
            })
            .catch(error => {
                console.log("Erro ao remover a disciplina!", error);
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

    return (
        <div>
            <Head>
                <title>Cadastro de Disciplinas</title>
                <meta name="description" content="Área para gerenciar disciplinas." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col p-6">
                <h1 className="text-3xl font-semibold">Cadastro de Disciplinas</h1>
                <p className="mt-4 text-lg text-gray-700">Gerencie as disciplinas cadastradas no sistema. Adicione, edite ou remova disciplinas conforme necessário.</p>
                <div className="mt-6">
                    <label className="mr-2">Nome:</label>
                    <input
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-md w-64"
                        value={novaDisciplina}
                        onChange={(e) => setNovaDisciplina(e.target.value)}
                    />
                    <button
                        className="ml-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        onClick={adicionarDisciplina}
                    >
                        Adicionar Nova Disciplina
                    </button>
                </div>

                <table className="mt-8 table-auto w-full border-collapse shadow-md bg-white">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="px-4 py-2 border-r border-gray-300 w-20">ID</th>
                            <th className="px-4 py-2 border-r border-gray-300 w-80">Nome</th>
                            <th className="px-4 py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinas.map((disciplina) => (
                            <tr
                                key={disciplina.Id}
                                className="border-b border-gray-200 odd:bg-gray-100 even:bg-white p-0"
                            >
                                <td className="px-4 py-2 border-r border-gray-300">{"# "+disciplina.Id}</td>
                                {disciplinaSelecionada === disciplina ? (
                                    <td className="px-4 py-2 border-r border-gray-300 ml-2 pl-0">
                                        <input
                                            type="text"
                                            value={novoNome}
                                            onChange={(e) => setNovoNome(e.target.value)}
                                            className="py-1 border border-gray-300 rounded-md pl-3"
                                        />
                                    </td>
                                    ) : (
                                    <td className="px-4 py-2 border-r border-gray-300 ml-2">
                                        {disciplina.Nome}
                                    </td>
                                )}
                                
                                    
                                
                                <td className="px-4 py-2">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
                                        onClick={() => editarDisciplina(disciplina.Id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                        onClick={() => removerDisciplina(disciplina.Id)}
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
