/* ============================================
   QUIZ.JS - Interactive quiz system
   v2.0 - Timer, 10 preguntas, contexto histórico
   ============================================ */

const QuizSystem = {
  currentQuiz: null,
  currentQuestion: 0,
  score: 0,
  answered: false,
  timePerQuestion: 25,
  timerRemaining: 25,
  timerInterval: null,
  quizStartTime: null,

  questions: {
    matematicas: [
      {
        question: 'Cuanto es 25 x 4?',
        options: ['75', '90', '100', '120'],
        correct: 2,
        explanation: '25 x 4 = 100. Multiplicamos 25 cuatro veces.',
        context: 'La multiplicación ya era utilizada por los antiguos egipcios hace más de 4000 años. Ellos usaban un método de duplicación para multiplicar números grandes sin necesidad de tablas.'
      },
      {
        question: 'Cual es el resultado de 144 / 12?',
        options: ['10', '11', '12', '14'],
        correct: 2,
        explanation: '144 / 12 = 12 porque 12 x 12 = 144.',
        context: 'El número 12 tiene una larga historia: los babilonios usaban un sistema numérico basado en 12 (sistema duodecimal). Por eso tenemos 12 meses en un año, 12 horas en el reloj y 12 pulgadas en un pie.'
      },
      {
        question: 'Que es una fraccion equivalente a 1/2?',
        options: ['2/4', '3/4', '1/4', '2/3'],
        correct: 0,
        explanation: '2/4 es equivalente a 1/2 porque si simplificas 2/4 obtienes 1/2.',
        context: 'Las fracciones fueron desarrolladas por los antiguos egipcios alrededor del 1800 a.C. El Papiro Rhind contiene más de 80 problemas matemáticos que utilizan fracciones, principalmente con numerador 1.'
      },
      {
        question: 'Cuanto es 15% de 200?',
        options: ['20', '25', '30', '35'],
        correct: 2,
        explanation: '15% de 200 = (15/100) x 200 = 0.15 x 200 = 30.',
        context: 'El símbolo "%" proviene del italiano "per cento" que significa "por cada cien". Comenzó a usarse en el siglo XV en documentos comerciales italianos y se popularizó gracias a la imprenta.'
      },
      {
        question: 'Cual es el area de un rectangulo de base 8cm y altura 5cm?',
        options: ['30 cm2', '35 cm2', '40 cm2', '45 cm2'],
        correct: 2,
        explanation: 'Area = base x altura = 8 x 5 = 40 cm2.',
        context: 'El estudio de áreas se remonta a Euclides (300 a.C.), el "padre de la geometría". En su obra "Los Elementos", Euclides estableció las bases de la geometría que aún se enseñan hoy en las escuelas.'
      },
      {
        question: 'Cual es la raiz cuadrada de 144?',
        options: ['10', '11', '12', '13'],
        correct: 2,
        explanation: 'La raiz cuadrada de 144 es 12 porque 12 x 12 = 144.',
        context: 'El símbolo de raíz cuadrada (√) fue introducido por el matemático alemán Christoph Rudolff en 1525. Antes de eso, los matemáticos escribían "radix" (raíz en latín) para indicar la operación.'
      },
      {
        question: 'Que numero es XXVII en numeros romanos?',
        options: ['25', '27', '29', '32'],
        correct: 1,
        explanation: 'XXVII = 10+10+5+1+1 = 27.',
        context: 'Los números romanos fueron el sistema numérico estándar en Europa durante más de 1000 años. Se usaban en relojes, libros y documentos oficiales. Hoy se siguen usando para nombrar siglos, reyes y papas.'
      },
      {
        question: 'Cual es el unico numero primo par?',
        options: ['0', '1', '2', '4'],
        correct: 2,
        explanation: 'El 2 es el unico numero primo par. Un primo solo es divisible por 1 y por si mismo.',
        context: 'Eratóstenes (276-194 a.C.) inventó la "Criba de Eratóstenes", un método para encontrar números primos. Los números primos son fundamentales en la criptografía moderna que protege tus datos en internet.'
      },
      {
        question: 'Que operacion se resuelve primero segun PEMDAS?',
        options: ['Suma', 'Multiplicacion', 'Parentesis', 'Resta'],
        correct: 2,
        explanation: 'PEMDAS: Parentesis, Exponentes, Multiplicacion/Division, Adicion/Sustraccion.',
        context: 'La regla PEMDAS (conocida como "papomudas" en español) fue establecida formalmente en el siglo XIX para evitar ambigüedades en las expresiones matemáticas. Antes no había un orden universal.'
      },
      {
        question: 'Que numero sigue en la secuencia: 0, 1, 1, 2, 3, 5, 8...?',
        options: ['10', '11', '12', '13'],
        correct: 3,
        explanation: 'Es la secuencia de Fibonacci: cada numero es suma de los dos anteriores. 5+8=13.',
        context: 'Leonardo de Pisa (Fibonacci) introdujo esta secuencia en 1202 en su libro "Liber Abaci". La secuencia aparece sorprendentemente en la naturaleza: en la disposición de hojas, pétalos de flores y caracoles.'
      }
    ],
    ciencias: [
      {
        question: 'Cual es el planeta mas cercano al Sol?',
        options: ['Venus', 'Mercurio', 'Tierra', 'Marte'],
        correct: 1,
        explanation: 'Mercurio es el planeta mas cercano al Sol.',
        context: 'Mercurio es el planeta más pequeño del sistema solar (solo un poco más grande que la Luna). Un año en Mercurio dura solo 88 días terrestres, pero un día en Mercurio dura 59 días terrestres.'
      },
      {
        question: 'Que organo es responsable de bombear sangre?',
        options: ['Pulmones', 'Higado', 'Corazon', 'Cerebro'],
        correct: 2,
        explanation: 'El corazon bombea sangre a todo el cuerpo.',
        context: 'El corazón humano late aproximadamente 100,000 veces al día y bombea unos 7,500 litros de sangre. ¡En una vida promedio, el corazón late más de 2.5 mil millones de veces sin detenerse!'
      },
      {
        question: 'Estado del agua a 100C?',
        options: ['Solido', 'Liquido', 'Gaseoso', 'Plasma'],
        correct: 2,
        explanation: 'A 100C el agua hierve y se convierte en vapor.',
        context: 'El agua es la única sustancia en la Tierra que existe naturalmente en tres estados: sólido (hielo), líquido y gaseoso (vapor). Esto es posible gracias a las propiedades únicas del enlace de hidrógeno.'
      },
      {
        question: 'Celula basica del sistema nervioso?',
        options: ['Neurona', 'Globulo rojo', 'Celula muscular', 'Celula osea'],
        correct: 0,
        explanation: 'La neurona transmite impulsos nerviosos.',
        context: 'El cerebro humano contiene aproximadamente 86 mil millones de neuronas. Las señales viajan entre neuronas a velocidades de hasta 120 metros por segundo. Santiago Ramón y Cajal, padre de la neurociencia moderna, descubrió que las neuronas son células individuales.'
      },
      {
        question: 'Proceso por el cual las plantas producen alimento?',
        options: ['Respiracion', 'Fotosintesis', 'Digestion', 'Fermentacion'],
        correct: 1,
        explanation: 'La fotosintesis convierte luz en energia.',
        context: 'La fotosíntesis produce aproximadamente el 70% del oxígeno de la atmósfera terrestre. Las plantas convierten la luz solar en energía química, produciendo glucosa y liberando oxígeno como subproducto esencial para nuestra respiración.'
      },
      {
        question: 'Cual es el hueso mas largo del cuerpo humano?',
        options: ['Columna', 'Femur', 'Tibia', 'Humerus'],
        correct: 1,
        explanation: 'El femur es el hueso mas largo del cuerpo.',
        context: 'El fémur mide aproximadamente el 25% de la altura de una persona. En un adulto promedio mide unos 48 cm de largo. Es también uno de los huesos más fuertes, capaz de soportar hasta 1,800 kg de presión.'
      },
      {
        question: 'Cual es la velocidad de la luz en el vacio?',
        options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '100,000 km/s'],
        correct: 0,
        explanation: 'La luz viaja a 300,000 km/s en el vacio.',
        context: 'La velocidad de la luz es la constante fundamental del universo. La luz del Sol tarda solo 8 minutos en llegar a la Tierra, pero la luz de la estrella más cercana (Próxima Centauri) tarda más de 4 años.'
      },
      {
        question: 'Que tipo de roca se forma por enfriamiento del magma?',
        options: ['Sedimentaria', 'Ignea', 'Metamorfica', 'Organica'],
        correct: 1,
        explanation: 'Las rocas igneas se forman por enfriamiento del magma.',
        context: 'El granito es la roca ígnea más común de la corteza continental. El famoso Monte Rushmore en Estados Unidos está tallado en granito. Las rocas ígneas constituyen aproximadamente el 90% de la corteza terrestre.'
      },
      {
        question: 'Cual es el organo mas grande del cuerpo humano?',
        options: ['Higado', 'Piel', 'Cerebro', 'Pulmones'],
        correct: 1,
        explanation: 'La piel es el organo mas grande del cuerpo.',
        context: 'La piel adulta cubre aproximadamente 2 metros cuadrados y pesa entre 3.5 y 4.5 kg. Se regenera completamente cada 28 días aproximadamente. Una persona promedio pierde alrededor de 500 millones de células cutáneas al día.'
      },
      {
        question: 'Que gas es el mas abundante en la atmosfera terrestre?',
        options: ['Oxigeno', 'Dioxido de carbono', 'Nitrogeno', 'Hidrogeno'],
        correct: 2,
        explanation: 'El nitrogeno constituye el 78% de la atmosfera.',
        context: 'El nitrógeno (N2) fue descubierto por Daniel Rutherford en 1772. Aunque es esencial para la vida, no podemos respirarlo directamente. Las bacterias en el suelo convierten el nitrógeno en compuestos que las plantas pueden usar.'
      }
    ],
    ingles: [
      {
        question: 'How do you say "Hola" in English?',
        options: ['Goodbye', 'Hello', 'Thanks', 'Please'],
        correct: 1,
        explanation: '"Hello" is the most common greeting in English.',
        context: 'The word "hello" became popular in the 19th century when the telephone was invented. Thomas Edison suggested using "hello" as a telephone greeting. Before that, "ahoy" was a common greeting!'
      },
      {
        question: 'What is the plural of "child"?',
        options: ['Childs', 'Childes', 'Children', 'Childrens'],
        correct: 2,
        explanation: 'The plural of "child" is "children".',
        context: 'English has several irregular plurals that come from Old English. "Children" is one of them, along with "men", "women", "teeth", and "mice". These are remnants of how English was spoken over 1000 years ago.'
      },
      {
        question: 'She ___ to school every day.',
        options: ['go', 'goes', 'going', 'gone'],
        correct: 1,
        explanation: 'With she/he/it, we add -s to the verb: she goes.',
        context: 'The simple present tense with third person -s is one of the most common grammar patterns in English. It came from Old English verb conjugation (ic gā, þū gǣst, hē gǣþ = I go, you go, he goes).'
      },
      {
        question: 'What does "beautiful" mean?',
        options: ['Feo', 'Grande', 'Hermoso', 'Pequeno'],
        correct: 2,
        explanation: '"Beautiful" means "hermoso" or "bello" in Spanish.',
        context: 'The word "beautiful" comes from "beauty" + "ful". "Beauty" entered English from Old French "beauté" around the 13th century. The word "pretty" originally meant "sly" or "cunning" in Old English.'
      },
      {
        question: 'Which is correct?',
        options: ['I am have a book', 'I has a book', 'I have a book', 'I having a book'],
        correct: 2,
        explanation: '"I have a book" is correct present simple.',
        context: 'Unlike Spanish, which has two verbs for "to be" (ser/estar), English only has one. However, English has a very rich system of auxiliary verbs (do, have, be, will, can, must) that help express time and possibility.'
      },
      {
        question: 'What is the opposite of "hot"?',
        options: ['Warm', 'Cool', 'Cold', 'Ice'],
        correct: 2,
        explanation: 'The opposite of "hot" is "cold".',
        context: 'English has many word pairs that come from different Germanic roots: hot/cold, big/small, fast/slow, good/bad. This is because English is a Germanic language that has absorbed words from Latin, French, and many other languages.'
      },
      {
        question: 'What time is it at 12:00 PM?',
        options: ['Midnight', 'Noon', 'Morning', 'Evening'],
        correct: 1,
        explanation: '12:00 PM is noon (midday).',
        context: 'The 12-hour clock system has been used since ancient times. The Egyptians divided the day into 12 hours using sundials. AM stands for "Ante Meridiem" (before noon) and PM for "Post Meridiem" (after noon) in Latin.'
      },
      {
        question: 'Which word is a preposition?',
        options: ['Run', 'Blue', 'Under', 'Happy'],
        correct: 2,
        explanation: '"Under" is a preposition showing position.',
        context: 'Prepositions are among the hardest words to learn in any language. English has about 150 prepositions, but the most common ones (in, on, at, for, with) account for most usage. They show relationships of time, place, and direction.'
      },
      {
        question: 'How do you say "gracias" in English?',
        options: ['Please', 'Sorry', 'Thank you', 'Welcome'],
        correct: 2,
        explanation: '"Thank you" means "gracias" in English.',
        context: 'The phrase "thank you" comes from Old English "þancian" (to thank). The word "thanks" appears in the earliest English writings from the 8th century. In modern English, "thanks" is more casual and "thank you" is more formal.'
      },
      {
        question: 'Which sentence is in past tense?',
        options: ['I eat pizza', 'I ate pizza', 'I will eat pizza', 'I am eating pizza'],
        correct: 1,
        explanation: '"I ate" is past simple tense.',
        context: 'English has many irregular past tense verbs that must be memorized: eat/ate, go/went, see/saw, buy/bought, think/thought. These are among the most common verbs in English and their irregular forms come from Old English conjugations.'
      }
    ],
    historia: [
      {
        question: 'En que ano descubrio Colon America?',
        options: ['1490', '1492', '1498', '1500'],
        correct: 1,
        explanation: 'Cristobal Colon llego a America el 12 de octubre de 1492.',
        context: 'Colón zarpó con tres carabelas: La Niña, La Pinta y La Santa María. Aunque buscaba una ruta a Asia, llegó a las Bahamas. Murió en 1506 creyendo que había llegado a Asia, sin saber que había descubierto un nuevo continente.'
      },
      {
        question: 'Civilizacion que construyo Machu Picchu?',
        options: ['Azteca', 'Maya', 'Inca', 'Olmeca'],
        correct: 2,
        explanation: 'Los Incas construyeron Machu Picchu en los Andes peruanos.',
        context: 'Machu Picchu fue construida alrededor de 1450 durante el apogeo del Imperio Inca. Permaneció desconocida para el mundo exterior hasta que Hiram Bingham la redescubrió en 1911. Es considerada una de las 7 maravillas del mundo moderno.'
      },
      {
        question: 'Primer presidente de Estados Unidos?',
        options: ['Jefferson', 'Washington', 'Lincoln', 'Adams'],
        correct: 1,
        explanation: 'George Washington fue el primer presidente (1789-1797).',
        context: 'Washington estableció muchas tradiciones presidenciales, incluyendo el límite de dos mandatos (que luego se convirtió en ley). Cuando se le ofreció ser rey, rechazó la oferta. Su rostro está en el billete de 1 dólar y la moneda de 25 centavos.'
      },
      {
        question: 'Evento que marco inicio de la Edad Media?',
        options: ['Caida de Roma', 'Descubrimiento de America', 'Revolucion Francesa', 'Primera Guerra Mundial'],
        correct: 0,
        explanation: 'La caida de Roma (476 d.C.) marco el inicio de la Edad Media.',
        context: 'El Imperio Romano de Occidente cayó cuando el rey germánico Odoacro depuso al último emperador romano, Rómulo Augústulo. La Edad Media duró aproximadamente 1000 años, hasta la caída de Constantinopla en 1453.'
      },
      {
        question: 'Quien pinto la Mona Lisa?',
        options: ['Miguel Angel', 'Leonardo da Vinci', 'Rafael', 'Donatello'],
        correct: 1,
        explanation: 'Leonardo da Vinci pinto la Mona Lisa entre 1503 y 1519.',
        context: 'La Mona Lisa es famosa por su enigmática sonrisa. Leonardo se llevó el cuadro a Francia cuando se mudó allí y nunca lo entregó al cliente. Hoy está en el Museo del Louvre de París, protegida por una urna blindada especial.'
      },
      {
        question: 'Quien fue el primer emperador de Roma?',
        options: ['Julio Cesar', 'Augusto', 'Neron', 'Trajano'],
        correct: 1,
        explanation: 'Augusto fue el primer emperador romano (27 a.C.).',
        context: 'Augusto, cuyo nombre original era Octavio, era el sobrino-nieto de Julio César. Gobernó durante 41 años y trajo la Pax Romana (paz romana), un período de estabilidad que duró 200 años en el Mediterráneo.'
      },
      {
        question: 'En que pais se originaron los Juegos Olimpicos?',
        options: ['Italia', 'Egipto', 'Grecia', 'Persia'],
        correct: 2,
        explanation: 'Los Juegos Olimpicos se originaron en Grecia en el 776 a.C.',
        context: 'Los primeros Juegos Olímpicos se celebraron en Olimpia, Grecia, en honor al dios Zeus. Solo participaban hombres que competían desnudos. Las competencias incluían carreras, lucha, boxeo y carreras de caballos.'
      },
      {
        question: 'Que muralla separaba Alemania Oriental y Occidental?',
        options: ['Muralla China', 'Muro de Berlin', 'Muro de Adriano', 'Muro de las Lamentaciones'],
        correct: 1,
        explanation: 'El Muro de Berlin dividio Alemania de 1961 a 1989.',
        context: 'El Muro de Berlín fue construido por la República Democrática Alemana para evitar que la gente huyera a Occidente. Medía 155 km de largo. Su caída el 9 de noviembre de 1989 simbolizó el fin de la Guerra Fría.'
      },
      {
        question: 'Quien escribio "El Quijote"?',
        options: ['Lope de Vega', 'Miguel de Cervantes', 'Garcilaso de la Vega', 'Calderon de la Barca'],
        correct: 1,
        explanation: 'Miguel de Cervantes escribio Don Quijote de la Mancha en 1605.',
        context: '"El ingenioso hidalgo Don Quijote de la Mancha" es considerada la primera novela moderna de la historia. Cervantes la escribió mientras estaba en la cárcel. Es el libro más traducido después de la Biblia.'
      },
      {
        question: 'Cual fue la primera civilizacion en desarrollar la escritura?',
        options: ['Egipcia', 'Sumeria', 'China', 'India'],
        correct: 1,
        explanation: 'Los sumerios inventaron la escritura cuneiforme alrededor del 3500 a.C.',
        context: 'La escritura cuneiforme sumeria comenzó como dibujos en tablillas de arcilla que representaban objetos. Con el tiempo, evolucionó a símbolos que representaban sonidos. Este invento marcó el fin de la prehistoria y el inicio de la historia.'
      }
    ],
    Español: [
      {
        question: 'Que es un sustantivo?',
        options: ['Palabra que nombra', 'Palabra que indica accion', 'Palabra que describe', 'Palabra que reemplaza numeros'],
        correct: 0,
        explanation: 'El sustantivo nombra personas, animales o cosas.',
        context: 'El español tiene dos géneros gramaticales (masculino y femenino) que vienen del latín. A diferencia del inglés, todos los sustantivos tienen género: "el libro" (masculino) y "la mesa" (femenino).'
      },
      {
        question: 'Cual de estas es un verbo?',
        options: ['Mesa', 'Correr', 'Rojo', 'Casa'],
        correct: 1,
        explanation: '"Correr" expresa una accion.',
        context: 'El español tiene tres conjugaciones verbales: -ar (cantar), -er (comer), -ir (vivir). Cada verbo puede conjugarse en más de 50 formas diferentes según el tiempo, modo y persona.'
      },
      {
        question: 'Signo para hacer una pregunta?',
        options: ['.', '¡!', '¿?', ','],
        correct: 2,
        explanation: 'Los signos ¿? se usan para preguntas.',
        context: 'El español es el único idioma que usa el signo de apertura ¿ antes de una pregunta. Esta innovación fue propuesta por la Real Academia Española en 1754 para ayudar a los lectores a identificar el tono desde el principio.'
      },
      {
        question: 'Plural de "libro"?',
        options: ['Libroes', 'Libros', 'Libras', 'Libre'],
        correct: 1,
        explanation: 'El plural de "libro" es "libros".',
        context: 'En español, la mayoría de los plurales se forman añadiendo -s (si termina en vocal) o -es (si termina en consonante). Esta regla viene directamente del latín vulgar.'
      },
      {
        question: 'Palabra escrita correctamente?',
        options: ['Arvol', 'Escuela', 'Vakas', 'Jirrafa'],
        correct: 1,
        explanation: '"Escuela" esta escrita correctamente.',
        context: 'La ortografía española es bastante fonética comparada con el inglés. Sin embargo, hay letras que suenan igual (B/V, C/S/Z, G/J) lo que causa confusiones. La palabra "escuela" viene del latín "schola".'
      },
      {
        question: 'Que es un adjetivo?',
        options: ['Describe al verbo', 'Describe al sustantivo', 'Nombra personas', 'Conecta oraciones'],
        correct: 1,
        explanation: 'El adjetivo describe cualidades del sustantivo.',
        context: 'En español, los adjetivos generalmente van después del sustantivo (casa blanca), al contrario del inglés donde van antes (white house). También deben concordar en género y número con el sustantivo.'
      },
      {
        question: 'Cual es el sujeto de: "El perro corre rapido"?',
        options: ['Corre', 'Rapido', 'El perro', 'Perro corre'],
        correct: 2,
        explanation: '"El perro" es el sujeto de la oracion.',
        context: 'En español, el sujeto puede omitirse porque la conjugación del verbo indica quién realiza la acción. "Corro" ya significa "yo corro", mientras que en inglés siempre debemos decir "I run".'
      },
      {
        question: 'Que son las palabras agudas?',
        options: ['Ultima silaba tonica', 'Penultima silaba tonica', 'Antepenultima tonica', 'Sin acento'],
        correct: 0,
        explanation: 'Las agudas tienen la ultima silaba tonica.',
        context: 'Las palabras agudas llevan tilde si terminan en N, S o vocal. Por ejemplo: "corazón", "jamás", "café". Esta regla fue establecida por la Real Academia Española en el siglo XVIII para estandarizar el idioma.'
      },
      {
        question: 'Que es una metafora?',
        options: ['Comparacion con "como"', 'Identificacion de un termino con otro', 'Exageracion', 'Repeticion de sonidos'],
        correct: 1,
        explanation: 'La metafora identifica un termino real con otro imaginario.',
        context: 'La metáfora es una de las figuras retóricas más antiguas, usada desde la época de Aristóteles (384-322 a.C.). Ejemplo famoso: "Tus ojos son dos luceros" donde los ojos se comparan con luceros sin usar "como".'
      },
      {
        question: 'Cual es el sinonimo de "feliz"?',
        options: ['Triste', 'Alegre', 'Enojado', 'Cansado'],
        correct: 1,
        explanation: '"Alegre" es un sinonimo de "feliz".',
        context: 'Los sinónimos son palabras que tienen significado similar. El español es especialmente rico en sinónimos gracias a su herencia latina y árabe. Por ejemplo, "feliz" tiene más de 20 sinónimos: contento, dichoso, gozoso, jubiloso...'
      }
    ],
    'Ética': [
      {
        question: 'Que valor nos enseña a decir la verdad?',
        options: ['Respeto', 'Honestidad', 'Responsabilidad', 'Solidaridad'],
        correct: 1,
        explanation: 'La honestidad es decir la verdad y actuar correctamente.',
        context: 'La honestidad es considerada un valor universal en todas las culturas. El filósofo griego Sócrates (470-399 a.C.) dedicó su vida a buscar la verdad y enseñó que "una vida sin examen no vale la pena vivirse".'
      },
      {
        question: 'Como respetar a los demas?',
        options: ['Gritarles', 'Ignorarlos', 'Escuchar y tratar bien', 'Pelear'],
        correct: 2,
        explanation: 'El respeto es tratar bien y escuchar a los demas.',
        context: 'El concepto de respeto es central en la filosofía de Immanuel Kant (1724-1804), quien formuló el "imperativo categórico": trata a las personas siempre como un fin, nunca solo como un medio.'
      },
      {
        question: 'Que significa ser responsable?',
        options: ['Cumplir con deberes', 'Romper reglas', 'Mentir', 'No ayudar'],
        correct: 0,
        explanation: 'La responsabilidad es cumplir con nuestros deberes.',
        context: 'El filósofo Jean-Paul Sartre (1905-1980) decía que "estamos condenados a ser libres" y que esa libertad trae consigo una enorme responsabilidad por nuestras acciones y sus consecuencias.'
      },
      {
        question: 'Valor demostrado ayudando a otros?',
        options: ['Solidaridad', 'Enojo', 'Desorden', 'Egoismo'],
        correct: 0,
        explanation: 'La solidaridad es ayudar y apoyar a otros.',
        context: 'La palabra "solidaridad" proviene del latín "solidus" que significa "sólido" o "firme". Es un valor que implica un compromiso activo con el bienestar de los demás. Madre Teresa de Calcuta es un ejemplo icónico de solidaridad.'
      },
      {
        question: 'Que hacer cuando cometemos un error?',
        options: ['Escapar', 'Culpar a otros', 'Reconocer y disculparse', 'Ignorar'],
        correct: 2,
        explanation: 'Reconocer errores demuestra respeto y honestidad.',
        context: 'Aristóteles decía que "el sabio no dice todo lo que piensa, pero siempre piensa todo lo que dice". Reconocer un error no es una debilidad, sino una muestra de madurez y fortaleza de carácter.'
      },
      {
        question: 'Que es la justicia?',
        options: ['Vencer siempre', 'Dar a cada quien lo suyo', 'Tener mas poder', 'Acumular riquezas'],
        correct: 1,
        explanation: 'La justicia es dar a cada quien lo que le corresponde.',
        context: 'La justicia es una de las cuatro virtudes cardinales de la filosofía clásica (junto con la prudencia, la templanza y la fortaleza). Platón dedicó su obra "La República" a explorar qué significa una sociedad justa.'
      },
      {
        question: 'Que es un dilema etico?',
        options: ['Problema simple', 'Eleccion entre dos opciones dificiles', 'Un juego', 'Una ley'],
        correct: 1,
        explanation: 'Un dilema etico presenta una eleccion entre opciones complejas.',
        context: 'El "Dilema del tranvía" es uno de los experimentos mentales más famosos de la ética. Fue formulado por Philippa Foot en 1967 y nos ayuda a entender diferentes teorías éticas como el utilitarismo y la deontología.'
      },
      {
        question: 'Que filosofia dice "el fin justifica los medios"?',
        options: ['Estoicismo', 'Maquiavelismo', 'Existencialismo', 'Idealismo'],
        correct: 1,
        explanation: 'El maquiavelismo sostiene que el fin justifica los medios.',
        context: 'Nicolás Maquiavelo (1469-1527) escribió "El Príncipe", un manual sobre cómo gobernar. Aunque se le atribuye la frase "el fin justifica los medios", él nunca la escribió exactamente así. Su obra sigue siendo polémica 500 años después.'
      },
      {
        question: 'Que promueve la etica ambiental?',
        options: ['Contaminar', 'Cuidar el planeta', 'Gastar recursos', 'Ignorar la naturaleza'],
        correct: 1,
        explanation: 'La etica ambiental promueve el cuidado del planeta.',
        context: 'La ética ambiental surge en el siglo XX con autores como Aldo Leopold y su "Ética de la Tierra". Hoy es más relevante que nunca ante el cambio climático. Nos recuerda que los humanos somos parte de la naturaleza, no sus dueños.'
      },
      {
        question: 'Que es la empatia?',
        options: ['Sentir lastima', 'Ponerse en el lugar del otro', 'Ser debil', 'Ignorar a los demas'],
        correct: 1,
        explanation: 'La empatia es la capacidad de comprender los sentimientos ajenos.',
        context: 'La palabra "empatía" proviene del griego "empatheia" (en = dentro, pathos = sentimiento). Estudios de neurociencia han descubierto las "neuronas espejo", que se activan tanto cuando hacemos algo como cuando vemos a otro hacerlo.'
      }
    ]
  },

  init: function (subject) {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    this.currentQuiz = this.questions[subject] || this.questions.matematicas;
    this.currentQuestion = 0;
    this.score = 0;
    this.answered = false;
    this.quizStartTime = Date.now();
    if (this._totalTimeouts) clearTimeout(this._totalTimeouts);
    this.render();
  },

  render: function () {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const quiz = this.currentQuiz;
    const total = quiz.length;
    const q = quiz[this.currentQuestion];

    if (this.currentQuestion >= total) {
      this.showResult(container);
      return;
    }

    const letters = ['A', 'B', 'C', 'D'];
    const progress = ((this.currentQuestion + 1) / total) * 100;

    container.innerHTML = `
      <div class="quiz-header">
        <div class="quiz-progress-text">Pregunta ${this.currentQuestion + 1} de ${total}</div>
        <div class="quiz-timer" id="quiz-timer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span id="timer-display">${this.timePerQuestion}s</span>
        </div>
        <div class="quiz-score">Puntaje: ${this.score}</div>
      </div>
      <div class="progress-bar" style="margin-bottom: 0;" role="progressbar" aria-valuenow="${this.currentQuestion + 1}" aria-valuemin="1" aria-valuemax="${total}">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
      <div class="timer-bar" id="timer-bar">
        <div class="timer-fill" id="timer-fill" style="width: 100%"></div>
      </div>
      <div class="quiz-question fade-in" role="region" aria-label="Pregunta ${this.currentQuestion + 1}">
        <h3>${q.question}</h3>
        <div class="quiz-options" role="radiogroup" aria-label="Opciones de respuesta">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}" role="radio" aria-checked="false" ${this.answered ? 'disabled' : ''}>
              <span class="quiz-option-letter">${letters[i]}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
      <div id="quiz-feedback" class="fade-in" role="alert" aria-live="polite"></div>
      <div class="quiz-navigation">
        <button class="btn btn-secondary" id="quiz-prev" ${this.currentQuestion === 0 ? 'disabled style="opacity:0.4"' : ''}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          Anterior
        </button>
        <button class="btn btn-primary" id="quiz-next" ${!this.answered ? 'disabled style="opacity:0.4"' : ''}>
          ${this.currentQuestion === total - 1 ? 'Ver Resultado' : 'Siguiente'}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    this.bindEvents();
    this.startTimer();
  },

  startTimer: function () {
    if (this.answered) return;
    this.stopTimer();
    this.timerRemaining = this.timePerQuestion;
    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      this.timerRemaining--;
      this.updateTimerDisplay();
      if (this.timerRemaining <= 0) {
        this.stopTimer();
        this.timeUp();
      }
    }, 1000);
  },

  stopTimer: function () {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  updateTimerDisplay: function () {
    const display = document.getElementById('timer-display');
    const fill = document.getElementById('timer-fill');
    if (display) display.textContent = this.timerRemaining + 's';
    if (fill) {
      const pct = (this.timerRemaining / this.timePerQuestion) * 100;
      fill.style.width = pct + '%';
      const timerEl = document.getElementById('quiz-timer');
      if (timerEl) {
        timerEl.style.color = this.timerRemaining <= 5 ? 'var(--subject-history)' : 'var(--text-secondary)';
      }
      if (fill) {
        fill.style.background = this.timerRemaining <= 5
          ? 'linear-gradient(90deg, #ef4444, #dc2626)'
          : 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))';
      }
    }
  },

  timeUp: function () {
    if (this.answered) return;
    this.answered = true;
    const options = document.querySelectorAll('.quiz-option');
    const q = this.currentQuiz[this.currentQuestion];
    options.forEach((opt, i) => {
      opt.disabled = true;
      if (i === q.correct) opt.classList.add('correct');
    });
    const feedback = document.getElementById('quiz-feedback');
    if (feedback) {
      feedback.innerHTML = `
        <div style="padding: 16px; background: rgba(239, 68, 68, 0.06); backdrop-filter: blur(8px); border-radius: 12px; margin-top: 16px; border-left: 4px solid var(--subject-history); animation: slideUp 0.3s ease forwards;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--subject-history)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <strong style="color: var(--subject-history)">Se acabo el tiempo</strong>
          </div>
          <p style="color: var(--text-secondary); font-size: var(--text-sm); line-height: 1.6; margin: 0;">${q.explanation}</p>
        </div>
      `;
    }
    const nextBtn = document.getElementById('quiz-next');
    if (nextBtn) { nextBtn.disabled = false; nextBtn.style.opacity = '1'; }
  },

  bindEvents: function () {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    container.querySelectorAll('.quiz-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.answered) return;
        this.selectOption(parseInt(btn.dataset.index));
      });
    });

    const nextBtn = document.getElementById('quiz-next');
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());

    const prevBtn = document.getElementById('quiz-prev');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevQuestion());
  },

  selectOption: function (index) {
    if (typeof index !== 'number' || index < 0) return;
    this.stopTimer();
    this.answered = true;
    const quiz = this.currentQuiz;
    const q = quiz[this.currentQuestion];

    if (!q || !q.options || index >= q.options.length) return;

    const options = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');

    options.forEach((opt, i) => {
      opt.disabled = true;
      opt.setAttribute('aria-checked', i === index ? 'true' : 'false');
      if (i === q.correct) {
        opt.classList.add('correct');
      } else if (i === index && i !== q.correct) {
        opt.classList.add('incorrect');
      }
    });

    const isCorrect = index === q.correct;
    if (isCorrect) {
      this.score++;
      this.showToast('Correcto!', 'success');
    } else {
      this.showToast('Incorrecto', 'error');
    }

    if (feedback) {
      feedback.innerHTML = `
        <div style="padding: 16px; background: ${isCorrect ? 'rgba(16, 185, 129, 0.06)' : 'rgba(239, 68, 68, 0.06)'}; backdrop-filter: blur(8px); border-radius: 12px; margin-top: 16px; border-left: 4px solid ${isCorrect ? 'var(--subject-science)' : 'var(--subject-history)'}; animation: slideUp 0.3s ease forwards;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${isCorrect ? 'var(--subject-science)' : 'var(--subject-history)'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              ${isCorrect
                ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
                : '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'}
            </svg>
            <strong style="color: ${isCorrect ? 'var(--subject-science)' : 'var(--subject-history)'}">
              ${isCorrect ? '¡Correcto!' : 'Incorrecto'}
            </strong>
          </div>
          <p style="color: var(--text-secondary); font-size: var(--text-sm); line-height: 1.6; margin-bottom: 12px;">${q.explanation}</p>
          <div style="padding: 12px; background: var(--bg-secondary); border-radius: 8px; border-left: 3px solid var(--accent-tertiary);">
            <p style="color: var(--text-secondary); font-size: var(--text-xs); line-height: 1.6; margin: 0;">
              <strong style="color: var(--accent-tertiary);">📖 Sabias que...</strong><br>
              ${q.context || 'No hay informacion adicional disponible.'}
            </p>
          </div>
        </div>
      `;
    }

    const nextBtn = document.getElementById('quiz-next');
    if (nextBtn) {
      nextBtn.disabled = false;
      nextBtn.style.opacity = '1';
    }
  },

  nextQuestion: function () {
    this.stopTimer();
    this.currentQuestion++;
    this.answered = false;
    this.render();
  },

  prevQuestion: function () {
    if (this.currentQuestion > 0) {
      this.stopTimer();
      this.currentQuestion--;
      this.answered = false;
      this.render();
    }
  },

  showResult: function (container) {
    this.stopTimer();
    const quiz = this.currentQuiz;
    if (!quiz) return;
    const total = quiz.length;
    const percent = total > 0 ? Math.round((this.score / total) * 100) : 0;

    const timeElapsed = Math.round((Date.now() - this.quizStartTime) / 1000);
    const timeBonus = timeElapsed < total * 12 ? '¡Completaste el quiz en tiempo record!' : '';
    const perfectBonus = percent === 100 ? '🏆 ¡Perfecto! Eres un verdadero experto.' : '';

    let grade = '';
    if (percent >= 90) grade = 'Excelente!';
    else if (percent >= 70) grade = 'Muy bien!';
    else if (percent >= 50) grade = 'Bien, sigue practicando';
    else grade = 'Sigue intentando, tu puedes!';

    const subjectKey = Object.keys(this.questions).find(k => this.questions[k] === this.currentQuiz);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    container.innerHTML = `
      <div class="quiz-result" role="region" aria-label="Resultado del quiz">
        <h3>Quiz Completado</h3>
        <div class="score" aria-live="polite">${this.score}/${total}</div>
        <p style="font-size: 1.25rem; font-weight: 600; color: var(--text-primary);">${grade}</p>
        <p>Respondiste correctamente ${this.score} de ${total} preguntas (${percent}%)</p>
        <p style="font-size: var(--text-sm); color: var(--text-tertiary);">Tiempo total: ${minutes}:${seconds.toString().padStart(2, '0')}</p>
        ${timeBonus ? `<p style="font-size: var(--text-base); font-weight: 600; color: var(--accent-primary); margin-top: 8px;">⏱️ ${timeBonus}</p>` : ''}
        ${perfectBonus ? `<p style="font-size: var(--text-base); font-weight: 700; color: #f59e0b; margin-top: 8px;">${perfectBonus}</p>` : ''}
        <div class="progress-bar" style="max-width: 300px; margin: 16px auto;" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-fill" style="width: ${percent}%"></div>
        </div>
        <button class="btn btn-primary" id="quiz-retry">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
          Intentar de nuevo
        </button>
      </div>
    `;

    const retryBtn = document.getElementById('quiz-retry');
    if (retryBtn && subjectKey) {
      retryBtn.addEventListener('click', () => this.init(subjectKey));
    }

    this.updateProgress(subjectKey, percent);
  },

  showToast: function (message, type) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');

    const icons = {
      success: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
      error: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
      info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
      warning: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
    };

    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[type] || icons.info}</svg>
      ${message}
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  },

  updateProgress: function (subject, percent) {
    if (!subject) return;
    try {
      const saved = JSON.parse(localStorage.getItem('studyProgress') || '{}');
      saved[subject] = Math.max(saved[subject] || 0, percent);
      localStorage.setItem('studyProgress', JSON.stringify(saved));
      const event = new CustomEvent('progressUpdated', { detail: saved });
      document.dispatchEvent(event);
    } catch (e) {
      console.warn('No se pudo guardar el progreso:', e.message);
    }
  },

  topicQuestions: {
    matematicas: {
      algebra: [
        { q:'¿Qué representa una variable en álgebra?', o:['Un número fijo','Un valor desconocido','Una operación','Un signo'], c:1 },
        { q:'Resuelve: 2x + 3 = 7. ¿Cuánto vale x?', o:['1','2','3','4'], c:1 },
        { q:'¿Qué significa la palabra "álgebra" en árabe?', o:['Números','Reunión o restauración','Cálculos','Ecuaciones'], c:1 }
      ],
      geometria: [
        { q:'¿Cuántos lados tiene un hexágono?', o:['4','5','6','8'], c:2 },
        { q:'¿Cuál es el área de un cuadrado de lado 5cm?', o:['20 cm²','25 cm²','30 cm²','10 cm²'], c:1 },
        { q:'¿Qué forma usan los panales de abejas?', o:['Cuadrado','Círculo','Hexágono','Triángulo'], c:2 }
      ],
      aritmetica: [
        { q:'¿Cuánto es 25 × 4?', o:['75','90','100','120'], c:2 },
        { q:'¿Cuánto es 15% de 200?', o:['20','25','30','35'], c:2 },
        { q:'¿Qué fracción es equivalente a 3/4?', o:['6/8','2/4','4/6','1/2'], c:0 }
      ],
      potencias: [
        { q:'¿Cuánto es 5²?', o:['10','15','20','25'], c:3 },
        { q:'¿Cuál es la raíz cuadrada de 144?', o:['10','11','12','13'], c:2 },
        { q:'¿Quién introdujo el símbolo √?', o:['Euclides','Pitágoras','Rudolff','Fibonacci'], c:2 }
      ],
      primos: [
        { q:'¿Cuál es el único número primo par?', o:['0','1','2','4'], c:2 },
        { q:'¿Qué número sigue en Fibonacci: 0, 1, 1, 2, 3, 5, 8...?', o:['10','11','12','13'], c:3 },
        { q:'¿Para qué se usan los números primos hoy?', o:['Cocinar','Criptografía','Deportes','Música'], c:1 }
      ]
    },
    ciencias: {
      biologia: [
        { q:'¿Cuántas células tiene el cuerpo humano aprox?', o:['1 billón','10 billones','37.2 billones','100 billones'], c:2 },
        { q:'¿Qué proceso usan las plantas para producir alimento?', o:['Respiración','Fotosíntesis','Digestión','Fermentación'], c:1 },
        { q:'¿Cuál es el nivel más básico de organización biológica?', o:['Tejido','Órgano','Célula','Organismo'], c:2 }
      ],
      quimica: [
        { q:'¿Cuál es la fórmula del agua?', o:['CO₂','H₂O','NaCl','O₂'], c:1 },
        { q:'¿Qué estado del agua ocurre a 100°C?', o:['Sólido','Líquido','Gaseoso','Plasma'], c:2 },
        { q:'¿El oxígeno es un...?', o:['Compuesto','Elemento','Mezcla','Aleación'], c:1 }
      ],
      fisica: [
        { q:'¿Cuál es la velocidad de la luz en el vacío?', o:['150,000 km/s','300,000 km/s','500,000 km/s','100,000 km/s'], c:1 },
        { q:'¿Cuánto tarda la luz del Sol en llegar a la Tierra?', o:['2 minutos','5 minutos','8 minutos','15 minutos'], c:2 },
        { q:'¿Qué rama estudia el movimiento y las fuerzas?', o:['Óptica','Termodinámica','Mecánica','Acústica'], c:2 }
      ],
      astronomia: [
        { q:'¿Cuál es el planeta más cercano al Sol?', o:['Venus','Mercurio','Tierra','Marte'], c:1 },
        { q:'¿Cuánto dura un año en Mercurio?', o:['88 días','365 días','59 días','200 días'], c:0 },
        { q:'¿Qué planeta tiene la Gran Mancha Roja?', o:['Saturno','Marte','Júpiter','Neptuno'], c:2 }
      ],
      cuerpo: [
        { q:'¿Cuál es el hueso más largo del cuerpo?', o:['Columna','Fémur','Tibia','Húmero'], c:1 },
        { q:'¿Cuántas veces late el corazón al día?', o:['10,000','50,000','100,000','1,000,000'], c:2 },
        { q:'¿Cuál es el órgano más grande del cuerpo?', o:['Hígado','Piel','Cerebro','Pulmones'], c:1 }
      ]
    },
    ingles: {
      vocabulary: [
        { q:'¿Qué significa "beautiful"?', o:['Feo','Grande','Hermoso','Pequeño'], c:2 },
        { q:'¿Cómo se dice "gracias" en inglés?', o:['Please','Sorry','Thank you','Welcome'], c:2 },
        { q:'¿Cuál es el opuesto de "hot"?', o:['Warm','Cool','Cold','Ice'], c:2 }
      ],
      grammar: [
        { q:'She ___ to school every day.', o:['go','goes','going','gone'], c:1 },
        { q:'¿Cuál es la estructura básica de una oración?', o:['Verbo+Sujeto','Sujeto+Verbo+Objeto','Objeto+Verbo','Adjetivo+Sustantivo'], c:1 },
        { q:'"Under" es una...', o:['Preposición','Conjunción','Interjección','Onomatopeya'], c:0 }
      ],
      conversation: [
        { q:'¿Cuántas personas hablan inglés en el mundo?', o:['500 millones','1,000 millones','1,500 millones','2,000 millones'], c:2 },
        { q:'¿Cómo saludas formalmente?', o:['Hey!','Hello, how are you?','What\'s up?','Yo!'], c:1 },
        { q:'¿Qué significa "Nice to meet you"?', o:['Adiós','Mucho gusto','Buenos días','Lo siento'], c:1 }
      ],
      time: [
        { q:'¿Qué significa 12:00 PM?', o:['Medianoche','Mediodía','Mañana','Tarde'], c:1 },
        { q:'¿Qué significa AM?', o:['After Midnight','Ante Meridiem','Antes del mediodía','A media tarde'], c:1 },
        { q:'¿Cómo se dice "1:30" en inglés?', o:['One thirty','Half one','Quarter past one','Half past one'], c:0 }
      ],
      irregulars: [
        { q:'¿Cuál es el pasado de "go"?', o:['goed','went','gone','going'], c:1 },
        { q:'¿Cuál es el pasado de "eat"?', o:['eated','ate','aten','eating'], c:1 },
        { q:'¿Cuántos verbos irregulares hay en inglés aproximadamente?', o:['50','100','200','500'], c:2 }
      ]
    },
    historia: {
      antigua: [
        { q:'¿Cuándo se inventó la escritura?', o:['2000 a.C.','3500 a.C.','5000 a.C.','1000 a.C.'], c:1 },
        { q:'¿Quién fue el primer emperador romano?', o:['Julio César','Augusto','Nerón','Trajano'], c:1 },
        { q:'¿Dónde se originaron los Juegos Olímpicos?', o:['Italia','Egipto','Grecia','Persia'], c:2 }
      ],
      media: [
        { q:'¿Qué evento marcó el inicio de la Edad Media?', o:['Caída de Roma','Descubrimiento de América','Revolución Francesa','Primera Guerra Mundial'], c:0 },
        { q:'¿Qué eran los castillos medievales además de fortalezas?', o:['Escuelas','Centros administrativos','Hospitales','Mercados'], c:1 },
        { q:'¿Cómo se llamó la gran epidemia del siglo XIV?', o:['Gripe española','Peste Negra','Cólera','Viruela'], c:1 }
      ],
      moderna: [
        { q:'¿En qué año llegó Colón a América?', o:['1490','1492','1498','1500'], c:1 },
        { q:'¿Quién pintó la Mona Lisa?', o:['Miguel Ángel','Leonardo da Vinci','Rafael','Donatello'], c:1 },
        { q:'¿Qué publicó Newton en 1687?', o:['Teoría de la relatividad','Ley de gravitación universal','Teoría de la evolución','Cálculo diferencial'], c:1 }
      ],
      americanas: [
        { q:'¿Qué civilización construyó Machu Picchu?', o:['Azteca','Maya','Inca','Olmeca'], c:2 },
        { q:'¿Cómo se llamaba la capital azteca?', o:['Cusco','Tenochtitlán','Tikal','Chichén Itzá'], c:1 },
        { q:'¿Qué invento matemático desarrollaron los mayas?', o:['El cero','El cálculo','El álgebra','La geometría'], c:0 }
      ],
      siglo20: [
        { q:'¿Cuándo cayó el Muro de Berlín?', o:['1979','1985','1989','1991'], c:2 },
        { q:'¿En qué año llegó el hombre a la Luna?', o:['1965','1967','1969','1971'], c:2 },
        { q:'¿Qué invento revolucionó la comunicación en los 90?', o:['La televisión','Internet','El teléfono','La radio'], c:1 }
      ]
    },
    Español: {
      gramatica: [
        { q:'¿Qué es un sustantivo?', o:['Palabra que nombra','Palabra que indica acción','Palabra que describe','Palabra que conecta'], c:0 },
        { q:'¿Cuál de estas es un verbo?', o:['Mesa','Correr','Rojo','Casa'], c:1 },
        { q:'¿Cuántas conjugaciones verbales tiene el español?', o:['1','2','3','4'], c:2 }
      ],
      ortografia: [
        { q:'¿Qué signo usa el español para preguntas?', o:['.','¡!','¿?',','], c:2 },
        { q:'Las palabras agudas llevan tilde cuando terminan en...', o:['N, S o vocal','Consonante','Vocal','Cualquier letra'], c:0 },
        { q:'¿Cuál está escrita correctamente?', o:['Arvol','Escuela','Vakas','Jirrafa'], c:1 }
      ],
      lectura: [
        { q:'¿Cuál es el libro más traducido después de la Biblia?', o:['El Principito','Don Quijote','Cien Años de Soledad','La Odisea'], c:1 },
        { q:'¿Qué parte de un texto presenta el tema?', o:['Desarrollo','Conclusión','Introducción','Bibliografía'], c:2 },
        { q:'Usar conectores como "además" mejora la...', o:['Ortografía','Cohesión','Creatividad','Velocidad'], c:1 }
      ],
      figuras: [
        { q:'"Tus ojos son dos luceros" es una...', o:['Comparación','Metáfora','Hipérbole','Personificación'], c:1 },
        { q:'¿Qué figura usa "como" para comparar?', o:['Metáfora','Símil','Onomatopeya','Aliteración'], c:1 },
        { q:'"Te he llamado un millón de veces" es un ejemplo de...', o:['Metáfora','Personificación','Hipérbole','Ironía'], c:2 }
      ],
      sinonimos: [
        { q:'¿Cuál es un sinónimo de "feliz"?', o:['Triste','Alegre','Enojado','Cansado'], c:1 },
        { q:'¿Cuántos sinónimos tiene aproximadamente "feliz"?', o:['5','10','20','50'], c:2 },
        { q:'Los antónimos son palabras con significado...', o:['Similar','Opuesto','Igual','Derivado'], c:1 }
      ]
    },
    'Ética': {
      principios: [
        { q:'¿Qué valor nos enseña a decir la verdad?', o:['Respeto','Honestidad','Responsabilidad','Solidaridad'], c:1 },
        { q:'¿Cuál es la "regla de oro" de la ética?', o:['El fin justifica los medios','Trata a otros como quieres ser tratado','Primero yo, después los demás','Todo está permitido'], c:1 },
        { q:'¿Quién dijo "una vida sin examen no vale la pena"?', o:['Aristóteles','Sócrates','Kant','Platón'], c:1 }
      ],
      dilemas: [
        { q:'¿Qué es un dilema moral?', o:['Problema simple','Elección difícil entre opciones','Un juego','Una ley'], c:1 },
        { q:'¿Qué famoso dilema ético involucra un tren?', o:['Dilema del prisionero','Dilema del tranvía','Dilema de Heinz','Apuesta de Pascal'], c:1 },
        { q:'¿Qué filósofo formuló el "imperativo categórico"?', o:['Platón','Aristóteles','Kant','Nietzsche'], c:2 }
      ],
      digital: [
        { q:'¿Qué protege la ética digital?', o:['Las computadoras','La privacidad en línea','Los virus','Los juegos'], c:1 },
        { q:'¿Cómo debemos tratar a otros en internet?', o:['Con indiferencia','Con respeto y empatía','Con agresividad','Sin filtro'], c:1 },
        { q:'¿Qué debemos hacer antes de compartir información?', o:['Compartir rápido','Verificar su veracidad','Ignorar las fuentes','No preguntar'], c:1 }
      ],
      filosofia: [
        { q:'¿Qué corriente dice "el fin justifica los medios"?', o:['Estoicismo','Maquiavelismo','Existencialismo','Idealismo'], c:1 },
        { q:'¿Qué es el utilitarismo?', o:['Buscar el placer','Mayor felicidad para muchos','Vivir con virtud','Seguir reglas'], c:1 },
        { q:'¿Qué dijo Sartre sobre la libertad?', o:['Es limitada','Estamos condenados a ser libres','No existe','Es un derecho'], c:1 }
      ],
      convivencia: [
        { q:'¿Qué son las neuronas espejo?', o:['Células de la piel','Reflejan emociones ajenas','Células musculares','Parte del oído'], c:1 },
        { q:'¿Cuál es la base de una buena convivencia?', o:['Competencia','Empatía','Individualismo','Aislamiento'], c:1 },
        { q:'¿Qué significa comunicación asertiva?', o:['Gritar','Expresarse con respeto','Mentir','Callarse'], c:1 }
      ]
    }
  },

  renderTopicQuiz: function (subject, topic, containerId) {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container) return;
    const questions = this.topicQuestions[subject]?.[topic];
    if (!questions || !questions.length) { container.innerHTML = '<p style="color:var(--text-tertiary);">No hay preguntas disponibles para este tema.</p>'; return; }

    let currentQ = 0;
    let score = 0;
    let answered = false;

    const renderQ = () => {
      if (currentQ >= questions.length) {
        container.innerHTML = `
          <div style="text-align:center;padding:20px;">
            <div style="font-size:1.5rem;font-weight:700;margin-bottom:8px;">Mini-Quiz completado</div>
            <div style="font-size:3rem;font-weight:800;color:var(--accent-primary);">${score}/${questions.length}</div>
            <div style="margin:12px auto;max-width:200px;">
              <div class="progress-bar"><div class="progress-fill" style="width:${(score/questions.length)*100}%"></div></div>
            </div>
            <button class="btn btn-sm btn-outline" onclick="QuizSystem.renderTopicQuiz('${subject}','${topic}','${containerId}')">Reintentar</button>
          </div>
        `;
        return;
      }
      answered = false;
      const q = questions[currentQ];
      const letters = ['A','B','C','D'];
      container.innerHTML = `
        <div style="margin-top:20px;padding-top:20px;border-top:2px solid var(--border-color);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <span style="font-weight:600;font-size:var(--text-sm);color:var(--text-secondary);">Mini-Quiz · Pregunta ${currentQ+1} de ${questions.length}</span>
            <span style="font-weight:600;font-size:var(--text-sm);color:var(--accent-primary);">${score} correctas</span>
          </div>
          <p style="font-weight:600;margin-bottom:12px;">${q.q}</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${q.o.map((opt, i) => `
              <button class="topic-opt" data-idx="${i}" ${answered ? 'disabled' : ''}>
                <span class="topic-opt-letter">${letters[i]}</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
          <div id="topic-feedback-${containerId}" style="margin-top:12px;"></div>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:12px;">
            ${currentQ > 0 ? `<button class="btn btn-sm btn-secondary" id="topic-prev-${containerId}">← Anterior</button>` : ''}
            <button class="btn btn-sm btn-primary" id="topic-next-${containerId}" disabled style="opacity:0.4;">${currentQ === questions.length - 1 ? 'Ver resultado' : 'Siguiente →'}</button>
          </div>
        </div>
      `;
      container.querySelectorAll('.topic-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          const idx = parseInt(btn.dataset.idx);
          const correct = q.c === idx;
          if (correct) score++;
          container.querySelectorAll('.topic-opt').forEach((o, i) => {
            o.disabled = true;
            if (i === q.c) o.classList.add('correct');
            else if (i === idx && i !== q.c) o.classList.add('incorrect');
          });
          const fb = document.getElementById(`topic-feedback-${containerId}`);
          if (fb) fb.innerHTML = `<div style="padding:10px 14px;border-radius:10px;background:${correct ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)'};border-left:4px solid ${correct ? 'var(--subject-science)' : 'var(--subject-history)'};font-size:var(--text-sm);"><strong>${correct ? '✓ Correcto' : '✗ Incorrecto'}</strong></div>`;
          const nextBtn = document.getElementById(`topic-next-${containerId}`);
          if (nextBtn) { nextBtn.disabled = false; nextBtn.style.opacity = '1'; }
        });
      });
      const nextBtnHandler = document.getElementById(`topic-next-${containerId}`);
      if (nextBtnHandler) nextBtnHandler.addEventListener('click', () => { currentQ++; renderQ(); });
      const prevBtnHandler = document.getElementById(`topic-prev-${containerId}`);
      if (prevBtnHandler) prevBtnHandler.addEventListener('click', () => { currentQ--; renderQ(); });
    };
    renderQ();
  }
};