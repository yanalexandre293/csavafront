"use client";

import Head from "next/head";
import '@/app/globals.css';
import { useState } from "react";
import GerenciarDisciplinas from "@/components/disciplinas/ListagemDisciplinas";
import GerenciarAulas from "@/components/AulaModal";
import GerenciarProfessores from "@/components/ProfessorModal";
import GerenciarEstudantes from "@/components/EstudanteModal";

export default function AdminDashboard() {
    const [componenteAtivo, setComponenteAtivo] = useState("dashboard");

    return (
        <div className="flex min-h-screen">
            <Head>
                <title>Dashboard - Admin</title>
                <meta name="description" content="Admin Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Menu Lateral */}
            <div className="w-64 bg-gray-800 text-white p-6">
                <h2 className="text-2xl font-semibold">Painel Admin</h2>
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
                    onClick={() => setComponenteAtivo("professores")}
                >
                    Professores
                </button>
                <button
                    className="mt-2 px-6 py-2 bg-gray-600 text-white rounded-md w-full text-left"
                    onClick={() => setComponenteAtivo("estudantes")}
                >
                    Estudantes
                </button>
            </div>

            {/* Área Principal */}
            <div className="flex-grow p-6 bg-gray-100">
                {componenteAtivo === "dashboard" && (
                    <div>
                        <h1 className="text-3xl font-semibold">Dashboard</h1>
                        <p className="mt-4 text-lg">Seja bem-vindo ao painel admin!</p>
                    </div>
                )}
                {componenteAtivo === "disciplinas" && <GerenciarDisciplinas />}
                {componenteAtivo === "professores" && <GerenciarProfessores />}
                {componenteAtivo === "estudantes" && <GerenciarEstudantes />}
                {componenteAtivo === "aulas" && <GerenciarAulas />}
            </div>
        </div>
    );
}
