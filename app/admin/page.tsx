"use client";

import Head from "next/head";
import styles from './adminDashboard.module.css';
import GerenciarDisciplinas from "@/components/DisciplinaModal";
import GerenciarAulas from "@/components/AulaModal";
import GerenciarProfessores from "@/components/ProfessorModal";
import GerenciarEstudantes from "@/components/EstudanteModal";
import { useState } from "react";

export default function AdminDashboard() {
    const [componenteAtivo, setComponenteAtivo] = useState("dashboard");

    return (
        <div>
            <Head>
                <title>Dashboard - Admin</title>
                <meta name="description" content="Admin Dashboard"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                {/* Menu Lateral */}
                <div className={styles['menu-lateral']}>
                    <h2>Painel Admin</h2>
                    <button className={styles['menu-button']} onClick={() => setComponenteAtivo("disciplinas")}>Disciplinas</button>
                    <button className={styles['menu-button']} onClick={() => setComponenteAtivo("aulas")}>Aulas</button>
                    <button className={styles['menu-button']} onClick={() => setComponenteAtivo("professores")}>Professores</button>
                    <button className={styles['menu-button']} onClick={() => setComponenteAtivo("estudantes")}>Estudantes</button>
                </div>

                {/* Área Principal */}
                <div className={styles['area-principal']}>
                    {componenteAtivo === "dashboard" && (
                        <div>
                            <h1>Dashboard</h1>
                            <p>Seja bem-vindo ao painel admin!</p>
                        </div>
                    )}
                    {componenteAtivo === "disciplinas" && <GerenciarDisciplinas />}
                    {componenteAtivo === "professores" && <GerenciarProfessores />}
                    {componenteAtivo === "estudantes" && <GerenciarEstudantes />}
                    {componenteAtivo === "aulas" && <GerenciarAulas />}
                </div>
            </div>
        </div>
    );
}
