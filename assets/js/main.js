/**
 * ==========================================================================
 * MAIN.JS - Inicializador de la Terminal y Gestor de Eventos del DOM
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicializar la fecha actual en la terminal de forma automática
    setTerminalDate();
    alert("Dio enter");
    // 2. Capturar los elementos clave de la interfaz (DOM)
    const invoiceForm = document.getElementById("invoice-form");
    const productCmdInput = document.getElementById("product-cmd");
    const clientNameInput = document.getElementById("client-name");

    // 3. Enfocar el cursor automáticamente en el campo de cliente al abrir la app
    clientNameInput.focus();

    // 4. Escuchar el envío del formulario (cuando el usuario presiona Enter en los inputs)
    invoiceForm.addEventListener("submit", (event) => {
        
        event.preventDefault(); // Evita que la página se recargue (comportamiento por defecto de HTML5)
        
        // Obtener el comando escrito por el usuario
        const commandText = productCmdInput.value.trim();
        
        // Si el usuario presionó Enter pero el comando está vacío, no hacemos nada
        if (commandText === "") return;

        // Validar si es un comando del sistema (por ejemplo, limpiar pantalla o procesar)
        if (commandText.toLowerCase() === "clear") {
            clearInvoiceTable();
            productCmdInput.value = "";
            return;
        }

        // Si no es un comando del sistema, asumimos que es un producto y se lo enviamos al controlador
        if (typeof parseProductCommand === "function") {
            parseProductCommand(commandText);
        } else {
            console.error("Error crítico: El módulo 'invoice.js' no está cargado todavía.");
        }

        // Limpiar la línea de comandos para el siguiente artículo
        productCmdInput.value = "";
    });
});

/**
 * Función para capturar la fecha real del sistema y mostrarla con formato limpio
 */
function setTerminalDate() {
    const dateElement = document.getElementById("current-date");
    if (!dateElement) return;

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses en JS van de 0 a 11
    const year = now.getFullYear();

    dateElement.textContent = `${day}/${month}/${year}`;
}

/**
 * Comando ficticio de terminal para reiniciar la tabla limpia
 */
function clearInvoiceTable() {
    const itemsContainer = document.getElementById("invoice-items");
    if (itemsContainer) itemsContainer.innerHTML = "";
    
    // Si la lógica de invoice existe, reiniciamos los acumuladores numéricos
    if (typeof resetInvoiceTotals === "function") {
        resetInvoiceTotals();
    }
}