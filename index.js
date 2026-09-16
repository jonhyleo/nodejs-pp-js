import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const BASE_URL = "https://fakestoreapi.com";

const [, , cliMethod, cliResource, ...cliExtraArgs] = process.argv;

function printTable(data) {
	const columns = ["id", "title", "price", "category"];

	if (Array.isArray(data)) {
		console.table(data, columns);
	} else if (typeof data === "object" && data !== null) {
		console.table([data], columns);
	} else {
		console.log(data);
	}
}

async function executeCommand(method, resource, extraArgs) {
	if (!method || !resource) {
		console.log("⚠️ Error: Comando incompleto. Formato: <METHOD> <resource> [args]");
		return;
	}

	try {
		const uppercaseMethod = method.toUpperCase();

		if (uppercaseMethod === "GET" && resource.startsWith("products")) {
			const response = await fetch(`${BASE_URL}/${resource}`);
			const data = await response.json();
			console.log("\n📦 Respuesta:");
			printTable(data);
		} else if (uppercaseMethod === "POST" && resource === "products") {
			const [title, price, category] = extraArgs;

			if (!title || !price || !category) {
				console.log("⚠️ Error: Para POST ingresá: POST products <title> <price> <category>");
				return;
			}

			const newProduct = {
				title,
				price: Number(price),
				category,
				description: "Producto creado desde la consola",
				image: "https://placehold.co/600x600",
			};

			const response = await fetch(`${BASE_URL}/products`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newProduct),
			});
			const data = await response.json();
			console.log("\n✅ Producto Creado correctamente:");
			printTable(data);
		} else if (uppercaseMethod === "DELETE" && resource.startsWith("products/")) {
			const response = await fetch(`${BASE_URL}/${resource}`, {
				method: "DELETE",
			});
			const data = await response.json();
			console.log("\n🗑️ Producto Eliminado correctamente:");
			printTable(data);
		} else {
			console.log("❌ Comando no reconocido o formato incorrecto.");
		}
	} catch (error) {
		console.error("❌ Error en la petición:", error.message);
	}
}

async function main() {
	if (cliMethod && cliResource) {
		await executeCommand(cliMethod, cliResource, cliExtraArgs);
		return;
	}

	// Inicialización de la interfaz interactiva
	const rl = readline.createInterface({ input, output });

	console.log("==================================================");
	console.log("🚀 Modo Interactivo Listo (process.argv está vacío)");
	console.log('Escribí tu comando (ej: GET products/15) o "exit" para salir.');
	console.log("==================================================\n");

	const inputCommand = await rl.question("FakeStore-CLI> ");
	const [method, resource, ...extraArgs] = inputCommand.trim().split(" ");
	await executeCommand(method, resource, extraArgs);
	rl.close();
}

main();
