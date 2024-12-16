import Head from "next/head";
import styles from '../app/admin/adminDashboard.module.css';

export default function AulaModal() {
    return (
        <div>
            <Head>
                <title>Cadastro de Aulas</title>
                <meta name="description" content="Área para gerenciar aulas." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                {/* Área Principal */}
                <div className={styles['area-principal']}>
                    <h1>Cadastro de Aulas</h1>
                    <p>Gerencie as aulas cadastradas no sistema. Adicione, edite ou remova aulas conforme necessário.</p>
                    {/* Botão para adicionar nova disciplina */}
                    <button className={styles['add-button']}>Adicionar Nova Aula</button>
                    {/* Tabela de Disciplinas */}
                    <table className={styles['disciplinas-table']}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Disciplina</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Domínio meio TR</td>
                                <td>Mirage</td>
                                <td>
                                    <button className={styles['action-button']}>Editar</button>
                                    <button className={styles['action-button']}>Excluir</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Entradas A TR</td>
                                <td>Mirage</td>
                                <td>
                                    <button className={styles['action-button']}>Editar</button>
                                    <button className={styles['action-button']}>Excluir</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Defesa A CT</td>
                                <td>Dust_2</td>
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