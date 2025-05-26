// Variáveis globais
let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;
let timer;
let seconds = 0;
let minutes = 0;
let isPlaying = false;
let lastPairFound = false;

// Elementos DOM
const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const playAgainButton = document.getElementById('play-again-button');
const rankingButton = document.getElementById('ranking-button');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const finalTimeElement = document.getElementById('final-time');
const congratulationsModal = document.getElementById('congratulations');
const messageBox = document.getElementById('message-box');
const behaviorMessage = document.getElementById('behavior-message');
const closeMessageButton = document.getElementById('close-message');
const randomEcoMessage = document.getElementById('random-eco-message');
const rankingContainer = document.getElementById('ranking-container');
const rankingList = document.getElementById('ranking-list');
const closeRankingButton = document.getElementById('close-ranking-button');
const adminButton = document.getElementById('admin-button');
const adminContainer = document.getElementById('admin-container');
const adminLogin = document.getElementById('admin-login');
const adminPanel = document.getElementById('admin-panel');
const adminPassword = document.getElementById('admin-password');
const adminLoginButton = document.getElementById('admin-login-button');
const adminList = document.getElementById('admin-list');
const closeAdminButton = document.getElementById('close-admin-button');
const nameForm = document.getElementById('name-form');
const playerNameInput = document.getElementById('player-name');
const saveScoreButton = document.getElementById('save-score-button');
const skipScoreButton = document.getElementById('skip-score-button');

// Array com os nomes das imagens
const cardImages = [
    'arvore',
    'rio_limpo',
    'reciclagem',
    'sol_sorridente',
    'planta_crescendo',
    'bicicleta',
    'animal_feliz',
    'lixeira_reciclavel'
];

// Mensagens de comportamento ambiental para cada carta
const environmentalBehaviors = {
    'arvore': 'Plante árvores! Elas purificam o ar, fornecem sombra e são o lar de muitos animais.',
    'rio_limpo': 'Não jogue lixo nos rios e praias. A água limpa é essencial para todos os seres vivos!',
    'reciclagem': 'Separe o lixo para reciclagem. Materiais como papel, plástico e vidro podem ser transformados em novos produtos!',
    'sol_sorridente': 'Use energia solar sempre que possível. É uma fonte de energia limpa e renovável!',
    'planta_crescendo': 'Cuide das plantas da sua casa ou escola. Elas melhoram o ar que respiramos!',
    'bicicleta': 'Use bicicleta ou transporte público. Isso ajuda a reduzir a poluição do ar!',
    'animal_feliz': 'Respeite os animais e seus habitats. Todos os seres vivos são importantes para o equilíbrio da natureza!',
    'lixeira_reciclavel': 'Jogue o lixo sempre na lixeira correta. Isso evita a poluição do solo e da água!'
};

// Mensagens aleatórias sobre preservação ambiental para o final do jogo
const randomEcoTips = [
    'Economize água! Feche a torneira enquanto escova os dentes e tome banhos mais curtos.',
    'Desligue as luzes e aparelhos eletrônicos quando não estiver usando. Isso economiza energia!',
    'Reutilize objetos antes de jogá-los fora. Uma garrafa plástica pode virar um vaso de planta!',
    'Evite usar produtos descartáveis como copos e talheres de plástico. Prefira os reutilizáveis!',
    'Ajude a cuidar das áreas verdes da sua cidade. Parques e praças são importantes para todos!',
    'Não desperdice comida. Planeje suas refeições e aproveite as sobras de forma criativa!',
    'Prefira produtos com menos embalagens. Isso reduz a quantidade de lixo que produzimos!',
    'Participe de mutirões de limpeza em praias, rios e parques da sua cidade!',
    'Ensine seus amigos e familiares sobre a importância de cuidar do meio ambiente!',
    'Plante uma horta em casa. Você terá alimentos frescos e ajudará o planeta!'
];

// Sons do jogo
const sounds = {
    flip: new Audio('sounds/flip.mp3'),
    match: new Audio('sounds/match.mp3'),
    success: new Audio('sounds/success.mp3'),
    wrong: new Audio('sounds/wrong.mp3')
};

// Senha do painel de administração
const ADMIN_PASSWORD = "admin2025";

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar elementos DOM
    initializeDOM();
    
    // Pré-carregar sons
    preloadSounds();
    
    // Event listeners para os botões
    addEventListeners();
    
    // Carregar ranking
    loadRanking();
});

