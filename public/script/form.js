import { gerarCVHtml } from '/src/templates/template1.js' // 



const data = {}; // armazena dados inseridos pelo usuario
conteinerCV.innerHTML = gerarCVHtml(data); // inserindo os dados no template



// Ao lado do formulario terá um exemplo visual do currículo, onde o usuario poderá clicar e vericiar como a 
// infomação cedida a plafaforma esta sendo organizado no template de curriculo
document.querySelector('form').addEventListener('submit', function(e) { // Atualiza os dados no template a cada Step/Passo do Formulario
    e.preventDefault();
    
    const form = new FormData(this);
    for (const [name, value] of form.entries()) {
        data[name] = value;
    };

    conteinerCV.innerHTML = gerarCVHtml(data);
});


// Expandir exemplo visual
const conteinerVisuCv = document.querySelector('#conteinerCV').addEventListener('click', function(e) {
    e.preventDefault();

    conteinerCV.classList.toggle('conteinerCVExpandido');
});



// Buscando tornar facil a criação de curriculo, o preenchimento de dados profissionais será divido em Steps/Passos. O codigo a seguir
// controla o fluxo do formulario 
const stepsProgress = document.querySelectorAll('.stepNumber') // identificando qual Passo o usuario está
const steps = document.querySelectorAll('.step') // puxando a estrutura HTML do Step/Passo
let currentStep = 0 // Step/Passo atual


// Mostra a Step
function showStep(index) {
    steps.forEach((step, i) => {
        step.classList.toggle('active', i === index)
    });

    stepsProgress.forEach((stepProgress, i) => {
        stepProgress.classList.toggle('stepActive', i === index)
    });
}

// Verifica se o usuario quer avançar para proxima step
document.querySelectorAll('.next-step').forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    })
})

// Caso usuario queria retroceder a Step
document.querySelectorAll('.prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    })
})



// Verificar evento de Finalização para redirecionar para pagina de download
document.querySelector('.finalizar').addEventListener('click', function(e) {
    e.preventDefault();

    localStorage.setItem('dadosCV', JSON.stringify(data));
    window.location.href = './gerarCV.html';
});


