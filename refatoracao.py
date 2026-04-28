def calcular_estatisticas(numeros):
    """Calcula estatísticas básicas de uma lista de números.
    
    Args:
        numeros: Lista de números inteiros ou floats
        
    Returns:
        Tupla com (total, média, máximo, mínimo)
    """
    # Calcula o total usando a função built-in sum
    total = sum(numeros)
    
    # Calcula a média
    media = total / len(numeros)
    
    # Encontra o máximo e mínimo usando funções built-in
    maximo = max(numeros)
    minimo = min(numeros)
    
    return total, media, maximo, minimo


# Lista de números para teste
numeros = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]

# Chama a função e desempacota os resultados
total, media, maximo, minimo = calcular_estatisticas(numeros)

# Imprime os resultados
print("Total:", total)
print("Média:", media)
print("Maior:", maximo)
print("Menor:", minimo)
