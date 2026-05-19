import pygame
import random
from settings import *

class Asteroid(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        size = random.randint(ASTEROID_MIN_SIZE, ASTEROID_MAX_SIZE)
        self.image = pygame.Surface((size, size))
        self.image.fill(RED)
        self.rect = self.image.get_rect()
        # Posiciona em um local X aleatório no topo, um pouco acima da tela visível
        self.rect.x = random.randrange(0, WIDTH - self.rect.width)
        self.rect.y = random.randrange(-100, -40)
        # Sorteia uma variação na velocidade para ficar mais dinâmico
        self.speedy = random.randrange(ASTEROID_SPEED - 1, ASTEROID_SPEED + 2)

    def update(self):
        self.rect.y += self.speedy
        # Se passar muito abaixo da tela, podemos destruí-lo se quisermos
        # Porém, no main.py, faremos o Game Over se isso acontecer
