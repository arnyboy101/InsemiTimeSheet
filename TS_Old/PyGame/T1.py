import pygame

pygame.init()
screen = pygame.display.set_mode((1000,1000))
done = False
is_blue = True
x = 30
y = 30
font = pygame.font.SysFont("Times New Roman",72)
text = font.render("Wacky Shape Freestyle",True,(158,16,16))

while not done:
    for event in pygame.event.get():
        if event.type==pygame.QUIT:
            done=True
        if event.type==pygame.KEYDOWN and event.key == pygame.K_SPACE:
            is_blue = not is_blue
    pressed = pygame.key.get_pressed()
    if pressed[pygame.K_UP]: y-=3
    if pressed[pygame.K_DOWN]: y+=3
    if pressed[pygame.K_LEFT]: x -= 3
    if pressed[pygame.K_RIGHT]: x+=3

    if is_blue:
        color = (0,128,255)
    else:
        color = (255,100,0)
    pygame.draw.polygon(screen,color,[(x+1,y+2),(x+3,y+4),(x+50,y+60),(x+30,y+30),(x+34,y+15),(x+12,y+32)])

    screen.blit(text,(320-text.get_width()//2,240-text.get_height()//2))
    pygame.display.flip()
