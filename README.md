# Readme

# Aplicación de Gestión de Tareas

Felipe Andres Morales Alegria (20.171.305-9)

Luis Rodolfo Andaur Arroyo (20.563.271-9)

# Instalación y Ejecución

Sigue estos pasos para instalar y ejecutar la aplicación:

1. Descarga el repositorio desde GitHub.
2. Abre el proyecto en Visual Studio Code.
3. Abre la terminal integrada de VS Code.
4. Instala las dependencias del proyecto ejecutando:
    
    ```bash
    npm install
    ```
    
5. Instala Expo CLI y SQLite:
    
    ```bash
    npm install -g expo-cli
    expo install expo-sqlite
    ```
    
6. Inicia el servidor de desarrollo con:
    
    ```bash
    expo start
    ```
    
7. Abre el emulador de Android Studio.
8. En la terminal donde se ejecuta Expo, presiona 'A' para abrir la aplicación en el emulador de Android.

Si encuentras algún problema durante la instalación o ejecución, asegúrate de tener Node.js y Android Studio correctamente configurados en tu sistema. También puedes consultar la documentación oficial de Expo para solucionar problemas comunes.

## Descripción General

Esta aplicación de gestión de tareas proporciona una interfaz intuitiva para organizar y seguir el progreso de tus actividades diarias. Con un diseño limpio y funcional, te permite crear, editar y completar tareas de manera eficiente.

## Objetivo General:

Desarrollar una aplicación móvil para la gestión eficiente de calendarios y recordatorios,
integrando la funcionalidad de adjuntar imágenes mediante la cámara del dispositivo,
logrando así mejorar la experiencia de organización para el usuario.

## Objetivos específicos:

1. Implementar un sistema de calendario interactivo que permita a los usuarios agregar
eventos con recordatorios y alarmas personalizadas.
2. Añadir la opción de capturar fotos o imágenes desde la cámara del dispositivo móvil
y adjuntarlas a eventos específicos.
3. Ofrecer una interfaz de usuario intuitiva, accesible y atractiva que esté optimizada
tanto para dispositivos Android.
4. Desarrollar un sistema de notificaciones push que avise a los usuarios sobre eventos
o tareas pendientes con suficiente anticipación.
5. Integrar herramientas de almacenamiento y gestión de archivos para que las imágenes
adjuntas puedan ser visualizadas y gestionadas directamente desde la aplicación.

## Características Principales

- Vista general de tareas con estado y prioridad
- Creación y edición de tareas con campos detallados
- Filtrado de tareas por nombre y fecha
- Registro de tareas cumplidas y pendientes
- Interfaz responsive adaptable a diferentes dispositivos

## Pantallas

![image](https://github.com/user-attachments/assets/849484e8-9893-4aea-91c7-ea532c6ec5ef)

### 1. Barra Hamburguesa

Ofrece acceso a distintas opciones disponibles de la aplicación, como hazte premium, lo que permite al usuario tener recordatorios ilimitados y otras opciones que serán agregadas en versiones siguientes, tareas importantes que redirigirá a mostrar las tareas que sean marcadas con prioridad, preguntas frecuentes para consultar por dudas y problemas con respecto a la aplicación y por ultimo ajustes que ofrecerá modificaciones a la aplicación 

### 2. Vista Principal/Inicio

Muestra una lista de todas las tareas con opciones de filtrado y búsqueda. Cada tarea se presenta con un título, estado y prioridad visibles a simple vista.

### 3. Creación/Edición de Tarea

Formulario para añadir o modificar tareas, incluyendo campos para título, descripción, fecha y hora, además de agregar una imagen.

![image](https://github.com/user-attachments/assets/43c971b8-9894-4580-8fa8-773a57940ce9)

### 4. Tarea

Vista de todas las tareas que se tengan agregadas con la opción de expandirlas y ver una versión detallada de una tarea individual con todas sus propiedades y la opción de editar o eliminar.

### 5. Calendario

Mostrara un calendario dando cuenta del día en que se encuentra además de las tareas que se tengan para realizar ese día.

### 6. Perfil

Vista del perfil del usuario donde se muestra el tipo de servicio que tiene, si Premium o NoPremium, debajo de esto hará registro de las tareas que ha cumplido y las tareas que tiene pendiente

## Uso

1. Inicia la aplicación para ver la lista de tareas existentes.
2. Utiliza los filtros o la barra de búsqueda para encontrar tareas específicas.
3. Haz clic en "+" para crear una nueva tarea.
4. Selecciona una tarea para ver sus detalles o editarla.
5. Actualiza el estado de las tareas según progreses en ellas.

## Tecnologías Utilizadas

Esta aplicación ha sido desarrollada utilizando tecnologías modernas y eficientes para garantizar una experiencia de usuario óptima:

- React Native: Framework de JavaScript para la construcción de interfaces de usuario interactivas y dinámicas. React permite crear componentes reutilizables, lo que facilita el mantenimiento y la escalabilidad de la aplicación.
- Expo: Plataforma y conjunto de herramientas para el desarrollo rápido de aplicaciones React Native. Proporciona un entorno de desarrollo simplificado y facilita la creación, prueba y despliegue de aplicaciones móviles.
- SQLite: Sistema de gestión de bases de datos relacional ligero y de código abierto. Se utiliza para almacenar y gestionar datos localmente en la aplicación, permitiendo un acceso rápido y eficiente a la información.
- Android Studio: Entorno de desarrollo integrado (IDE) oficial para el desarrollo de aplicaciones Android. Aunque la aplicación se desarrolla principalmente con React Native, Android Studio se utiliza para compilar, depurar y emular la aplicación en dispositivos Android.
- Penpot: Herramienta de diseño de código abierto utilizada para crear el wireframe de la aplicación. Penpot permite una colaboración fluida entre diseñadores y desarrolladores, asegurando que el diseño final se ajuste a las necesidades del usuario y sea fácilmente implementable.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir los cambios propuestos antes de realizar un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
