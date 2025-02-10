'use client';

import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
    const [loginModal, setLoginModal] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function adicionarProfessor(nome: string, email: string, senha: string) {
        console.log(nome, email, senha);
        try{
            await axios.post("http://localhost:5147/Professor", { Nome: nome, Email: email, Senha: senha })
            .then(res => {
                console.log(JSON.stringify(res));
                if (res.status === 200) return true;
            });
        }catch(error){
            console.error("Erro de conexão com o backend:", error);
            return false;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
            {/* Card de Login */}
            {!loginModal && (
                <div className="bg-gray-800  rounded-lg animate-fadeIn p-12">
                <div className="text-center">
                    <div className="flex justify-center pb-12">
                        {/* Logo do AVA */}
                        <Image
                            src='https://styles.redditmedia.com/t5_6himry/styles/communityIcon_e2foshiclvyd1.png'
                            alt="AVA Logo"
                            width={100}
                            height={100}
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo ao AVA</h1>
                    <p className="text-gray-400 mb-6">Faça login para acessar sua conta</p>
                    <button className="flex items-center justify-center w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-md px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => signIn('google')}>
                        <div className="w-6 h-6 mr-2">
                            <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                            <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                            ></path>
                            <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                            ></path>
                            <path
                                fill="#FBBC05"
                                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                            ></path>
                            <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                            ></path>
                            <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </div>
                        <span className="text-gray-700 font-medium">Login com o Google</span>
                    </button>
                    <div className="text-gray-400 mt-4 text-[13px]">
                        Se você é professor entre por aqui.
                        <button className="bg-white border border-gray-300 rounded-lg shadow-md px-2 py-2 hover:bg-gray-100 transition mt-2 ml-2"
                            onClick={() => {
                                setLoginModal(true);
                            }}>
                            <Image src="https://icons.veryicon.com/png/o/education-technology/educational-institution-icon/teacher-7.png" alt="Arrow" width={24} height={24} />
                        </button>
                    </div>

                </div>
            </div>
            )}

            {/* Modal de Login */}
            {loginModal && (
                <div className="bg-gray-800  rounded-lg animate-fadeIn p-12">
                    <div className="text-center">
                        <div className="flex justify-center pb-12">
                            {/* Logo do AVA */}
                            <Image
                                src='https://styles.redditmedia.com/t5_6himry/styles/communityIcon_e2foshiclvyd1.png'
                                alt="AVA Logo"
                                width={100}
                                height={100}
                            />
                        </div>

                        <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo Professor</h1>
                        <p className="text-gray-400 mb-6">Faça login para acessar sua conta</p>

                        <input type="text" placeholder="Nome" className="w-full max-w-xs bg-gray-600 border border-gray-300 rounded-lg shadow-md px-4 py-2 hover:bg-gray-100 transition"
                            onChange={(e) => setNome(e.target.value)}/>
                        <input type="email" placeholder="Email" className="w-full max-w-xs bg-gray-600 border border-gray-300 rounded-lg shadow-md px-4 py-2 hover:bg-gray-100 transition"
                            onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Senha" className="w-full max-w-xs bg-gray-600 border border-gray-300 rounded-lg shadow-md px-4 py-2 hover:bg-gray-100 transition mt-4"
                            onChange={(e) => setSenha(e.target.value)}/>
                        <button className="w-full max-w-xs bg-gray-600 border border-gray-300 rounded-lg shadow-md px-4 py-2 hover:bg-gray-100 transition mt-4"
                            onClick={() => {
                                adicionarProfessor(nome, email, senha);
                            }}>
                            Entrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}