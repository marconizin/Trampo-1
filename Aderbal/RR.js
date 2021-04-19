/*Ultimo programa pra fazer*/
function round_robin(processos, quantum, qnt_processos) {/*função de tempo compartilhado por cada processo da fila*/ 
  let lista1 = []/*lista para alocar processos*/
  let lista2 = []

  for (let i = 0; i < qnt_processos; i++) {
    lista1.push(0)
    bt_restante = lista1
  }
  for (let i = 0; i < qnt_processos; i++) {
    bt_restante[i] = processos[i][2]
  }
  for (let i = 0; i < qnt_processos; i++) {
    lista2.push(0)
    wt = lista2
  }

  let tempo = 0 /*tempo instanciado em 0 será adicionado a wt*/ 
  let overhead = 1 /*valor suposto compartilhado no processo*/

  while (true) {/*verifica se a desgraça do processo foi executado ou naum*/
    finalizados = true
    for (let i = 0; i < qnt_processos; i++) {
      tempo += overhead/*troca entre processos*/
      if (bt_restante[i] > 0) {/*se for maior que 0,ainda há processos a ser finalizado*/
        finalizados = false
          /*vai desgraça*/
        if (bt_restante[i] > quantum) {
          tempo += quantum
          bt_restante[i] -= quantum
        }
        else {
          tempo += bt_restante[i]
          wt[i] = tempo - processos[i][2]
          bt_restante[i] = 0
        }/*pra q colocar quantum,nao faz sentido colocar uma variavel instanciada ao tempo,se o tempo não é constante....lmao fuck it*/
      }
    }
    if (finalizados == true) {/*quando o processo for totalmente finalizado*/
      break
    }
  }
  return wt/*Retorna o tempo de espera*/ 
}

function turn_around_time(processos, wt, qnt_processos) {
  lista3 = []
  for (let i = 0; i < qnt_processos; i++) {
    lista3.push(0)
  }
  let tat = lista3
  for (let i = 0; i < qnt_processos; i++) {
    tat[i] = parseInt(processos[i][2] + wt[i])
  }
  return tat
}

function average_tat(processos) {/*media do turn around*/
  let qnt_proc = processos.length
  let tat = (turn_around_time(processos).reduce((a, b) => a + b, 0))
  return (tat / qnt_proc)
}

function average_wt(processos) {/*media de waiting time*/
  let qnt_proc = processos.length
  let waiting_time = round_robin(wt).reduce((a, b) => a + b, 0)
  return (waiting_time / qnt_proc)
}


let processos = []
let p = "P"
console.log("Algoritmo Round Robin")
let qnt_processos = parseInt(prompt("Qnt de Processos: "))
for (let i = 0; i < qnt_processos; i++) {
  let pid = p + i
  let at = parseInt(prompt("Arrival Time: "))
  let bt = parseInt(prompt("Burst Time: "))
  processos.push([pid, at, bt])
}

/*pq krls é quantum?*/ 
let quantum = parseInt(prompt("Informe o tempo instanciado: "))
/*waiting time*/
wt = round_robin(processos, quantum, qnt_processos)
/*turn around time*/
tat = turn_around_time(processos, wt, qnt_processos)
/*media de todos os turn_around_time*/
avg_tat = average_tat(tat, qnt_processos)
/*media de todos os waiting time*/
avg_wt = average_wt(wt, qnt_processos)

console.log("WT =", wt, "\nTAT =", tat, "\nAVG_TAT =", avg_tat, "\nAVG_WT = ", avg_wt)


console.log("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t\n\n")
for (let proc = 0; proc < processos.length; proc++) {
  console.log(processos[proc][0], "\t\t\t", processos[proc][2], "\t\t\t", processos[proc][1], "\t\t\t", wt[proc], "\t\t\t", tat[proc], "\t\t\t\n")
}
console.log("Average Waiting Time : ", avg_wt)
console.log("Average Turn-Around Time: ", avg_tat)