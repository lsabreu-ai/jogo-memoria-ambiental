## Requisitos do Jogo da Memória Ambiental

**1. Visão Geral:**
   - Criar um jogo da memória digital com tema focado em meio ambiente e preservação.
   - O público-alvo são crianças, portanto, o jogo deve ser lúdico, educativo e visualmente atraente.

**2. Elementos do Jogo:**
   - **Cartas:** 16 cartas no total, formando 8 pares idênticos.
   - **Ilustrações das Cartas (Pares):**
     - Árvore
     - Rio Limpo
     - Símbolo de Reciclagem
     - Sol Sorridente
     - Planta Crescendo em um Vaso
     - Bicicleta
     - Animal Feliz (ex: um esquilo ou passarinho)
     - Lixeira de Coleta Seletiva (com símbolo de reciclagem)
   - **Estilo Visual:** Ilustrações com traços infantis, cores vibrantes e alegres. O verso das cartas deve ser padronizado.

**3. Interface do Usuário (UI):**
   - **Layout:** Grade para as cartas (provavelmente 4x4).
   - **Fundo:** Cor clara e suave, que não distraia das cartas.
   - **Botões:** Grandes e intuitivos (ex: botão "Jogar Novamente" ao final).
   - **Responsividade:** O jogo deve se adaptar a diferentes tamanhos de tela (desktop e mobile).

**4. Mecânica do Jogo (Gameplay):**
   - Ao iniciar, todas as cartas estão viradas para baixo.
   - O jogador clica em uma carta para revelá-la.
   - O jogador clica em uma segunda carta.
   - **Se as cartas formarem um par:**
     - As cartas permanecem viradas para cima.
     - Uma animação curta e temática é exibida (ex: a árvore cresce um pouco, o animal dá um pulinho feliz).
     - Um som alegre e curto é tocado.
   - **Se as cartas não formarem um par:**
     - As cartas são exibidas por um curto período (ex: 1 segundo) e depois viram para baixo novamente.
   - O jogo termina quando todos os 8 pares forem encontrados.
   - Uma mensagem de parabéns pode ser exibida ao final.

**5. Animações e Sons:**
   - **Animações:** Curtas, simples e relacionadas ao par encontrado (reforço positivo).
   - **Sons:** Efeitos sonoros alegres para acertos e, opcionalmente, um som suave para virar a carta e um som diferente para erro.
   - Música de fundo (opcional): Uma música infantil calma e alegre pode tocar durante o jogo.

**6. Objetivo Educacional:**
   - Ensinar sobre elementos da natureza e práticas de preservação ambiental de forma divertida.
   - Estimular a memória e a concentração das crianças.

**7. Tecnologias:**
   - HTML para a estrutura.
   - CSS para estilização e animações básicas.
   - JavaScript para a lógica do jogo, manipulação do DOM e controle de animações/sons.

**8. Entregável:**
   - Uma pasta contendo os arquivos HTML, CSS, JavaScript e as imagens/sons necessários para rodar o jogo em um navegador web.
