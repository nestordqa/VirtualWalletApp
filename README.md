```markdown
# Aplicación de Billetera Virtual 📱💸

¡Bienvenido/a al repositorio de la aplicación de Billetera Virtual! Este proyecto te permite gestionar tus finanzas de forma sencilla y segura directamente desde tu dispositivo móvil.

## Tabla de Contenido 🗂️

1.  Descripción del Proyecto
2.  Requisitos Previos
3.  Instalación
4.  Ejecución de la Aplicación
5.  Configuración
6.  Contribuciones

## Descripción del Proyecto 💡

La aplicación de Billetera Virtual es una app móvil construida con React Native (Expo) que te permite:

*   Consultar tu saldo disponible. 💰
*   Realizar transferencias a otros usuarios. 📤
*   Visualizar un historial detallado de tus transacciones. 🧾

Está diseñada para ser escalable, de fácil mantenimiento y seguir las mejores prácticas de desarrollo.

## Requisitos Previos ✅

Antes de comenzar, asegúrate de tener instalado lo siguiente:

*   [Node.js](https://nodejs.org/es/) (versión >= 16)
*   [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
*   [Expo CLI](https://expo.dev/): `npm install -g expo-cli`
*   [Android Studio](https://developer.android.com/studio) (para desarrollo en Android) o [Xcode](https://developer.apple.com/xcode/) (para desarrollo en iOS)

## Instalación ⚙️

1.  **Clona el repositorio:**

    ```
    git clone https://github.com/nestordqa/VirtualWalletApp
    cd VirtualWalletApp
    ```

2.  **Instala las dependencias:**

    ```
    npm install
    ```

    o
    ```
    yarn install
    ```

## Ejecución de la Aplicación 🚀

1.  **Inicia el servidor de desarrollo de Expo:**

    ```
    npm run start
    ```

    o

    ```
    yarn start
    ```

2.  **Conéctate a un emulador/dispositivo Android o simulador/dispositivo iOS:**

    *   **Android:** Después de ejecutar `npm start`, Expo CLI mostrará un código QR. Escanea este código QR usando la aplicación Expo Go en tu dispositivo Android. Alternativamente, presiona la letra "`a`" en la terminal para abrir la aplicación en tu emulador Android.

    *   **iOS:** Puedes ejecutar la aplicación en el simulador de iOS o en un dispositivo iOS físico siguiendo las instrucciones proporcionadas por Expo CLI.
        *   Es posible que tengas que instalar `pod install` en la carpeta `iOS`.

```

## Configuración ⚙️

El archivo `src/config/constants.ts` contiene valores de configuración globales para la aplicación. Para conectar la aplicación a tu backend local, debes actualizar la constante `API_URL` con la IP de tu máquina:

1.  Abre el archivo `src/config/constants.ts`.
2.  Localiza la constante `API_URL`.
3.  Reemplaza `"http://tu_ip:3000"` con la dirección IP real de tu máquina donde se está ejecutando el backend y el puerto correcto.

    ```
    // src/config/constants.ts
    export const AP_URL = "http://tu_ip:3000"; // ¡Reemplaza con tu IP!
    ```

    **Nota:**
    *   Asegúrate de que tu backend esté en funcionamiento y sea accesible desde tu emulador/dispositivo.
    *   Si estás utilizando un emulador Android, es posible que debas usar `10.0.2.2` como la dirección IP para acceder a tu localhost.

## Contribuciones 🙌

¡Agradecemos cualquier contribución a la aplicación de Billetera Virtual! Para contribuir:

1.  Haz un fork del repositorio.
2.  Crea una nueva rama para tu funcionalidad o corrección de errores.
3.  Realiza tus cambios y escribe las pruebas apropiadas.
4.  Envía un pull request.