//MANIPULA ARRAYS COM USESTATES: 
//A manipulação de arrays é feita CRIANDO UM NOVO ARRAY, podendo ser com o método map(), com filter, criando um novo array dentro do setter,
// independente da ação, (adição, exclusão), em ambos os casos deve ser feito um novo array que reflita a manipulação desejada.
//O ARRAY ORIGINAL NAO DEVE SER MODIFICADO NUNCA!!!

"use client";
import { useState } from "react";
import { ToDoItem } from "../types/ToDoItem";

const Page = () => {

    const [itemInput, setItemInput] = useState("");         //inicia 'itemInput' como vazio ""

    const [list, setList] = useState<ToDoItem[]>([          //inicia o array 'list' com os objetos abaixo
        { label: "Fazer dever de casa", checked: false },
        { label: "Comprar o bolo", checked: false }
    ]);

    //AQUI É A CRIAÇÃO DO NOVO ARRAY - Quando o botão for clcado dispara essa função 'clicarBotao'
    const clicarBotao = () => {

        if(itemInput.trim() ==="") return;      //se 'itemInput' tiver vazio, retorna, sai da função.

        setList([
            ...list,                                        //CLONA TODO O ARRAY ORIGINAL 'list'
            {label: itemInput, checked: false}              //E INCLUI NOVOS ITENS AO ARRAY
        ]);  //valor digitado no input é armazenado em 'itemInput' e passado para cá!

        setItemInput("");                               //limpa o campo do input após adição de novo item
    }

    const deletarItem = (index: number) => {
        //filtra os itens do array 'list' e mantem no novo array
        // todos os itens cujo índice key não seja igual ao index trazido pelo botão
        const newList = list.filter((item, key) => key !== index);
        setList(newList);
    }

    //Função que inverse o checkbox trazendo o index do item que foi clicado
    const toggleItem = (index:number) => {      
        let newList = [...list];                //clona o array original 'list' e salva em 'newList'

        for(let i in newList) {                 //itera os itens do novo array 'newList'
            if(index === parseInt(i)) {         //se o index trazido for igual ao 'i' iterado
                newList[i].checked = !newList[i].checked;   //inverte o seu checkbox
            }
        }

        setList(newList)
    }

                                          
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center ">
            <h1 className="text-4xl">Lista de Tarefas:</h1>
            
            <div className="flex w-full max-w-lg my-3 p-4 rounded-md bg-gray-400 border-2 border-gray-200">
                <input type="text" placeholder="o que deseja fazer?"
                    className="flex-1 border py-2 px-3 text-2xl text-black rounded-md mr-3 bg-white"
                    value={itemInput}
                    onChange={event => setItemInput(event.target.value)}
                />
                 {/*- fixa o valor do campo ao valor do estado,
                    - seta o valor do estado recuperando o valor digitado */}

                <button
                    className="px-3 cursor-pointer font-semibold text-white"
                    onClick={clicarBotao}
                    >Adicionar
                </button>
            </div>

            <p className="my-3 italic">Quantidade de itens na lista: {list.length}</p>

            <ul className="w-full max-w-lg list-disc pl-5 ">
                {list.map((item, index)=> (
                    <li key={index} className="text-lg"> 
                        <input type="checkbox" className="w-5 h-5 mr-2"
                            checked={item.checked} 
                            onClick={() => toggleItem(index)}                            
                        />

                        {item.label} - 
                        <button className="hover:underline cursor-pointer"
                            onClick={() => deletarItem(index)}> 
                             [deletar] 
                        </button> 
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Page;