// Função para inicializar elementos DOM
function initializeDOM() {
    // Garantir que os elementos DOM estão disponíveis
    if (!messageBox) {
        console.error('Elemento messageBox não encontrado!');
        // Criar o elemento se não existir
        const messageBoxHTML = `
            <div id="message-box" class="message-box">
                <div class="message-content">
                    <p id="behavior-message"></p>
                    <button id="close-message" class="btn-small">Entendi!</button>
                </div>
            </div>
        `;
        document.querySelector('.container').insertAdjacentHTML('beforeend', messageBoxHTML);
        
        // Atualizar referências
        messageBox = document.getElementById('message-box');
        behaviorMessage = document.getElementById('behavior-message');
        closeMessageButton = document.getElementById('close-message');
    }
    
    if (!congratulationsModal) {
        console.error('Elemento congratulationsModal não encontrado!');
        // Criar o elemento se não existir
        const congratulationsHTML = `
            <div id="congratulations" class="congratulations">
                <div class="congratulations-content">
                    <h2>Parabéns!</h2>
                    <p>Você encontrou todos os pares!</p>
                    <p>Tempo: <span id="final-time">00:00</span></p>
                    <div class="eco-tip">
                        <h3>Dica Ambiental:</h3>
                        <p id="random-eco-message"></p>
                    </div>
                    <button id="play-again-button" class="btn">Jogar Novamente</button>
                </div>
            </div>
        `;
        document.querySelector('.container').insertAdjacentHTML('beforeend', congratulationsHTML);
        
        // Atualizar referências
        congratulationsModal = document.getElementById('congratulations');
        finalTimeElement = document.getElementById('final-time');
        randomEcoMessage = document.getElementById('random-eco-message');
        playAgainButton = document.getElementById('play-again-button');
    }
}

// Função para adicionar event listeners
function addEventListeners() {
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
    playAgainButton.addEventListener('click', restartGame);
    closeMessageButton.addEventListener('click', closeMessage);
    rankingButton.addEventListener('click', showRanking);
    closeRankingButton.addEventListener('click', closeRanking);
    adminButton.addEventListener('click', showAdminLogin);
    adminLoginButton.addEventListener('click', validateAdminLogin);
    closeAdminButton.addEventListener('click', closeAdmin);
    saveScoreButton.addEventListener('click', saveScore);
    skipScoreButton.addEventListener('click', skipScore);
    
    // Adicionar event listener para tecla ESC para fechar modais
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (messageBox.classList.contains('show')) {
                closeMessage();
            }
            if (rankingContainer.classList.contains('show')) {
                closeRanking();
            }
            if (adminContainer.classList.contains('show')) {
                closeAdmin();
            }
        }
    });
}

// Função para pré-carregar sons
function preloadSounds() {
    // Ajustar volume dos sons
    sounds.flip.volume = 0.3;
    sounds.match.volume = 0.5;
    sounds.success.volume = 0.5;
    sounds.wrong.volume = 0.3;
    
    // Pré-carregar sons
    sounds.flip.load();
    sounds.match.load();
    sounds.success.load();
    sounds.wrong.load();
}

// Função para iniciar o jogo
function startGame() {
    // Esconder botão de iniciar e mostrar botão de reiniciar
    startButton.style.display = 'none';
    restartButton.style.display = 'inline-block';
    
    // Resetar variáveis
    matches = 0;
    seconds = 0;
    minutes = 0;
    lastPairFound = false;
    scoreElement.textContent = '0';
    timerElement.textContent = '00:00';
    isPlaying = true;
    
    // Iniciar o timer
    startTimer();
    
    // Criar e embaralhar as cartas
    createCards();
}

// Função para reiniciar o jogo
function restartGame() {
    // Esconder modais
    if (congratulationsModal) {
        congratulationsModal.classList.remove('show');
    }
    
    if (messageBox) {
        messageBox.classList.remove('show');
    }
    
    // Limpar o tabuleiro
    gameBoard.innerHTML = '';
    
    // Parar o timer atual
    clearInterval(timer);
    
    // Iniciar novo jogo
    startGame();
}

// Função para criar as cartas
function createCards() {
    // Duplicar o array de imagens para criar pares
    const cardPairs = [...cardImages, ...cardImages];
    
    // Embaralhar o array
    const shuffledCards = shuffle(cardPairs);
    
    // Limpar o tabuleiro
    gameBoard.innerHTML = '';
    
    // Criar elementos de carta para cada imagem
    shuffledCards.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        
        const img = document.createElement('img');
        img.src = `images/${image}.png`;
        img.alt = image.replace('_', ' ');
        
        cardBack.appendChild(img);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        
        // Adicionar evento de clique
        card.addEventListener('click', flipCard);
        
        // Adicionar ao tabuleiro
        gameBoard.appendChild(card);
    });
}

