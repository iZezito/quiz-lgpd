import React, {useState} from 'react';
import sabeMuito from './sabe_muito.jpg';
import sabePouco from './sabe pouco.jpg';
import sabePoucoMais from './sabe_pouco_mais_que_o_basico.jpg';
import euSabo from './eu_sabo.jpg';

interface Questao {
    id: number;
    texto: string;
    opcoes: string[];
    respostaCorreta: number; // Índice da resposta correta
}

interface Resposta {
    id: number;
    index: number | null;
}

const questoes: Questao[] = [
    {
        "id": 1,
        "texto": "O que significa LGPD?",
        "opcoes": [
            "Lei Geral de Proteção Digital",
            "Lei Geral de Privacidade de Dados",
            "Lei Geral de Proteção de Dados Pessoais",
            "Lei de Garantia de Privacidade"
        ],
        "respostaCorreta": 2
    },
    {
        "id": 2,
        "texto": "Quem é responsável por fiscalizar o cumprimento da LGPD no Brasil?",
        "opcoes": [
            "Procon",
            "ANPD (Autoridade Nacional de Proteção de Dados)",
            "Ministério Público",
            "OAB (Ordem dos Advogados do Brasil)"
        ],
        "respostaCorreta": 1
    },
    {
        "id": 3,
        "texto": "Quais são os princípios fundamentais da LGPD?",
        "opcoes": [
            "Consentimento, Finalidade e Necessidade",
            "Transparência, Segurança e Responsabilização",
            "Confidencialidade, Consentimento e Rastreabilidade",
            "Privacidade, Consentimento e Transparência"
        ],
        "respostaCorreta": 1
    },
    {
        "id": 4,
        "texto": "O que é considerado dado pessoal sensível pela LGPD?",
        "opcoes": [
            "Nome e endereço",
            "CPF e RG",
            "Opinião política e orientação sexual",
            "Endereço de e-mail e número de telefone"
        ],
        "respostaCorreta": 2
    },
    {
        "id": 5,
        "texto": "Qual é a idade mínima para o tratamento de dados de crianças pela LGPD, sem a necessidade de consentimento parental?",
        "opcoes": [
            "12 anos",
            "14 anos",
            "16 anos",
            "18 anos"
        ],
        "respostaCorreta": 1
    },
    {
        "id": 6,
        "texto": "O que é o 'Encarregado' na LGPD?",
        "opcoes": [
            "Pessoa responsável por fiscalizar a ANPD",
            "Profissional de TI responsável pela segurança de dados",
            "Pessoa indicada pelo controlador para atuar como canal de comunicação com o titular dos dados e a ANPD",
            "Advogado especializado em privacidade de dados"
        ],
        "respostaCorreta": 2
    },
    {
        "id": 7,
        "texto": "Quais são as penalidades previstas pela LGPD para o descumprimento da legislação?",
        "opcoes": [
            "Advertência e multa",
            "Suspensão das atividades e prisão",
            "Multa e bloqueio de acesso",
            "Apenas advertência"
        ],
        "respostaCorreta": 0
    },
    {
        "id": 8,
        "texto": "O que é o 'Princípio da Finalidade' na LGPD?",
        "opcoes": [
            "Os dados devem ser utilizados apenas para os fins informados ao titular",
            "Os dados devem ser armazenados indefinidamente",
            "Os dados podem ser utilizados para qualquer finalidade sem consentimento do titular",
            "A finalidade dos dados não precisa ser informada ao titular"
        ],
        "respostaCorreta": 0
    },
    {
        "id": 9,
        "texto": "Qual é a definição correta de 'Tratamento de Dados Pessoais' na LGPD?",
        "opcoes": [
            "Qualquer ação realizada com dados, como coleta, armazenamento, uso e exclusão",
            "Apenas a coleta de dados pessoais",
            "Apenas o armazenamento de dados pessoais",
            "A utilização de dados pessoais sem o consentimento do titular"
        ],
        "respostaCorreta": 0
    },
    {
        "id": 10,
        "texto": "Quais são os direitos do titular dos dados previstos pela LGPD?",
        "opcoes": [
            "Apenas o direito de acesso",
            "Acesso, retificação, eliminação, oposição e portabilidade",
            "Apenas o direito de retificação",
            "Direito de acesso e bloqueio"
        ],
        "respostaCorreta": 1
    }
];


