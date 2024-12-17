import Head from "next/head";
import styles from '@/app/admin/adminDashboard.module.css';

export default function AulaModal() {
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
                        type="text"
                        className="px-4 py-2 border border-gray-300 rounded-md w-64"
                    />
                    <label className="ml-4 mr-2">Disciplina:</label>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-md w-64"
                    >
                        <option value="">Selecione uma disciplina</option>
                    </select>
                    <button
                        className="ml-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
                            <tr
                                className="border-b border-gray-200 odd:bg-gray-100 even:bg-white p-0"
                            >
                                <td className="px-4 py-2 border-r border-gray-300">1</td>
                                <td className="px-4 py-2 border-r border-gray-300">nome</td>
                                <td className="px-4 py-2 border-r border-gray-300">disciplina</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Remover
                                    </button>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}