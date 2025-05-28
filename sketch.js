let baloes = [];
let fireworks = [];
let campo = true;

function setup() {
  createCanvas(600, 400);
  // Criando alguns balões para representar a festa
  for (let i = 0; i < 10; i++) {
    baloes.push(new Baloes(random(width), random(height), random(15, 30)));
  }
}

function draw() {
  background(255);

  if (campo) {
    // Desenhando o campo
    background(135, 206, 235); // Céu azul
    fill(34, 139, 34); // Cor da grama
    noStroke();
    rect(0, height / 2, width, height / 2); // Grama

    // Árvores e flores
    drawCampo();
  } else {
    // Desenhando a cidade
    background(50, 50, 50); // Céu escuro, noite
    fill(150); // Prédios cinza
    noStroke();
    rect(100, 200, 50, 150); // Prédio 1
    rect(200, 150, 60, 200); // Prédio 2
    rect(300, 180, 40, 180); // Prédio 3
    rect(400, 140, 80, 220); // Prédio 4

    // Carros
    drawCarros();

    // Luzes da cidade (iluminação das janelas)
    drawLuzes();
  }

  // Animação dos balões
  for (let i = 0; i < baloes.length; i++) {
    baloes[i].move();
    baloes[i].display();
  }

  // Fogos de artifício
  if (frameCount % 60 == 0 && random() > 0.8) {
    fireworks.push(new Fireworks(random(width), random(height / 2), random(5, 15)));
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].display();
    if (fireworks[i].isDone()) {
      fireworks.splice(i, 1);
    }
  }

  // Troca entre campo e cidade
  if (frameCount % 300 == 0) {
    campo = !campo;
  }
}

// Função para desenhar árvores e flores no campo
function drawCampo() {
  fill(139, 69, 19); // Cor das árvores
  ellipse(100, height / 2 + 50, 60, 60); // Árvore 1
  ellipse(500, height / 2 + 80, 60, 60); // Árvore 2
  
  fill(255, 99, 71); // Cor das flores
  ellipse(200, height / 2 + 150, 20, 20); // Flor 1
  ellipse(300, height / 2 + 160, 20, 20); // Flor 2
  ellipse(400, height / 2 + 130, 20, 20); // Flor 3
}

// Função para desenhar os carros na cidade
function drawCarros() {
  fill(255, 0, 0); // Carro vermelho
  rect(100, 350, 50, 20);
  fill(0, 0, 255); // Carro azul
  rect(200, 350, 50, 20);
}

// Função para desenhar as luzes dos prédios na cidade
function drawLuzes() {
  fill(255, 255, 0, 150); // Luzes amarelas
  rect(110, 210, 10, 10);
  rect(160, 220, 10, 10);
  rect(220, 170, 10, 10);
  rect(230, 210, 10, 10);
  rect(370, 180, 10, 10);
}

// Classe para os balões
class Baloes {
  constructor(x, y, tamanho) {
    this.x = x;
    this.y = y;
    this.tamanho = tamanho;
    this.cor = color(random(255), random(255), random(255));
  }

  move() {
    this.y -= 1;
    if (this.y < 0) {
      this.y = height;
      this.x = random(width);
    }
  }

  display() {
    fill(this.cor);
    ellipse(this.x, this.y, this.tamanho, this.tamanho);
  }
}

// Classe para os fogos de artifício
class Fireworks {
  constructor(x, y, tamanho) {
    this.x = x;
    this.y = y;
    this.tamanho = tamanho;
    this.particles = [];
    this.exploded = false;
  }

  update() {
    if (!this.exploded) {
      if (random() < 0.05) {
        this.explode();
        this.exploded = true;
      }
    } else {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].update();
        if (this.particles[i].isDone()) {
          this.particles.splice(i, 1);
        }
      }
    }
  }

  explode() {
    let numParticles = int(random(30, 60));
    for (let i = 0; i < numParticles; i++) {
      this.particles.push(new FireworkParticle(this.x, this.y, random(TWO_PI), random(1, 5), this.tamanho));
    }
  }

  display() {
    if (this.exploded) {
      for (let p of this.particles) {
        p.display();
      }
    }
  }

  isDone() {
    return this.particles.length === 0;
  }
}

// Classe para as partículas dos fogos de artifício
class FireworkParticle {
  constructor(x, y, angle, speed, size) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.size = size;
    this.life = 255;
    this.velocity = createVector(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.life -= 5;
  }

  display() {
    fill(255, this.life);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  isDone() {
    return this.life <= 0;
  }
}

  
  
  
