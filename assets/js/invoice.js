/**
 * ==========================================================================
 * INVOICE.JS - Cerebro Matemático y Manejo de Artículos de la Factura
 * ==========================================================================
 */

// Variables globales del estado actual de la factura (Persistencia en memoria RAM)
let invoiceItemsList = [];
let subtotalAmount = 0.0;
let discountAmount = 0.0;
let totalAmount = 0.0;

/**
 * Procesa la cadena de texto ingresada en el prompt de la terminal
 * Formato esperado: "cantidad, descripcion, precio_costo" (Separados por coma)
 */
function parseProductCommand(commandLine) {
    // 1. Separar el texto por comas para extraer los campos individuales
    const parts = commandLine.split(",");

    // Validación de seguridad básica: Si no vienen los 3 parámetros obligatorios, lanzar alerta
    if (parts.length < 3) {
        alert("Comando inválido. Formato correcto: CANTIDAD, DESCRIPCIÓN, COSTO");
        return;
    }

    // 2. Limpiar espacios en blanco y parsear tipos de datos numéricos
    const quantity = parseInt(parts[0].trim());
    const description = parts[1].trim();
    const costPrice = parseFloat(parts[2].trim());

    // Validar que los números ingresados sean válidos y mayores a cero
    if (isNaN(quantity) || isNaN(costPrice) || quantity <= 0 || costPrice <= 0) {
        alert("Error de sintaxis: La cantidad y el costo deben ser números mayores a cero.");
        return;
    }

    // 3. Aplicar la fórmula de negocio: PVP = Costo / (1 - %Ganancia)
    // Para el abasto, por defecto usaremos tu margen del 20% (0.20)
    const margin = 0.20;
    const unitPrice = costPrice / (1 - margin);
    const itemTotal = quantity * unitPrice;

    // 4. Guardar el producto en nuestro arreglo (Estado de la app)
    const newProduct = {
        quantity: quantity,
        description: description,
        unitPrice: unitPrice,
        total: itemTotal
    };
    invoiceItemsList.push(newProduct);

    // 5. Actualizar los cálculos generales e inyectar el cambio en la vista HTML
    calculateInvoiceTotals();
    renderInvoiceTable();
}

/**
 * Calcula el Subtotal, aplica el descuento por volumen si aplica, y genera el Total Neto
 */
function calculateInvoiceTotals() {
    // Sumar el total de cada fila registrada
    subtotalAmount = invoiceItemsList.reduce((acc, item) => acc + item.total, 0);

    // Lógica promocional: Si el subtotal pasa los $20, se descuenta el 10% directo
    if (subtotalAmount > 20.0) {
        discountAmount = subtotalAmount * 0.10;
    } else {
        discountAmount = 0.0;
    }

    // El total final es la resta directa del subtotal menos el incentivo de marketing
    totalAmount = subtotalAmount - discountAmount;
}

/**
 * Se encarga de regenerar las filas en el HTML para que el usuario vea la actualización
 */
function renderInvoiceTable() {
    const tbody = document.getElementById("invoice-items");
    if (!tbody) return;

    // Limpiar la tabla antes de reescribir para no duplicar filas viejas
    tbody.innerHTML = "";

    // Recorrer el arreglo de productos e inyectar el HTML fila por fila
    invoiceItemsList.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.quantity}</td>
            <td>${item.description}</td>
            <td>$${item.unitPrice.toFixed(2)}</td>
            <td>$${item.total.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });

    // Actualizar las etiquetas de texto de los bloques inferiores
    document.getElementById("txt-subtotal").textContent = `$${subtotalAmount.toFixed(2)}`;
    document.getElementById("txt-discount").textContent = `-$${discountAmount.toFixed(2)}`;
    document.getElementById("txt-total").textContent = `$${totalAmount.toFixed(2)}`;
}

/**
 * Reinicia las variables a cero cuando se ejecuta el comando 'clear'
 */
function resetInvoiceTotals() {
    invoiceItemsList = [];
    subtotalAmount = 0.0;
    discountAmount = 0.0;
    totalAmount = 0.0;
    
    // Actualizar la interfaz limpia
    document.getElementById("txt-subtotal").textContent = "$0.00";
    document.getElementById("txt-discount").textContent = "-$0.00";
    document.getElementById("txt-total").textContent = "$0.00";
}/**
 * ==========================================================================
 * INVOICE.JS - Cerebro Matemático y Manejo de Artículos de la Factura
 * ==========================================================================
 */

