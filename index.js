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