// Função para embaralhar array (algoritmo Fisher-Yates)
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Função para virar a carta
function flipCard() {
    // Verificar se o tabuleiro está bloqueado ou se a carta já foi virada
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;
    
    // Virar a carta
    this.classList.add('flipped');
    
    // Tocar som de virar carta
    try {
        sounds.flip.play().catch(e => console.log('Erro ao tocar som:', e));
    } catch (e) {
        console.log('Erro ao tocar som:', e);
    }
    
    // Primeira carta virada
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    
    // Segunda carta virada
    secondCard = this;
    checkForMatch();
}

// Função para verificar se as cartas formam um par
function checkForMatch() {
    // Bloquear o tabuleiro temporariamente
    lockBoard = true;
    
    // Verificar se as imagens são iguais
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
    
    if (isMatch) {
        // É um par!
        disableCards();
        updateScore();
        
        // Adicionar classe para animação de acerto
        setTimeout(() => {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            
            // Tocar som de acerto
            try {
                sounds.match.play().catch(e => console.log('Erro ao tocar som:', e));
            } catch (e) {
                console.log('Erro ao tocar som:', e);
            }
            
            // Animar o par encontrado
            animateMatch(firstCard, secondCard);
            
            // Verificar se é o último par
            if (matches === cardImages.length) {
                lastPairFound = true;
            }
            
            // Mostrar mensagem de comportamento ambiental
            showEnvironmentalBehavior(firstCard.dataset.image);
        }, 300);
    } else {
        // Não é um par, virar as cartas de volta
        unflipCards();
        
        // Tocar som de erro
        setTimeout(() => {
            try {
                sounds.wrong.play().catch(e => console.log('Erro ao tocar som:', e));
            } catch (e) {
                console.log('Erro ao tocar som:', e);
            }
        }, 300);
    }
}

// Função para mostrar mensagem de comportamento ambiental
function showEnvironmentalBehavior(cardType) {
    // Verificar se os elementos existem
    if (!messageBox || !behaviorMessage) {
        console.error('Elementos de mensagem não encontrados!');
        resetBoard(); // Desbloquear o tabuleiro se não puder mostrar a mensagem
        return;
    }
    
    // Definir a mensagem com base no tipo de carta
    behaviorMessage.textContent = environmentalBehaviors[cardType];
    
    // Mostrar a caixa de mensagem após um pequeno delay
    setTimeout(() => {
        // Adicionar a mensagem diretamente na página se o modal não funcionar
        const messageHTML = `
            <div class="message-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; display: flex; align-items: center; justify-content: center;">
                <div class="message-content" style="background: white; padding: 20px; border-radius: 10px; max-width: 80%; text-align: center;">
                    <p>${environmentalBehaviors[cardType]}</p>
                    <button onclick="this.parentNode.parentNode.remove(); lockBoard = false;" style="background: #4caf50; color: white; border: none; padding: 8px 15px; border-radius: 20px; cursor: pointer; margin-top: 15px;">Entendi!</button>
                </div>
            </div>
        `;
        
        // Tentar mostrar o modal original primeiro
        messageBox.classList.add('show');
        
        // Verificar se o modal está visível após um pequeno delay
        setTimeout(() => {
            if (!messageBox.classList.contains('show') || getComputedStyle(messageBox).display === 'none') {
                // Se o modal não estiver visível, usar a alternativa
                document.body.insertAdjacentHTML('beforeend', messageHTML);
                
                // Adicionar event listener para o botão alternativo
                const alternativeButton = document.querySelector('.message-overlay button');
                if (alternativeButton) {
                    alternativeButton.addEventListener('click', function() {
                        this.parentNode.parentNode.remove();
                        if (lastPairFound) {
                            gameOver();
                        } else {
                            resetBoard();
                        }
                    });
                }
            }
        }, 100);
    }, 800);
}

// Função para fechar a caixa de mensagem
function closeMessage() {
    if (messageBox) {
        messageBox.classList.remove('show');
    }
    
    // Remover qualquer mensagem alternativa
    const alternativeMessage = document.querySelector('.message-overlay');
    if (alternativeMessage) {
        alternativeMessage.remove();
    }
    
    // Se for o último par, mostrar tela de fim de jogo
    if (lastPairFound) {
        gameOver();
    } else {
        // Desbloquear o tabuleiro após fechar a mensagem
        resetBoard();
    }
}

