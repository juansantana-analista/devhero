# Efeito de Digitação nos Balões de Fala

## Visão Geral

O componente `SpeechBubble` agora inclui um efeito de digitação opcional que simula o personagem digitando as mensagens em tempo real, criando uma experiência mais interativa e envolvente.

## Componentes

### TypewriterText
Componente base que implementa o efeito de digitação com cursor piscante.

**Props:**
- `text` (string): Texto a ser digitado
- `speed` (number): Velocidade da digitação em milissegundos (padrão: 50)
- `onComplete` (function): Callback executado quando a digitação termina
- `showCursor` (boolean): Mostra/esconde o cursor (padrão: true)
- `cursorColor` (string): Cor do cursor (padrão: colors.primary)
- `cursorWidth` (number): Largura do cursor (padrão: 2)

### SpeechBubble
Balão de fala com suporte opcional ao efeito de digitação.

**Props adicionais para digitação:**
- `typewriter` (boolean): Ativa o efeito de digitação (padrão: false)
- `typewriterSpeed` (number): Velocidade da digitação (padrão: 50)
- `onTypewriterComplete` (function): Callback quando a digitação termina

## Exemplos de Uso

### 1. Balão de Fala Simples (sem digitação)
```jsx
<SpeechBubble>
  Olá! Como posso ajudar?
</SpeechBubble>
```

### 2. Balão de Fala com Efeito de Digitação
```jsx
<SpeechBubble 
  typewriter={true}
  typewriterSpeed={60}
  onTypewriterComplete={() => console.log('Digitação terminou!')}
>
  Olá! Como posso ajudar?
</SpeechBubble>
```

### 3. Balão de Fala com Variante e Digitação
```jsx
<SpeechBubble 
  variant="success"
  typewriter={true}
  typewriterSpeed={50}
>
  Parabéns! Você completou a missão! 🎉
</SpeechBubble>
```

### 4. Controle de Estado com Digitação
```jsx
const [canContinue, setCanContinue] = useState(false);

<SpeechBubble 
  typewriter={true}
  onTypewriterComplete={() => setCanContinue(true)}
>
  {messages[currentMessage]}
</SpeechBubble>

<Button 
  title="Continuar" 
  disabled={!canContinue}
  onPress={handleContinue}
/>
```

## Variantes Disponíveis

- `default`: Estilo padrão
- `info`: Estilo informativo (azul)
- `success`: Estilo de sucesso (verde)

## Dicas de Implementação

1. **Velocidade**: Use velocidades entre 30-80ms para uma experiência natural
2. **Feedback**: Implemente `onTypewriterComplete` para controlar quando o usuário pode prosseguir
3. **Haptics**: Combine com feedback háptico para maior imersão
4. **Sequência**: Use delays para criar sequências de mensagens

## Casos de Uso

- **Onboarding**: Apresentação gradual de informações
- **Tutoriais**: Explicações passo a passo
- **Feedback**: Mensagens de sucesso ou erro
- **Narrativas**: Histórias e diálogos interativos

## Performance

- O efeito de digitação é otimizado para React Native
- O cursor usa `useNativeDriver: false` para animações suaves
- Limpeza automática de timers para evitar vazamentos de memória
