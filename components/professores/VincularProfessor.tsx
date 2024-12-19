import { useState, useEffect } from "react";
import axios from "axios";

interface Disciplina {
    Id: number;
    Nome: string;
}

interface ModalVincularProps {
    professorId: number;
    isOpen: boolean;
    onClose: () => void;
    onVincular: (disciplinaId: number) => void;
}

export const ModalVincular: React.FC<ModalVincularProps> = ({
    professorId,
    isOpen,
    onClose,
    onVincular
}) => {
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<number | null>(null);

    useEffect(() => {
        // Buscar as disciplinas disponíveis
        axios.get('http://localhost:5147/Disciplina')
            .then(response => setDisciplinas(response.data))
            .catch(error => console.error("Erro ao buscar disciplinas", error));
    }, []);

    const handleVincular = () => {
        if (disciplinaSelecionada !== null) {
            onVincular(disciplinaSelecionada);
            onClose(); // Fecha a modal após vincular
        } else {
            alert("Selecione uma disciplina.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-xl mb-4">Vincular Disciplina</h2>
                <div className="mb-4">
                    <label className="block text-sm">Selecione a Disciplina</label>
                    <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        onChange={(e) => setDisciplinaSelecionada(Number(e.target.value))}
                    >
                        <option value="">Selecione uma disciplina</option>
                        {disciplinas.map((disciplina) => (
                            <option key={disciplina.Id} value={disciplina.Id}>
                                {disciplina.Nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between">
                    <button
                        className="bg-gray-300 px-4 py-2 rounded-md"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={handleVincular}
                    >
                        Vincular
                    </button>
                </div>
            </div>
        </div>
    );
};