// Função para desabilitar cartas que formaram um par
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    // Não resetar o tabuleiro aqui, será feito após mostrar a mensagem
}

// Função para virar as cartas de volta quando não formam um par
function unflipCards() {
    setTimeout(() => {
        if (firstCard) firstCard.classList.remove('flipped');
        if (secondCard) secondCard.classList.remove('flipped');
        
        resetBoard();
    }, 1000);
}

// Função para resetar o tabuleiro após cada jogada
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Função para atualizar a pontuação
function updateScore() {
    matches++;
    scoreElement.textContent = matches;
}

// Função para iniciar o timer
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        
        // Atualizar o display do timer
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Função para finalizar o jogo
function gameOver() {
    // Parar o timer
    clearInterval(timer);
    isPlaying = false;
    
    // Verificar se os elementos existem
    if (!congratulationsModal || !finalTimeElement || !randomEcoMessage) {
        console.error('Elementos de conclusão não encontrados!');
        alert(`Parabéns! Você completou o jogo em ${timerElement.textContent}.\n\nDica Ambiental: ${randomEcoTips[Math.floor(Math.random() * randomEcoTips.length)]}`);
        return;
    }
    
    // Atualizar o tempo final
    finalTimeElement.textContent = timerElement.textContent;
    
    // Selecionar uma mensagem ambiental aleatória
    const randomIndex = Math.floor(Math.random() * randomEcoTips.length);
    randomEcoMessage.textContent = randomEcoTips[randomIndex];
    
    // Tocar som de sucesso
    setTimeout(() => {
        try {
            sounds.success.play().catch(e => console.log('Erro ao tocar som:', e));
        } catch (e) {
            console.log('Erro ao tocar som:', e);
        }
    }, 500);
    
    // Mostrar modal de parabéns após um pequeno delay
    setTimeout(() => {
        // Tentar mostrar o modal original
        congratulationsModal.classList.add('show');
        
        // Verificar se o modal está visível após um pequeno delay
        setTimeout(() => {
            if (!congratulationsModal.classList.contains('show') || getComputedStyle(congratulationsModal).display === 'none') {
                // Se o modal não estiver visível, usar a alternativa
                const congratsHTML = `
                    <div class="congrats-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; display: flex; align-items: center; justify-content: center;">
                        <div class="congrats-content" style="background: white; padding: 30px; border-radius: 20px; max-width: 80%; text-align: center;">
                            <h2 style="color: #2e8b57; font-size: 2rem; margin-bottom: 15px;">Parabéns!</h2>
                            <p style="font-size: 1.2rem; margin-bottom: 20px;">Você encontrou todos os pares!</p>
                            <p style="font-size: 1.2rem; margin-bottom: 20px;">Tempo: ${timerElement.textContent}</p>
                            <div style="background-color: #e8f5e9; padding: 15px; border-radius: 15px; margin: 20px 0; border-left: 5px solid #4caf50;">
                                <h3 style="color: #2e8b57; margin-bottom: 10px;">Dica Ambiental:</h3>
                                <p style="font-size: 1.1rem; line-height: 1.4; margin-bottom: 0;">${randomEcoTips[randomIndex]}</p>
                            </div>
                            <div style="margin: 20px 0;">
                                <h3 style="color: #2e8b57; margin-bottom: 10px;">Entre para o Ranking!</h3>
                                <p style="font-size: 1.1rem; margin-bottom: 10px;">Digite seu nome para aparecer no ranking:</p>
                                <input type="text" id="alt-player-name" maxlength="15" placeholder="Seu nome" style="padding: 10px; border: 2px solid #4caf50; border-radius: 20px; margin-bottom: 10px; width: 80%;">
                                <div>
                                    <button onclick="saveAltScore()" style="background: #4caf50; color: white; border: none; padding: 8px 15px; border-radius: 20px; cursor: pointer; margin: 5px;">Salvar</button>
                                    <button onclick="skipAltScore()" style="background: #9e9e9e; color: white; border: none; padding: 8px 15px; border-radius: 20px; cursor: pointer; margin: 5px;">Pular</button>
                                </div>
                            </div>
                            <button onclick="location.reload();" style="background: #4caf50; color: white; border: none; padding: 12px 30px; font-size: 1.2rem; border-radius: 30px; cursor: pointer; font-weight: bold;">Jogar Novamente</button>
                        </div>
                    </div>
                `;
                document.body.insertAdjacentHTML('beforeend', congratsHTML);
                
                // Adicionar funções globais para os botões alternativos
                window.saveAltScore = function() {
                    const altNameInput = document.getElementById('alt-player-name');
                    const playerName = altNameInput.value.trim() || 'Jogador Anônimo';
                    savePlayerScore(playerName, getTimeInSeconds());
                    document.querySelector('.congrats-overlay').remove();
                };
                
                window.skipAltScore = function() {
                    document.querySelector('.congrats-overlay').remove();
                };
            }
        }, 100);
    }, 1000);
}

