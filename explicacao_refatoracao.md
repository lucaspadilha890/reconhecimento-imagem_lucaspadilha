# Explicação do Código - refatoracao.py

## Código Original

```python
def c(l):
    t=0
    for i in range(len(l)):
        t=t+l[i]
    m=t/len(l)
    mx=l[0]
    mn=l[0]
    for i in range(len(l)):
        if l[i]>mx:
            mx=l[i]
        if l[i]<mn:
            mn=l[i]
    return t,m,mx,mn

x=[23,7,45,2,67,12,89,34,56,11]
a,b,c2,d=c(x)
print("total:",a)
print("media:",b)
print("maior:",c2)
print("menor:",d)
```

---

## Explicação Linha a Linha

### Linha 1: `def c(l):`
Define uma função chamada `c` que recebe um parâmetro `l` (uma lista).
- **Problema**: O nome `c` não é descritivo

### Linha 2: `t=0`
Inicializa a variável `t` (total) com valor 0. Esta variável armazenará a soma de todos os elementos da lista.

### Linha 3: `for i in range(len(l)):`
Inicia um loop `for` que iterará sobre os índices da lista `l`.
- `len(l)` retorna o tamanho da lista
- `range(len(l))` gera uma sequência de 0 até o tamanho da lista - 1

### Linha 4: `t=t+l[i)`
A cada iteração, adiciona o valor do elemento na posição `i` ao total `t`.
- Equivalente a: `t += l[i]`

### Linha 5: `m=t/len(l)`
Calcula a média (`m`) dividindo o total (`t`) pelo número de elementos (`len(l)`).

### Linha 6: `mx=l[0]`
Inicializa a variável `mx` (máximo) com o primeiro elemento da lista (`l[0]`).

### Linha 7: `mn=l[0]`
Inicializa a variável `mn` (mínimo) com o primeiro elemento da lista (`l[0]`).

### Linha 8: `for i in range(len(l)):`
Inicia outro loop `for` para encontrar o maior e menor valor da lista.

### Linha 9: `if l[i]>mx:`
Verifica se o elemento atual é maior que o máximo atual.

### Linha 10: `mx=l[i]`
Se o elemento atual for maior, atualiza o valor de `mx`.

### Linha 11: `if l[i]<mn:`
Verifica se o elemento atual é menor que o mínimo atual.

### Linha 12: `mn=l[i]`
Se o elemento atual for menor, atualiza o valor de `mn`.

### Linha 13: `return t,m,mx,mn`
Retorna quatro valores: total, média, máximo e mínimo.

### Linha 15: `x=[23,7,45,2,67,12,89,34,56,11]`
Define uma lista `x` com 10 números inteiros para testar a função.

### Linha 16: `a,b,c2,d=c(x)`
Chama a função `c` passando a lista `x` e desempacota os 4 valores retornados:
- `a` = total
- `b` = média
- `c2` = máximo
- `d` = mínimo
- **Nota**: `c2` foi usado em vez de `c` para evitar conflito com o nome da função

### Linha 17: `print("total:",a)`
Imprime o valor total na tela.

### Linha 18: `print("media:",b)`
Imprime o valor da média na tela.

### Linha 19: `print("maior:",c2)`
Imprime o valor máximo na tela.

### Linha 20: `print("menor:",d)`
Imprime o valor mínimo na tela.

---

## Resultado da Execução

```
total: 346
media: 34.6
maior: 89
menor: 2
```

---

## Problemas do Código

1. **Nomes não descritivos**: `c`, `l`, `t`, `m`, `mx`, `mn`, `c2` não explicam o propósito
2. **Duplicação de loop**: O código percorre a lista duas vezes (uma para soma, outra para max/min)
3. **Sem docstring**: Não há documentação da função

---

## Versão Refatorada (Sugestão)

```python
def calcular_estatisticas(lista):
    """Calcula estatísticas básicas de uma lista de números.
    
    Args:
        lista: Lista de números
        
    Returns:
        Tupla com (total, média, máximo, mínimo)
    """
    total = sum(lista)
    media = total / len(lista)
    maximo = max(lista)
    minimo = min(lista)
    
    return total, media, maximo, minimo


numeros = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
total, media, maximo, minimo = calcular_estatisticas(numeros)

print("Total:", total)
print("Média:", media)
print("Maior:", maximo)
print("Menor:", minimo)
```

### Melhorias:
- Nomes descritivos para função e variáveis
- Usa funções built-in (`sum`, `max`, `min`) - mais eficiente
- Uma única passagem pela lista
- Docstring explicativa