# SWAPI Challenge:

¡Bienvenid@ nuestro code challenge SWAPI! No te asustes, ¡¡es más sencillete
de lo que parece!! Si reusas código y lo estructuras bien, si aplicas un
enfoque iterativo, y no te lías en detalles, esperamos que en un par de
tardes lo puedas dejar fino.

**El reto consiste en crear una web SPA para explorar la API de Star Wars
https://swapi.py4e.com/ (SWAPI). La API ofrece todo tipo de datos sobre cosas
Star Wars, y el objetivo es poder visualizarlas y descubrirlas. Habrá listados
de las diferentes entidades (naves, planetas, personas, etc), con vistas de
detalle que permitan al usuario centrarse en una concreta, y por ejemplo
averiguar qué piloto que nacío en Tatooine es el más viejo de todos...**

O cualquier otra frikada similar :)

El usuario final es el friki de Star Wars, tu objetivo, ofrecerle una
herramienta chula que le permita satisfacer su curiosidad de manera
cómoda e intuitiva!

En los requisitos específicos tienes más detalles de exáctamente qué se
pide, y en los generales tienes también qué herramientas usar y demás.
Hay también una bonus round por si te quieres sobrar. Lo que buscamos es
que nos muestres tus habilidades sobre todo en JavaScript, y orientado a
frontend y consumo de servicios, así que lo mejor es poner ahí el
énfasis. Te puedes salir de lo que se pide si lo crees oportuno cuando
quieras, pero si lo haces tendrá que molar mucho y respetar prioridades
;)

**No nos importa mucho CSS, si te gusta, te recomendamos dejarlo para
el final.**

¡Mucha suerte y esperamos que te enganche un rato!

## Requisitos generales

- Crear un app web SPA con https://swapi.py4e.com/ como capa de servicios.
- Utilizar npm y package.json (simplecillito, no liarse).
- Utilizar únicamente https://www.npmjs.com/package/serve como servidor
  frontal.
- Prescindir de builds, pre-builds, post-builds, o procesados/compilados
  en general.
- Basta con que funcione con la última versión estable de chrome.
- No se valorará CSS ni diseño gráfico, no hace falta dedicarle mucho tiempo.
- No utilizar starter kits ni frameworks frontales o librerías de renderizado.
- Por enfatizar el punto anterior: no utilizar react, vue, svelte, u otros.
- Utilizar únicamente lodash como librería de utilidades.
- Utilizar https://prettier.io/ y cuidar calidad, estructura, y diseño de
  código.
- NO utilizar ningún otro paquete, plugin, widget, o código de tercero
  (incluyendo stack overflow).
- Enfatizar organización y arquitectura de la app: simplicidad, abstracciones,
  claridad, mantenimiento... (y evitar sobreingenierías ;)

## Requisitos espefíficos

- *(No hace falta TODO, eso para 11 sobre 10 ;))*
- Añdair UIs, las que se quieran (páginas, modales, dropdowns, cosas más
  chulas, o una combinación de todas las anteriores), para listar y ver los
  detalles de: pelis, gente, planetas, especies, naves espaciales, y vehículos.
- Cada vista de detalle debe permitir ver también entidades relacionadas (las
  que la API ofrezca), e ir a su vista de detalle. Por ejemplo, Al ver un
  planeta, se podrá ver quién reside en él, o en qué pelis aparece, y se
  podrá explorar una de esas pelis o personas.
- Se debe poder ir a ver fácilmente el listado de entidades desde el detalle
  de entidad (si se está viendo el detalle de una peli, se debe poder ir a
  ver el listado de todas las pelis fácilmente).
- Implementar un buscador en las vistas de listados para poder filtrar las
  entradas (por nombre o como se quiera, eso a tu criterio).
- Implementar un resumen en las vistas de detalle que muestre el total de
  entradas listadas, teniendo en cuenta lo que filtra el buscador.
- Tratar el caso de que la busqueda no ofrezca ningún resultado, pensando en
  lo que verá el usuario y en cómo se le informará de ello.
- La aplicación debe ser tolerante a fallos. ¿Qué ocurre si el servidor no
  responde, o tarda mucho en responder?

## Bonus Round

- Implementar alguna solución para simular peticiones a servicio, que permita
  hacer que tarde la respuesta, o que falle con algún error configurable.
- Aleatoriamente, 1 de cada 10 peticiones a servicio debe tardar 1 segundo más
  de lo normal, usando la pieza descrita en el punto anterior.
- Aleatoriamente, 1 de cada 20 peticiones a servicio debe fallar.
- Se pueden hacer tests y seguir principios TDD, BDD, u otros al gusto.
- Sorpréndenos!