// Função para criar animação quando um par é encontrado
function animateMatch(card1, card2) {
    const image = card1.dataset.image;
    const img1 = card1.querySelector('img');
    const img2 = card2.querySelector('img');
    
    if (!img1 || !img2) {
        console.error('Elementos de imagem não encontrados!');
        return;
    }
    
    // Animações específicas para cada tipo de carta
    try {
        switch(image) {
            case 'arvore':
                applyGrowAnimation(img1);
                applyGrowAnimation(img2);
                break;
            case 'rio_limpo':
                applyWaveAnimation(img1);
                applyWaveAnimation(img2);
                break;
            case 'reciclagem':
                applyRotateAnimation(img1);
                applyRotateAnimation(img2);
                break;
            case 'sol_sorridente':
                applyPulseAnimation(img1);
                applyPulseAnimation(img2);
                break;
            case 'planta_crescendo':
                applyGrowAnimation(img1);
                applyGrowAnimation(img2);
                break;
            case 'bicicleta':
                applyMoveAnimation(img1);
                applyMoveAnimation(img2);
                break;
            case 'animal_feliz':
                applyJumpAnimation(img1);
                applyJumpAnimation(img2);
                break;
            case 'lixeira_reciclavel':
                applyBounceAnimation(img1);
                applyBounceAnimation(img2);
                break;
        }
    } catch (e) {
        console.error('Erro ao aplicar animação:', e);
    }
}

// Funções de animação para cada tipo de carta
function applyGrowAnimation(element) {
    try {
        element.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)' },
            { transform: 'scale(1)' }
        ], {
            duration: 800,
            easing: 'ease-in-out'
        });
    } catch (e) {
        console.error('Erro na animação:', e);
    }
}

function applyWaveAnimation(element) {
    try {
        element.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-5px)' },
            { transform: 'translateY(5px)' },
            { transform: 'translateY(-5px)' },
            { transform: 'translateY(0)' }
        ], {
            duration: 800,
            easing: 'ease-in-out'
        });
    } catch (e) {
        console.error('Erro na animação:', e);
    }
}

function applyRotateAnimation(element) {
    try {
        element.animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ], {
            duration: 800,
            easing: 'ease-in-out'
        });
    } catch (e) {
        console.error('Erro na animação:', e);
    }
}

function applyPulseAnimation(element) {
    try {
        element.animate([
            { transform: 'scale(1)', filter: 'brightness(1)' },
            { transform: 'scale(1.1)', filter: 'brightness(1.3)' },
            { transform: 'scale(1)', filter: 'brightness(1)' }
        ], {
            duration: 800,
            easing: 'ease-in-out'
        });
    } catch (e) {
        console.error('Erro na animação:', e);
    }
}

function applyMoveAnimation(element) {
    try {
        element.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 800,
            easing: 'ease-in-out'
        });
    } catch (e) {
        console.error('Erro na animação:', e);
    }
}

function applyJumpAnimation(element) {
    try {
        element.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-15px)' },
            { transform: 'translateY(0)' }
        ], {
            duration: 600,
            easing: 'cubic-bezier(.5, 0, .5, 1.5)'
        });
    } catch (e) {
        console.error('Erro na animação:', e);
    }
}

function applyBounceAnimation(element) {
    try {
        element.animate([
            { transform: 'translateY(0) scale(1)' },
            { transform: 'translateY(-10px) scale(1.1)' },
            { transform: 'translateY(0) scale(1)' },
            { transform: 'translateY(-5px) scale(1.05)' },
            { transform: 'translateY(0) scale(1)' }
        ], {
            duration: 800,
            easing: 'ease-in-out'
        });
    } catch (e) {
        console.error('Erro na animação:', e);
    }
}

