import pygame
import sys
from settings import *
from player import Player
from asteroid import Asteroid

# Inicialização do Pygame
pygame.init()
pygame.font.init()

# Configuração da tela
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Atari Asteroids")
clock = pygame.time.Clock()
font = pygame.font.SysFont("Arial", 32, bold=True)
game_over_font = pygame.font.SysFont("Arial", 64, bold=True)

def draw_text(surface, text, text_font, x, y, color=WHITE, center=False):
    text_surface = text_font.render(text, True, color)
    text_rect = text_surface.get_rect()
    if center:
        text_rect.center = (x, y)
    else:
        text_rect.topleft = (x, y)
    surface.blit(text_surface, text_rect)

def main():
    all_sprites = pygame.sprite.Group()
    asteroids = pygame.sprite.Group()
    bullets = pygame.sprite.Group()

    player = Player(all_sprites, bullets)
    all_sprites.add(player)

    score = 0
    running = True
    game_over = False

    # Timer customizado para gerar asteroides
    SPAWN_ASTEROID_EVENT = pygame.USEREVENT + 1
    # Spawna um asteroide a cada 800 milissegundos
    pygame.time.set_timer(SPAWN_ASTEROID_EVENT, 800)

    while running:
        clock.tick(FPS) # Limita os frames por segundo

        # Processamento de Eventos
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            if not game_over:
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE:
                        player.shoot()
                
                if event.type == SPAWN_ASTEROID_EVENT:
                    new_asteroid = Asteroid()
                    all_sprites.add(new_asteroid)
                    asteroids.add(new_asteroid)

        # Atualização do Estado do Jogo
        if not game_over:
            all_sprites.update()

            # Checar colisões Tiro x Asteroide (destrói ambos)
            hits = pygame.sprite.groupcollide(asteroids, bullets, True, True)
            for hit in hits:
                score += 10 # Aumenta a pontuação para cada asteroide atingido

            # Checar colisão Nave x Asteroide
            hits = pygame.sprite.spritecollide(player, asteroids, False)
            if hits:
                game_over = True # Nave atingida -> Game Over

            # Checar se asteroide chegou ao fundo da tela
            for asteroid in asteroids:
                if asteroid.rect.top > HEIGHT:
                    game_over = True # Asteroide passou do limite -> Game Over

        # Renderização da Tela
        screen.fill(BLACK)
        all_sprites.draw(screen)
        
        # Mostrar Pontuação
        draw_text(screen, f"Pontuação: {score}", font, 10, 10, WHITE)
        
        # Mostrar Game Over
        if game_over:
            draw_text(screen, "GAME OVER", game_over_font, WIDTH // 2, HEIGHT // 2, RED, center=True)
            draw_text(screen, "Feche a janela para sair", font, WIDTH // 2, HEIGHT // 2 + 50, WHITE, center=True)

        # Atualiza o display
        pygame.display.flip()

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
