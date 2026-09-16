const BASE_URL = "https://fakestoreapi.com";

// Capturamos los argumentos que vienen directo de process.argv
const [, , cliMethod, cliResource, ...cliExtraArgs] = process.argv;

async function executeCommand(method, resource, extraArgs) {
	if (!method || !resource) {
		console.log("⚠️ Error: Comando incompleto. Formato: <METHOD> <resource> [args]");
		return;
	}

	console.log(`Comando recibido: ${method} ${resource}`, extraArgs);
}

async function main() {
	if (cliMethod && cliResource) {
		await executeCommand(cliMethod, cliResource, cliExtraArgs);
	} else {
		console.log("Por favor ingresa un comando válido.");
	}
}

main();
