
'''def recomendacao(km):
    if km < 20:
        return 'lento'
    elif km < 50:
        return 'velocidade moderada'
    elif km < 100:
        return 'rapido'
    else:
        return 'quer virar estampa?'

def infracao(multa):
    if multa == 'lento':
        return 'andando dboa'
    elif multa == 'velocidade moderada':
        return 'vai com calma ae'
    elif multa == 'rapido':
        return 'agora sim'
    else:
        return 'ta voando mlk'
    
def main():
    km = int(input('a quantos km por hora voce estava?'))

    mensagem = recomendacao(km)
    multa = infracao(mensagem)

    print(mensagem)
    print(multa)

main()'''

def classificar_temperatura(temperatura):
    if temperatura <= 0:
        return 'muito frio'
    elif temperatura <= 15:
        return 'frio'
    elif temperatura <= 25:
        return 'agradavel'
    elif temperatura <= 30:
        return 'quente'
    else: 
        return 'muito quente'
    
def recomendacao(mensagem):
    if mensagem == 'muito frio':
        return 'use muita roupa para se aquecer'
    elif mensagem == 'frio':
        return 'use roupa para o frio'
    elif mensagem == 'agradavel':
        return 'temperatura ideal'
    elif mensagem == 'quente':
        return 'esta calor, beba agua'
    else:
        return 'tire a roupa'
    
def main():
    temperatura = float(input('digite a temperatura atual'))
    recado = classificar_temperatura(temperatura)
    aviso = recomendacao(recado)
    print(recado)
    print(aviso)
main()