console.log("olá classe!");
console.log("Exemplo");

// let nome = prompt("Digite o seu nome:")
// console.log(nome)
// window.alert("Seu nome é " + nome)

console.log("Atividade 1:")

for(let i = 1; i <= 100; i = i + 2){
    console.log(i);
}

for(let i = 1; i <= 100; i += 2){
    console.log(i);
}

for(let i = 1; i <= 100; i++){
    if(i%2 != 0){
        console.log(i);
    }
}

let i = 1;
while(i <= 100){
    console.log(i);
    i += 2;
}