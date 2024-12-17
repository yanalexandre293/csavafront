import styles from '@/app/admin/adminDashboard.module.css';

export default function CadastroDisciplinas() {
    return (
        <div className={styles.container}>
            {/* Área Principal */}
            <div className={styles['area-principal']}>
                <h1>Cadastro de Disciplina</h1>
                <p>Adicione uma nova disciplina ao sistema preenchendo o campo abaixo.</p>
                
                {/* Formulário de Cadastro */}
                <form className={styles['form-cadastro']}>
                    <div className={styles['form-group']}>
                        <label htmlFor="nomeDisciplina">Nome da Disciplina</label>
                        <input
                            type="text"
                            id="nomeDisciplina"
                            name="nomeDisciplina"
                            className={styles['form-input']}
                            placeholder="Digite o nome da disciplina"
                        />
                    </div>

                    {/* Botão de Envio */}
                    <button type="submit" className={styles['add-button']}>
                        Cadastrar Disciplina
                    </button>
                </form>
            </div>
        </div>
    );
}