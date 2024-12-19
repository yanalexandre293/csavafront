export default function AulasDisciplina({ aulas }: { aulas: any[] }) {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-4">Aulas da Disciplina</h1>
            <p className="text-lg mb-6">Confira abaixo as aulas disponíveis nesta disciplina:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {aulas.map((aula) => (
                    <div
                        key={aula.Id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                    >
                        <h2 className="text-xl font-semibold">{aula.Nome}</h2>
                        <button 
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Acessar Aula
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