// Funções para o sistema de ranking

// Função para salvar pontuação
function saveScore() {
    const playerName = playerNameInput.value.trim() || 'Jogador Anônimo';
    savePlayerScore(playerName, getTimeInSeconds());
    congratulationsModal.classList.remove('show');
}

// Função para pular salvamento da pontuação
function skipScore() {
    congratulationsModal.classList.remove('show');
}

// Função para salvar pontuação do jogador
function savePlayerScore(name, timeInSeconds) {
    // Obter ranking atual
    let ranking = getRanking();
    
    // Adicionar nova pontuação
    ranking.push({
        name: name,
        time: timeInSeconds,
        timeFormatted: formatTime(timeInSeconds),
        date: new Date().toISOString()
    });
    
    // Ordenar por tempo (menor para maior)
    ranking.sort((a, b) => a.time - b.time);
    
    // Limitar a 50 entradas para não sobrecarregar o localStorage
    if (ranking.length > 50) {
        ranking = ranking.slice(0, 50);
    }
    
    // Salvar no localStorage
    localStorage.setItem('memoryGameRanking', JSON.stringify(ranking));
    
    // Atualizar exibição do ranking
    updateRankingDisplay();
}

// Função para obter ranking do localStorage
function getRanking() {
    const rankingData = localStorage.getItem('memoryGameRanking');
    return rankingData ? JSON.parse(rankingData) : [];
}

// Função para converter tempo em segundos
function getTimeInSeconds() {
    return minutes * 60 + seconds;
}

// Função para formatar tempo em MM:SS
function formatTime(timeInSeconds) {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Função para mostrar ranking
function showRanking() {
    updateRankingDisplay();
    rankingContainer.classList.add('show');
}

// Função para fechar ranking
function closeRanking() {
    rankingContainer.classList.remove('show');
}

// Função para atualizar exibição do ranking
function updateRankingDisplay() {
    const ranking = getRanking();
    rankingList.innerHTML = '';
    
    if (ranking.length === 0) {
        rankingList.innerHTML = '<li>Nenhuma pontuação registrada ainda.</li>';
        return;
    }
    
    // Mostrar apenas os 10 melhores tempos
    const topRanking = ranking.slice(0, 10);
    
    topRanking.forEach((score, index) => {
        const date = new Date(score.date);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="ranking-position">${index + 1}</span>
            <span class="ranking-name">${score.name}</span>
            <span class="ranking-time">${score.timeFormatted}</span>
            <span class="ranking-date">${formattedDate}</span>
        `;
        rankingList.appendChild(li);
    });
}

// Funções para o painel de administração

// Função para mostrar login de administrador
function showAdminLogin() {
    adminLogin.style.display = 'block';
    adminPanel.style.display = 'none';
    adminPassword.value = '';
    adminContainer.classList.add('show');
}

// Função para validar login de administrador
function validateAdminLogin() {
    if (adminPassword.value === ADMIN_PASSWORD) {
        adminLogin.style.display = 'none';
        adminPanel.style.display = 'block';
        updateAdminList();
    } else {
        alert('Senha incorreta!');
        adminPassword.value = '';
    }
}

// Função para fechar painel de administração
function closeAdmin() {
    adminContainer.classList.remove('show');
}

// Função para atualizar lista de administração
function updateAdminList() {
    const ranking = getRanking();
    adminList.innerHTML = '';
    
    if (ranking.length === 0) {
        adminList.innerHTML = '<li>Nenhuma pontuação registrada ainda.</li>';
        return;
    }
    
    ranking.forEach((score, index) => {
        const date = new Date(score.date);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
        
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="admin-info">
                <strong>${score.name}</strong> - ${score.timeFormatted} (${formattedDate})
            </div>
            <button class="admin-remove" data-index="${index}">Remover</button>
        `;
        adminList.appendChild(li);
    });
    
    // Adicionar event listeners para botões de remoção
    const removeButtons = adminList.querySelectorAll('.admin-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            removeFromRanking(index);
        });
    });
}

// Função para remover entrada do ranking
function removeFromRanking(index) {
    if (confirm('Tem certeza que deseja remover esta entrada do ranking?')) {
        const ranking = getRanking();
        ranking.splice(index, 1);
        localStorage.setItem('memoryGameRanking', JSON.stringify(ranking));
        updateAdminList();
        updateRankingDisplay();
    }
}

// Função para carregar ranking
function loadRanking() {
    updateRankingDisplay();
}
