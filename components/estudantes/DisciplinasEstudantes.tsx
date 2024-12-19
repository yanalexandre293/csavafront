import axios from "axios";
import { useEffect, useState } from "react";

interface Disciplina {
    Id: number;
    Nome: string;
    Aulas: any[]; // Adaptar conforme necessário
}

interface Aula {
    Id: number;
    Nome: string;
    Disciplina: Disciplina;
}

export default function DisciplinasEstudantes( { onSelecionarAulas }: any ) {
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

    const selecionarAulas = (aulas: Aula[]) => {
        onSelecionarAulas(aulas);
    }

    useEffect(() => {
        axios.get('http://localhost:5147/Disciplina')
            .then(response => setDisciplinas(response.data))
            .catch(error => console.log("Erro ao buscar disciplinas!", error));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-semibold">Minhas Disciplinas</h1>
            <p className="mt-4 text-lg">Aqui estão as disciplinas nas quais você está matriculado:</p>

            {/* Grid de Disciplinas */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {disciplinas.map((disciplina) => (
                    <div
                        key={disciplina.Id}
                        className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
                    >
                        <h2 className="text-xl font-semibold">{disciplina.Nome}</h2>
                        <button 
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                            onClick={() => selecionarAulas(disciplina.Aulas)}
                        >Ver Aulas</button>
                    </div>
                ))}
            </div>
        </div>
    );
}