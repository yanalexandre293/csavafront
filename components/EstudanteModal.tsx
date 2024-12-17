import Head from "next/head";
import styles from '@/app/admin/adminDashboard.module.css';

export default function EstudanteModal() {
    return (
        <div>
            <Head>
                <title>Cadastro de Estudantes</title>
                <meta name="description" content="Área para gerenciar estudantes." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                {/* Área Principal */}
                <div className={styles['area-principal']}>
                    <h1>Cadastro de Estudantes</h1>
                    <p>Gerencie os estudantes cadastrados no sistema. Adicione, edite ou remova estudantes conforme necessário.</p>
                    
                    {/* Botão para adicionar novo estudante */}
                    <button className={styles['add-button']}>Adicionar Novo Estudante</button>

                    {/* Tabela de Estudantes */}
                    <table className={styles['disciplinas-table']}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Disciplinas matriculadas</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Lucas Pereira</td>
                                <td>lucas.pereira@escola.com</td>
                                <td>Mirage</td>
                                <td>
                                    <button className={styles['action-button']}>Editar</button>
                                    <button className={styles['action-button']}>Excluir</button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Carla Nunes</td>
                                <td>carla.nunes@escola.com</td>
                                <td>Dust_2</td>
                                <td>
                                    <button className={styles['action-button']}>Editar</button>
                                    <button className={styles['action-button']}>Excluir</button>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Renato Silva</td>
                                <td>renato.silva@escola.com</td>
                                <td>Anubis</td>
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
