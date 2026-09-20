import { LoveConfig } from '../types';

/* ==========================================================================
   ❤️ CONFIGURACIÓN DE MENSAJES Y DETALLES ❤️
   
   ¡Hola! Puedes personalizar cualquier detalle en este archivo:
   - Tu nombre y el de tu pareja (partnerName)
   - Fechas especiales o aniversario
   - Inserta tus propias fotos (reemplaza las URLs de fotos)
   ========================================================================== */

export const initialLoveData: LoveConfig = {
  // Puedes cambiar "Mi Amor" por el nombre de tu pareja (ej: "Carlos", "Alejandro", etc.)
  partnerName: "Mi Amor",

  // Remitente
  senderName: "Siempre tuya",

  // Título principal
  occasionTitle: "Gracias Por Estar a Mi Lado",
  heroSubtitle: "Con Todo Mi Cariño • Agradecida Por Tu Compañía y Cuidados",

  // Fecha especial o aniversario (AAAA-MM-DD)
  relationshipStartDate: "2023-09-20",

  // Mensaje introductorio (efecto máquina de escribir)
  mainIntroMessage: 
    "Quiero darte las gracias de todo corazón por tu hermosa compañía y por cada uno de los cuidados y atenciones que siempre has tenido conmigo. Sé que no siempre es fácil y te pido una disculpa sincera por mis errores, por mis momentos difíciles y por todo aquello en lo que pude haber fallado. Tener a mi lado a una persona tan especial, que se preocupa por mi bienestar y me apoya con tanta paciencia y ternura, es el regalo más valioso de mi vida. Gracias por cuidarme, por comprenderme y por estar aquí conmigo.",

  // Carta íntima y completa
  fullLoveLetter: {
    title: "Para Ti, Con Todo Mi Amor y Gratitud Sincera",
    paragraphs: [
      "Hoy quiero tomarme este momento para decirte algo con toda la sinceridad de mi corazón: gracias por existir y por formar parte de mi vida. El cariño que siento por ti es profundo, honesto y muy especial.",
      "Antes que nada, quiero pedirte perdón de corazón por todo. Perdón por las veces en que he tenido días difíciles, por mis equivocaciones, mis temores o cuando me ha costado expresar lo que siento. Sé que a veces las cosas no son sencillas, pero valoro enormemente tu paciencia, tu nobleza y tu capacidad para escucharme y acompañarme sin juzgarme.",
      "Quiero agradecerte infinitamente por tu valiosa compañía y, sobre todo, por los cuidados tan hermosos que siempre has tenido conmigo. Cada vez que estás pendiente de mí, cuando me preguntas cómo estoy, cuando me brindas tu apoyo en momentos pesados o simplemente me regalas tu abrazo y tu tiempo, me haces sentir profundamente cuidada, valorada y en paz.",
      "No necesito grandes palabras para demostrarte mi amor; me basta con desear seguir caminando a tu lado, aprender cada día a ser mejor persona para ti y retribuirte todo ese cuidado tan bonito que siempre me has dado. Gracias por ser ese apoyo y ese compañero incondicional.",
      "Siempre agradecida y feliz de tenerte a mi lado,"
    ],
    signOff: "Con todo mi amor, cariño y respeto ❤️"
  },

  // <!-- ========================================================== -->
  // <!-- RAZONES DE AGRADECIMIENTO                                 -->
  // <!-- ========================================================== -->
  reasons: [
    {
      id: 1,
      title: "Tus Cuidados y Atenciones",
      subtitle: "Siempre Pendiente de Mí",
      category: "Cuidados",
      iconName: "Shield",
      previewText: "Gracias por cuidar siempre de mi bienestar...",
      fullMessage: "Valoro con toda el alma cada detalle con el que cuidas de mí. Tu preocupación sincera cuando no me siento bien, tus gestos de protección y esa ternura con la que me tratas me hacen sentir profundamente afortunada y segura a tu lado.",
      unlocked: false
    },
    {
      id: 2,
      title: "Tu Paciencia y Comprensión",
      subtitle: "Saber Escuchar Sin Juzgar",
      category: "Paciencia",
      iconName: "Sparkles",
      previewText: "Perdón por mis errores, gracias por entender...",
      fullMessage: "Te pido perdón por mis momentos de debilidad o por las ocasiones en que no he sabido reaccionar de la mejor manera. Tu paciencia incondicional y tu disposición para comprenderme y apoyarme son virtudes que admiro y agradezco profundamente cada día.",
      unlocked: false
    },
    {
      id: 3,
      title: "Tu Compañía Incondicional",
      subtitle: "El Mejor Regalo es Tu Presencia",
      category: "Compañía",
      iconName: "Sun",
      previewText: "Estar a tu lado me llena de serenidad...",
      fullMessage: "Tu sola presencia hace que cualquier día se sienta más ligero y bonito. Gracias por compartir tus horas conmigo, por no dejarme sola y por regalarme la dicha de compartir la vida en un ambiente de calma y afecto.",
      unlocked: false
    },
    {
      id: 4,
      title: "Tu Apoyo en Momentos Difíciles",
      subtitle: "Un Apoyo Firme y Sincero",
      category: "Apoyo",
      iconName: "Flame",
      previewText: "Nunca me has dejado caer sola...",
      fullMessage: "Cuando las cosas se han puesto difíciles o cuando me he sentido abrumada y cansada, siempre has tenido una palabra de aliento y una mano extendida para mí. Saber que cuento con tu respaldo me da una tranquilidad enorme.",
      unlocked: false
    },
    {
      id: 5,
      title: "La Paz Que Me Brindas",
      subtitle: "Mi Lugar Tranquilo",
      category: "Paz",
      iconName: "HeartHandshake",
      previewText: "Contigo puedo ser completamente yo misma...",
      fullMessage: "A tu lado siento una calma que no encuentro en ningún otro lugar. No tengo que fingir ni ponerme máscaras; me siento escuchada, respetada y querida tal y como soy, y saber que puedo confiar en ti es un verdadero tesoro.",
      unlocked: false
    },
    {
      id: 6,
      title: "Nuestros Momentos Cotidianos",
      subtitle: "La Belleza de lo Simple",
      category: "Recuerdos",
      iconName: "Compass",
      previewText: "Cada charla, sonrisa y momento compartido...",
      fullMessage: "Disfruto profundamente de las cosas más sencillas a tu lado: nuestras conversaciones, reírnos de cualquier detalle o simplemente disfrutar de un momento tranquilo juntos. Es en esa sencillez donde más valoro tu compañía.",
      unlocked: false
    }
  ],

  // <!-- ========================================================== -->
  // <!-- GALERÍA DE FOTOS INTERACTIVA                               -->
  // <!-- ========================================================== -->
  photos: [
    {
      id: "photo-1",
      url: "/media/1789829922430.jpg",
      caption: "Caminatas y Charlas",
      date: "Tardes Tranquilas",
      memoryNote: "Caminar a tu lado compartiendo conversaciones sinceras. Agradezco cada instante en el que me brindas tu tiempo y tu compañía.",
      heartCount: 99
    },
    {
      id: "photo-2",
      url: "/media/1789830160648.jpg",
      caption: "Abrazos y Serenidad",
      date: "Momentos de Calma",
      memoryNote: "En tus abrazos encuentro un refugio de paz. Gracias por cuidarme con tanta dulzura y hacerme sentir tan bien.",
      heartCount: 143
    },
    {
      id: "photo-3",
      url: "/media/1789829915845.jpg",
      caption: "Risas Compartidas",
      date: "Nuestras Alegrías",
      memoryNote: "Las sonrisas sinceras y las risas que surgen de forma natural son de los recuerdos que más atesoro en el corazón.",
      heartCount: 256
    },
    {
      id: "photo-4",
      url: "/media/1789829889611.jpg",
      caption: "La Belleza de lo Cotidiano",
      date: "Días de Paz",
      memoryNote: "Compartir un café o una tarde tranquila contigo hace que lo ordinario se convierta en algo muy especial.",
      heartCount: 88
    },
    {
      id: "photo-5",
      url: "/media/1789829910913.jpg",
      caption: "Agradeciendo Cada Paso",
      date: "Mirando Hacia Adelante",
      memoryNote: "Agradezco a la vida por coincidir contigo y por permitirme aprender y crecer a tu lado con respeto y cariño.",
      heartCount: 312
    },
    {
      id: "photo-6",
      url: "/media/1789829905375.jpg",
      caption: "Siempre a Tu Lado",
      date: "Caminando Juntos",
      memoryNote: "Gracias por tu paciencia infinita, tu compañía y cada uno de tus cuidados. Te quiero con todo mi corazón.",
      heartCount: 520
    }
  ]
};