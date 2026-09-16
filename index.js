const BASE_URL = "https://fakestoreapi.com";

const [, , cliMethod, cliResource, ...cliExtraArgs] = process.argv;

async function executeCommand(method, resource, extraArgs) {
	if (!method || !resource) {
		console.log("⚠️ Error: Comando incompleto. Formato: <METHOD> <resource> [args]");
		return;
	}

	try {
		const uppercaseMethod = method.toUpperCase();

		// 1. GET Obtener productos u obtener productos por ID (products/:id)
		if (uppercaseMethod === "GET" && resource.startsWith("products")) {
			const response = await fetch(`${BASE_URL}/${resource}`);
			const data = await response.json();
			console.log("\n📦 Respuesta:", data);
		}

		// 2. POST Crear un nuevo producto (products <title> <price> <category>)
		else if (uppercaseMethod === "POST" && resource === "products") {
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
			console.log("\n✅ Producto Creado correctamente:", data);
		}

		// 3. DELETE Borrar producto por ID (products/:id)
		else if (uppercaseMethod === "DELETE" && resource.startsWith("products/")) {
			const response = await fetch(`${BASE_URL}/${resource}`, {
				method: "DELETE",
			});
			const data = await response.json();
			console.log("\n🗑️ Producto Eliminado correctamente:", data);
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
	} else {
		console.log("Por favor ingresa un comando válido.");
	}
}

main();
