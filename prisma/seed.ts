import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Teclado Mecânico RGB Pro",
        price: 29990,
        description:
          "Teclado mecânico com switches blue, iluminação RGB por tecla e construção em alumínio.",
        stock: 10,
      },
      {
        name: "Teclado Compacto 60% Wireless",
        price: 24990,
        description:
          "Teclado compacto 60% sem fio com conectividade Bluetooth 5.0 e USB-C.",
        stock: 8,
      },
      {
        name: "Teclado Membrana Slim Office",
        price: 12990,
        description:
          "Teclado de membrana ultra-fino e silencioso para ambientes de escritório.",
        stock: 15,
      },
      {
        name: "Mouse Gamer 16000 DPI",
        price: 14990,
        description:
          "Mouse gamer com sensor óptico de 16000 DPI e 7 botões programáveis.",
        stock: 12,
      },
      {
        name: "Mouse Ergonômico Vertical",
        price: 17990,
        description:
          "Mouse vertical sem fio que reduz a tensão no pulso e antebraço.",
        stock: 7,
      },
      {
        name: "Mouse Wireless Ultralight 58g",
        price: 22990,
        description:
          "Mouse sem fio ultraleve de apenas 58 gramas com sensor de alta precisão.",
        stock: 5,
      },
      {
        name: "Headset Gamer Surround 7.1",
        price: 19990,
        description:
          "Headset gamer com som surround virtual 7.1 e microfone retrátil.",
        stock: 9,
      },
      {
        name: "Headset Bluetooth ANC Premium",
        price: 34990,
        description:
          "Headset Bluetooth com cancelamento ativo de ruído e codec LDAC.",
        stock: 6,
      },
      {
        name: "Headset Studio Monitor Referência",
        price: 44990,
        description:
          "Fone de ouvido de referência para produção musical e mixagem.",
        stock: 3,
      },
      {
        name: 'Monitor Ultrawide 34" 144Hz',
        price: 219990,
        description: 'Monitor ultrawide curvo 34" com resolução UWQHD e 144Hz.',
        stock: 4,
      },
      {
        name: 'Monitor 4K 27" IPS Profissional',
        price: 189990,
        description:
          'Monitor 4K de 27" calibrado de fábrica para design e edição.',
        stock: 4,
      },
      {
        name: 'Monitor Gamer 27" 240Hz',
        price: 159990,
        description:
          'Monitor gamer Full HD 27" com 240Hz e tempo de resposta 0.5ms.',
        stock: 5,
      },
      {
        name: "Mousepad Desk XXL 90x40cm",
        price: 7990,
        description:
          "Mousepad estendido de 90x40cm com superfície speed e bordas costuradas.",
        stock: 20,
      },
      {
        name: "Webcam Full HD 1080p Autofoco",
        price: 18990,
        description: "Webcam Full HD com autofoco rápido e microfone duplo.",
        stock: 11,
      },
      {
        name: "Hub USB-C 7 em 1",
        price: 21990,
        description:
          "Hub USB-C com 7 portas: HDMI 4K, USB 3.0, PD 100W, SD e Ethernet.",
        stock: 8,
      },
      {
        name: "Apoio de Pulso Ergonômico em Gel",
        price: 4990,
        description:
          "Apoio de pulso em gel com base antiderrapante para digitação prolongada.",
        stock: 25,
      },
      {
        name: "Suporte para Notebook em Alumínio",
        price: 13990,
        description:
          "Suporte ajustável em alumínio para notebooks de 10 a 17 polegadas.",
        stock: 10,
      },
      {
        name: "Cabo USB-C Thunderbolt 4 - 1m",
        price: 16990,
        description:
          "Cabo Thunderbolt 4 certificado com 40Gbps e Power Delivery 100W.",
        stock: 6,
      },
    ],
  });

  console.log("Seed concluído - 18 produtos inseridos.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
