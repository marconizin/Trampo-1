/*  Codiguzin EDF*/

function hiper_periodo (processos, quantidade){ /* Função de hiper periodo recebe o valor do maior periodo */
    temp = 0/*tempo instanciado em 0*/
    for (let i = 0;i<quantidade; i++){
        if (processos [i] [3] > temp){
            temp = processos [i] [3]
            console.log(temp)
        }
    }
}

function escolher_menor_deadline(processos,quantidade,deadlines){/*Função escolhe o processo por ordem de estado semi pronto*/ 
    menor_deadline = 10000
    escolhido = -1
    for (let i = 0;i<quantidade; i++){
        if (deadlines [i] < menor_deadline){
        menor_deadline = deadlines [i]
        escolhido = i        
    }}
    return escolhido/*retorna o ultimo processo da fila*/
}


function edf(processos, quantidade){ 

    relogio = 0 /*clock resetado*/ 
    lista1 = [0,0,0] 
    lista2 = [0,0,0]
    lista3 = [0,0,0]
    deadlines = lista1 /*processo com limite de tempo */ 
    for (let i = 0;i<quantidade; i++){
        deadlines [i] = processos [i][2]
    }
    periodos = lista2 /*periodo em execução*/ 
    for (let i = 0;i<quantidade; i++){
        periodos [i] = processos [i][3]
    }
    console.log("Processos: ", processos, "\n")
    console.log("Deadlines: ", deadlines,"\n")
    console.log("Periodos: ", periodos, "\n")

    contador = lista3
    Loop = true

    while (Loop){
        escolhido = escolher_menor_deadline(processos, quantidade, deadlines)
        console.log("Processos escolhido: ", escolhido, "\n")
        if (periodos[escolhido] >= relogio){
                relogio += processos[escolhido][1]
                console.log("Processos P", escolhido, " executando...")
                console.log("Relogio: ", relogio)
                console.log("Burst Time do Processo P1 = tempo em limite de execução(execução): ", processos [escolhido] [1], "\n")

                console.log("Deadline anterior do Processo: ", deadlines [escolhido])
                deadlines [escolhido] += processos [escolhido] [3]
                console.log("Deadline do Processo P ", escolhido, " Atualizada", deadlines [escolhido], "\n")
                
                console.log("Periodo anterior do Processo: ", periodos [escolhido])
                periodos[escolhido] += processos[escolhido][3]
                console.log("Periodo do Processo P", escolhido, " Atualizado: ", periodos [escolhido], "\n\n\n\n")
                contador[escolhido] += 1
                }
            if (relogio >= 20){Loop = false}/*o clock atinge o valor maior que 20 execuções e finaliza o loop*/ 
    }    
        for (let i = 0;i<quantidade; i++){ /*Exibir o processo e o numero de execuçoes*/ 
            console.log("O Processo ", [i], " Executou ", contador [i], " vezes")}
        }
    


processos = [
    [0, 3, 7, 20],
    [1, 2, 4, 5],
    [2, 2, 8, 10]
    ]

    quantidade = processos.length /*quantidade de processos instanciada pelo tamanho*/ 
    edf(processos, quantidade)/*instancia algoritmo com parametros do programa*/
    hiper_periodo(processos,quantidade)