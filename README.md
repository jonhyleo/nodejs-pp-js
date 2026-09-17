# FakeStore CLI - Gestión de Productos

Proyecto desarrollado en Node.js para consumir la API de FakeStore mediante comandos ejecutados desde la terminal. Permite consultar, agregar y eliminar productos interactuando con endpoints HTTP asíncronos (`GET`, `POST`, `DELETE`).

---

## 📋 Requisitos Previos

- **Node.js** v18.0.0 o superior (se utiliza la API nativa de `fetch` y `node:readline/promises`).
- **npm** incluido con la instalación de Node.js.

---

## 🚀 Configuración del Proyecto

Asegurate de contar con la siguiente estructura y archivos en el directorio raíz de tu proyecto:

### `package.json`

Verificá que el archivo contenga la propiedad `"type": "module"` y el script `"start"` configurado:

```json
{
	"name": "",
	"version": "",
	"description": "",
	"license": "",
	"author": "",
	"type": "module",
	"main": "index.js",
	"scripts": {
		"start": "node index.js"
	}
}
```

---

## 🧪 GUÍA DE PRUEBAS

Podés verificar el funcionamiento del programa utilizando dos modalidades distintas:

### Opción A: Ejecución directa por consola (`process.argv`)

Ejecutá los comandos directamente desde tu terminal pasando los parámetros necesarios:

1. **Consultar todos los productos (`GET products`):**

   ```bash
   npm run start GET products
   ```

2. **Consultar un producto específico (`GET products/<id>`):**

   ```bash
   npm run start GET products/15
   ```

3. **Crear un nuevo producto (`POST products <title> <price> <category>`):**

   ```bash
   npm run start POST products Remera-Coder 300 indumentaria
   ```

4. **Eliminar un producto (`DELETE products/<id>`):**
   ```bash
   npm run start DELETE products/7
   ```

---

### Opción B: Modo interactivo en consola (CLI Prompt)

Permite ingresar múltiples comandos de forma continua sin cerrar el proceso:

1. **Iniciá la aplicación sin enviar argumentos directos:**

   ```bash
   npm run start
   ```

2. **Escribí o pegá los comandos uno a uno dentro del prompt `FakeStore-CLI>`:**

   ```text
   GET products
   ```

   ```text
   GET products/15
   ```

   ```text
   POST products Remera-Coder 300 indumentaria
   ```

   ```text
   DELETE products/7
   ```

3. **Finalizá la sesión interactiva escribiendo:**
   ```text
   exit
   ```

---

## 🛠️ Formato de Salida

Las respuestas devueltas por FakeStore API se organizan en la terminal mediante `console.table()`, mostrando únicamente los campos `id`, `title`, `price` y `category` para ofrecer un resumen limpio y estructurado.
