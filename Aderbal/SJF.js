
function waiting_time(processos){/*definindo a qnt. tempo de servico baseado na qnt de processos*/
    lista1 = [] 
    lista2 = []
    for(let i=0;i<processos.length;i++){
      lista1.push(0)}
    for(let i=0;i<processos.length;i++){
      lista2.push(0)}
    /* definindo tamanho da waiting list*/
    let tempo_servico = lista1
    let wt = lista2
    for(let i = 1; i < processos.length; i++){
      tempo_servico [i] = parseInt(tempo_servico[i-1] + processos[i - 1] [2])
      wt [i] = parseInt(tempo_servico [i] - processos [i] [1])
      if (wt [i] < 0){
        wt [i] = 0}}
    return wt}
  
  
  
  function turn_around_time(processos){
    /*turnaround time = burstTime + waitingTime*/
    lista = []
    for (i=0;i<processos.length;i++){
      lista.push(0)}
    let tat = lista
    let wt = waiting_time(processos)
    for (let i = 0; i < processos.length; i++){
      tat [i] = parseInt(processos [i] [2] + wt [i])}
    return tat}
  
  
  
  function average_tat(processos){/* Retornando o tempo medio Soma_dos_tat / qnt.Processos*/
    let tat = turn_around_time(processos).reduce((a,b) => a+b,0)
    return (tat / processos.length)}
  

  
  function average_wt(processos){
    let wt = waiting_time(processos).reduce((a,b) => a+b,0)
    return (wt / processos.length)}
  
  
  
  function SJF(processos){
    for(let i = 0; i < processos.length; i++){
     /* Ordenando por Job(Burst time) mais curto */ 
      for (let x = 0; x < processos.length - 1; x++){
        if (processos [x] [2] > processos [x + 1] [2]){
          processos [x], processos [x + 1] = processos [x + 1], processos [x]}}}
    return processos}
  
  
  
  console.log(":::::::::::::::::::::::::::::::::::SJF:::::::::::::::::::::::::::::::::::")
  
  processos = []
  qnt_processos = parseInt(prompt("Quantidade de processos: "))
  for (let i = 0; i < qnt_processos; i++){
    pid = "P" + i
    at = parseInt(prompt("Arrival Time: "))
    bt = parseInt(prompt("Burst Time: "))
    processos.push([pid, at, bt])
  }

  
  let wt = waiting_time(processos)
  let tat = turn_around_time(processos)
  let avg_wt = average_wt(processos)
  let avg_tat = average_tat(processos)
  
  console.log("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t| Completion Time |\n\n")
  
  
  for (let proc = 0; proc < processos.length; proc++){
    console.log(processos[proc][0] + "\t\t\t" + processos[proc][2] + "\t\t\t" + processos[proc][1] + "\t\t\t" + wt[proc] + "\t\t\t" + tat[proc] + "\t\t\t" + parseInt (tat[proc] + processos[proc][1]) + "\n")
  }
  /*###########################################
# Estrutura da Lista de Processos
# 
#   processos = [
#               [id, at, bt],
#               [id2, at2, bt2]
#               ]
#
#   id = id do processo
#   at = Arrival Time
#   bt = Burst Time
############################################*/
  console.log("Average Waiting Time: " + avg_wt)
  console.log("Average Turn-Around Time: " + avg_tat)
  console.log("\n:::::::::::::::::::::::DEPOIS::::::::::::::::::::::\n")
  processos = SJF(processos)
  waiting_time(processos)
  tat = turn_around_time(processos)
  avg_wt = average_wt(processos)
  avg_tat = average_tat(processos)
  console.log(processos)
  
  console.log("| Process |\t| Burst Time |\t\t| Arrival Time |\t| Waiting Time |\t| Turn-Around Time |\t| Completion Time |\n\n")
  for(let proc = 0; proc < processos.length; proc++){
    console.log(processos[proc][0] + "\t\t\t" + processos[proc][2] + "\t\t\t" + processos[proc][1] + "\t\t\t" + wt[proc] + "\t\t\t" + tat[proc] + "\t\t\t" + parseInt(tat[proc] + processos[proc][1]) + "\n")
  }
  console.log("Average Waiting Time: " + avg_wt)
  console.log("Average Turn-Around Time: " + avg_tat)
  /*pior program ever*/
  