/* Variables globales del estado actual de la factura (Persistencia en memoria RAM)
let invoiceItemsList = [];
let subtotalAmount = 0.0;
let discountAmount = 0.0;
let totalAmount = 0.0;*/

/**
 * Procesa la cadena de texto ingresada en el prompt de la terminal
 * Formato esperado: "cantidad, descripcion, precio_costo" (Separados por coma)
 */
function parseProductCommand(commandLine) {
    // 1. Separar el texto por comas para extraer los campos individuales
    const parts = commandLine.split(",");

    // Validación de seguridad básica: Si no vienen los 3 parámetros obligatorios, lanzar alerta
    if (parts.length < 3) {
        alert("Comando inválido. Formato correcto: CANTIDAD, DESCRIPCIÓN, COSTO");
        return;
    }

    // 2. Limpiar espacios en blanco y parsear tipos de datos numéricos
    const quantity = parseInt(parts[0].trim());
    const description = parts[1].trim();
    const costPrice = parseFloat(parts[2].trim());

    // Validar que los números ingresados sean válidos y mayores a cero
    if (isNaN(quantity) || isNaN(costPrice) || quantity <= 0 || costPrice <= 0) {
        alert("Error de sintaxis: La cantidad y el costo deben ser números mayores a cero.");
        return;
    }

    // 3. Aplicar la fórmula de negocio: PVP = Costo / (1 - %Ganancia)
    // Para el abasto, por defecto usaremos tu margen del 20% (0.20)
    const margin = 0.20;
    const unitPrice = costPrice / (1 - margin);
    const itemTotal = quantity * unitPrice;

    // 4. Guardar el producto en nuestro arreglo (Estado de la app)
    const newProduct = {
        quantity: quantity,
        description: description,
        unitPrice: unitPrice,
        total: itemTotal
    };
    invoiceItemsList.push(newProduct);

    // 5. Actualizar los cálculos generales e inyectar el cambio en la vista HTML
    calculateInvoiceTotals();
    renderInvoiceTable();
}

/**
 * Calcula el Subtotal, aplica el descuento por volumen si aplica, y genera el Total Neto
 */
function calculateInvoiceTotals() {
    // Sumar el total de cada fila registrada
    subtotalAmount = invoiceItemsList.reduce((acc, item) => acc + item.total, 0);

    // Lógica promocional: Si el subtotal pasa los $20, se descuenta el 10% directo
    if (subtotalAmount > 20.0) {
        discountAmount = subtotalAmount * 0.10;
    } else {
        discountAmount = 0.0;
    }

    // El total final es la resta directa del subtotal menos el incentivo de marketing
    totalAmount = subtotalAmount - discountAmount;
}

/**
 * Se encarga de regenerar las filas en el HTML para que el usuario vea la actualización
 */
function renderInvoiceTable() {
    const tbody = document.getElementById("invoice-items");
    if (!tbody) return;

    // Limpiar la tabla antes de reescribir para no duplicar filas viejas
    tbody.innerHTML = "";

    // Recorrer el arreglo de productos e inyectar el HTML fila por fila
    invoiceItemsList.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.quantity}</td>
            <td>${item.description}</td>
            <td>$${item.unitPrice.toFixed(2)}</td>
            <td>$${item.total.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });

    // Actualizar las etiquetas de texto de los bloques inferiores
    document.getElementById("txt-subtotal").textContent = `$${subtotalAmount.toFixed(2)}`;
    document.getElementById("txt-discount").textContent = `-$${discountAmount.toFixed(2)}`;
    document.getElementById("txt-total").textContent = `$${totalAmount.toFixed(2)}`;
}

/**
 * Reinicia las variables a cero cuando se ejecuta el comando 'clear'
 */
function resetInvoiceTotals() {
    invoiceItemsList = [];
    subtotalAmount = 0.0;
    discountAmount = 0.0;
    totalAmount = 0.0;
    
    // Actualizar la interfaz limpia
    document.getElementById("txt-subtotal").textContent = "$0.00";
    document.getElementById("txt-discount").textContent = "-$0.00";
    document.getElementById("txt-total").textContent = "$0.00";
}