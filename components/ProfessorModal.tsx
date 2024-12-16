import Head from "next/head";
import styles from '../app/admin/adminDashboard.module.css';

export default function ProfessorModal() {
    return (
        <div>
            <Head>
                <title>Cadastro de Professores</title>
                <meta name="description" content="Área para gerenciar professores." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                {/* Área Principal */}
                <div className={styles['area-principal']}>
                    <h1>Cadastro de Professores</h1>
                    <p>Gerencie os professores cadastrados no sistema. Adicione, edite ou remova professores conforme necessário.</p>
                    
                    {/* Botão para adicionar novo professor */}
                    <button className={styles['add-button']}>Adicionar Novo Professor</button>

                    {/* Tabela de Professores */}
                    <table className={styles['disciplinas-table']}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Ana Silva</td>
                                <td>ana.silva@escola.com</td>
                                <td>
                                    <button className={styles['action-button']}>Editar</button>
                                    <button className={styles['action-button']}>Excluir</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>João Souza</td>
                                <td>joao.souza@escola.com</td>
                                <td>
                                    <button className={styles['action-button']}>Editar</button>
                                    <button className={styles['action-button']}>Excluir</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Maria Oliveira</td>
                                <td>maria.oliveira@escola.com</td>
                                <td>
                                    <button className={styles['action-button']}>Editar</button>
                                    <button className={styles['action-button']}>Excluir</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
