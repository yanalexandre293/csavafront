"use client";

import AulasDisciplina from "@/components/aula/AulasDisciplina";
import DisciplinasEstudantes from "@/components/disciplina/DisciplinasEstudantes";
import Head from "next/head";
import { useState } from "react";

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

export default function EstudanteDashboard() {
    const [componenteAtivo, setComponenteAtivo] = useState("disciplinas");
    const [aulasDisciplina, setAulasDisciplina] = useState<Aula[]>([]);

    const selecionarAulas = (aulas: Aula[]) => {
        setComponenteAtivo("aulas");
        setAulasDisciplina(aulas);
    }

    return (
        <div className="flex min-h-screen">
            <Head>
                <title>Dashboard - Estudante</title>
                <meta name="description" content="Student Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Menu Lateral */}
            <div className="w-64 bg-gray-800 text-white p-6">
                <h2 className="text-2xl font-semibold">Painel Estudante</h2>
                <button
                    className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-md w-full text-left"
                    onClick={() => setComponenteAtivo("disciplinas")}
                >
                    Minhas Disciplinas
                </button>
                <button
                    className="mt-2 px-6 py-2 bg-gray-600 text-white rounded-md w-full text-left"
                    onClick={() => setComponenteAtivo("perfil")}
                >
                    Perfil
                </button>
                <button
                    className="mt-2 px-6 py-2 bg-gray-600 text-white rounded-md w-full text-left"
                    onClick={() => setComponenteAtivo("sair")}
                >
                    Sair
                </button>
            </div>

            {/* Área Principal */}
            <div className="flex-grow p-6 bg-gray-100">
                {componenteAtivo === "disciplinas" && <DisciplinasEstudantes onSelecionarAulas={selecionarAulas}/>}
                {componenteAtivo === "aulas" && <AulasDisciplina aulas={aulasDisciplina} />}
                {componenteAtivo === "perfil" && (
                    <div>
                        <h1 className="text-3xl font-semibold">Perfil</h1>
                        <p className="mt-4 text-lg">Aqui você pode visualizar e editar suas informações pessoais.</p>
                    </div>
                )}
                {componenteAtivo === "sair" && (
                    <div>
                        <h1 className="text-3xl font-semibold">Sair</h1>
                        <p className="mt-4 text-lg">Você foi desconectado. Volte sempre!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