const YourComponent: React.FC = () => {
    const [indexRespostaAtual, setIndexRespostaAtual] = useState(0);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
    const [respostasUsario, setRespostasUsuario] = useState<Resposta[]>([]);
    const [respostasCorretas, setRespostasCorretas] = useState<number>(0);

    const handleNextQuestion = () => {
        if (indexRespostaAtual === questoes.length - 1) {
            inputQuestion(); // Adiciona a resposta antes de verificar
            verificarResostas(); // Verifica as respostas quando estiver na última pergunta
            return;
        }

        inputQuestion(); // Adiciona a resposta antes de mudar a pergunta
        setIndexRespostaAtual(indexRespostaAtual + 1);
        setOpcaoSelecionada(null);
    };

    const inputQuestion = () => {
        const response: Resposta = {id: indexRespostaAtual, index: null};
        if (opcaoSelecionada !== null) {
            response.index = opcaoSelecionada;
            // verificar se a pergunta já foi respondida
            const indexTeste = respostasUsario.findIndex((answer) => answer.id === indexRespostaAtual);
            if (indexTeste === -1) {
                // se não foi respondida, adiciona a resposta
                setRespostasUsuario([...respostasUsario, response]);
            } else {
                // se já foi respondida, atualiza a resposta
                const newAnswers = [...respostasUsario];
                newAnswers[indexTeste] = response;
                setRespostasUsuario(newAnswers);
            }
            console.log(`Pergunta ${indexRespostaAtual + 1}, Resposta selecionada: ${opcaoSelecionada}`);
        }

    }

    const handlePreviousQuestion = () => {
        if (indexRespostaAtual > 0) {
            setIndexRespostaAtual(indexRespostaAtual - 1);
            // Reinicia a resposta selecionada para a nova pergunta
        }
    }

    const verificarResostas = (): void => {

        respostasUsario.forEach((answer) => {
                if (answer.index === questoes[answer.id].respostaCorreta) {
                    setRespostasCorretas(anterior => anterior + 1);
                }
            }
        );
    }

    const resetarJogo = (): void => {
        setIndexRespostaAtual(0);
        setOpcaoSelecionada(null);
        setRespostasUsuario([]);
        setRespostasCorretas(0);
    }

    const currentQuestion: Questao = questoes[indexRespostaAtual];

    return (
        <div className="container mt-sm-5 my-1">
            <div className="question ml-sm-5 pl-sm-5 pt-2">
                <div className="py-2 h5">
                    <b>{currentQuestion.id}- {currentQuestion.texto}</b>
                </div>
                <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="opcoes">
                    {currentQuestion.opcoes.map((option, index) => (
                        <label key={index} className="options form-check">
                            {option}
                            <input
                                className="form-check-input"
                                type="radio"
                                name="radio"
                                checked={respostasUsario[indexRespostaAtual]?.index === index}
                                onChange={() => {
                                    setOpcaoSelecionada(index)

                                }}
                            />
                            <span className="checkmark"></span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="d-flex align-items-center pt-3">
                <div id="prev">

                    <button className="btn btn-primary m-2" onClick={handlePreviousQuestion}>Anterior</button>
                    { indexRespostaAtual === questoes.length - 1 && (
                        <button className="btn btn-danger" onClick={resetarJogo}>
                            Resetar
                        </button>
                    )}
                </div>
                <div className="ms-auto me-sm-5">
                    <button className="btn btn-success" onClick={handleNextQuestion}>
                        {indexRespostaAtual === questoes.length - 1 ? 'Verificar respostas' : 'Próxima'}
                    </button>
                </div>
            </div>
            <div>
                {respostasCorretas !== 0 && respostasCorretas > 7 && (
                    <div className="d-flex justify-content-center">
                        <div className="card">
                            <div className="card-header text-center">
                                <h2>{respostasCorretas}/10</h2>
                            </div>
                            <div>
                                <img src={euSabo} alt="Sabe muito" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                )}
                { respostasCorretas !== 0 && respostasCorretas > 5 && respostasCorretas <= 7 && (
                    <div className="d-flex justify-content-center">
                        <div className="card">
                            <div className="card-header text-center">
                                <h2>{respostasCorretas}/10</h2>
                            </div>
                            <div>
                                <img src={sabeMuito} alt="Sabe muito" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                )}
                { respostasCorretas !== 0 && respostasCorretas > 3 && respostasCorretas <= 5 && (
                    <div className="d-flex justify-content-center">
                        <div className="card">
                            <div className="card-header text-center">
                                <h2>{respostasCorretas}/10</h2>
                            </div>
                            <div>
                                <img src={sabePoucoMais} alt="Sabe muito" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                )}
                { respostasCorretas !== 0 && respostasCorretas <= 3 && (
                    <div className="d-flex justify-content-center">
                        <div className="card">
                            <div className="card-header text-center">
                                <h2>{respostasCorretas}/10</h2>
                            </div>
                            <div>
                                <img src={sabePouco} alt="Sabe muito" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YourComponent;
