# Explicação do Código - Verificador de Números Primos

## Código Python

```python
def verificar_primo(n):
    """Verifica se um número é primo.
    
    Args:
        n: Número a ser verificado
        
    Returns:
        True se o número é primo, False caso contrário
    """
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    for i in range(3, int(n ** 0.5) + 1, 2):
        if n % i == 0:
            return False
    
    return True
```

---

## Explicação Linha a Linha

### Linha 1: `def verificar_primo(n):`
Define uma função chamada `verificar_primo` que recebe um parâmetro `n`. Esta é a função principal que verifica se o número é primo.

### Linha 2-6: Docstring (documentação)
```
"""Verifica se um número é primo.

Args:
    n: Número a ser verificado
    
Returns:
    True se o número é primo, False caso contrário
"""
```
Documentação da função que explica o que ela faz, quais parâmetros aceita e o que retorna.

### Linha 7: `if n < 2:`
Verifica se o número é menor que 2. Números menores que 2 não são primos por definição.

### Linha 8: `return False`
Retorna `False` porque números menores que 2 (0 e 1) não são primos.

### Linha 9: `if n == 2:`
Verifica se o número é exatamente igual a 2.

### Linha 10: `return True`
O número 2 é primo (é o único número primo par), então retorna `True`.

### Linha 11: `if n % 2 == 0:`
Verifica se o número é par (divisível por 2) usando o operador módulo `%`.

### Linha 12: `return False`
Se o número é par e maior que 2, não é primo, então retorna `False`.

### Linha 14: `for i in range(3, int(n ** 0.5) + 1, 2):`
Loop que verifica divisores ímpares:
- **Início**: 3 (já que 2 já foi verificado)
- **Fim**: `int(n ** 0.5) + 1` (raiz quadrada do número + 1)
- **Passo**: 2 (apenas números ímpares)

**Por que até a raiz quadrada?**
Se um número `n` tem um divisor maior que sua raiz quadrada, o outro divisor correspondente seria menor que a raiz quadrada. Portanto, basta verificar até a raiz quadrada.

### Linha 15: `if n % i == 0:`
Verifica se o número `n` é divisível pelo divisor atual `i` (sem resto).

### Linha 16: `return False`
Se encontrar um divisor, o número não é primo, retorna `False`.

### Linha 18: `return True`
Se o loop terminar sem encontrar nenhum divisor, o número é primo, retorna `True`.

---

## Exemplo de Execução

| Número | Resultado | Motivo |
|--------|-----------|--------|
| 1 | Não primo | Menor que 2 |
| 2 | Primo | Único primo par |
| 3 | Primo | Não tem divisores |
| 4 | Não primo | Divisível por 2 |
| 5 | Primo | Não tem divisores |
| 17 | Primo | Não tem divisores |
| 18 | Não primo | Divisível por 2 |
| 19 | Primo | Não tem divisores |
| 20 | Não primo | Divisível por 2 |
| 23 | Primo | Não tem divisores |

---

## Complexidade

- **Tempo**: O(n^0.5) - pois verificamos apenas até a raiz quadrada
- **Espaço**: O(1) - usamos apenas variáveis de tamanho fixo