"use client";

import Head from "next/head";
import { useState } from "react";

export default function ProfessorDashboard() {
    const [componenteAtivo, setComponenteAtivo] = useState("dashboard");

    return (
        <div className="flex min-h-screen">
            <Head>
                <title>Dashboard - Professor</title>
                <meta name="description" content="Professor Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Menu Lateral */}
            <div className="w-64 bg-gray-800 text-white p-6">
                <h2 className="text-2xl font-semibold">Painel Professor</h2>
                <button
                    className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-md w-full text-left"
                    onClick={() => setComponenteAtivo("disciplinas")}
                >
                    Disciplinas
                </button>
                <button
                    className="mt-2 px-6 py-2 bg-gray-600 text-white rounded-md w-full text-left"
                    onClick={() => setComponenteAtivo("aulas")}
                >
                    Aulas
                </button>
                <button
                    className="mt-2 px-6 py-2 bg-gray-600 text-white rounded-md w-full text-left"
                    onClick={() => setComponenteAtivo("adicionarAula")}
                >
                    Adicionar Aula
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
                {componenteAtivo === "dashboard" && (
                    <div>
                        <h1 className="text-3xl font-semibold">Dashboard</h1>
                        <p className="mt-4 text-lg">Seja bem-vindo ao painel do professor!</p>
                    </div>
                )}
                {componenteAtivo === "disciplinas" && (
                    <div>
                        <h1 className="text-3xl font-semibold">Minhas Disciplinas</h1>
                        <p className="mt-4 text-lg">Aqui você pode ver as suas disciplinas.</p>
                    </div>
                )}
                {componenteAtivo === "aulas" && (
                    <div>
                        <h1 className="text-3xl font-semibold">Aulas</h1>
                        <p className="mt-4 text-lg">Visualize e edite suas aulas aqui.</p>
                    </div>
                )}
                {componenteAtivo === "adicionarAula" && (
                    <div>
                        <h1 className="text-3xl font-semibold">Adicionar Aula</h1>
                        <p className="mt-4 text-lg">Aqui você pode adicionar novas aulas.</p>
                    </div>
                )}
                {componenteAtivo === "perfil" && (
                    <div>
                        <h1 className="text-3xl font-semibold">Perfil</h1>
                        <p className="mt-4 text-lg">Aqui você pode editar suas informações pessoais.</p>
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
