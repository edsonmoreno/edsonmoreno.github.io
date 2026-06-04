/**
 * ==========================================================================
 * INVOICE.JS - Cerebro Lógico con Selector de Coincidencias Múltiples
 * ==========================================================================
 */

// 1. BASE DE DATOS REAL (Sincronizada con el mostrador de Abasto Moreno)
const INVENTARIO_PRODUCTOS = [
    // --- MAYONESAS ---
    { id: "mayonesa-mavesa-980", nombre: "Mavesa mayonesa 980g", costo: 7.34, margen: 20.00 },
    { id: "mayonesa-mavesa-445", nombre: "Mavesa mayonesa 445g", costo: 3.87, margen: 20.00 },
    { id: "mayonesa-mavesa-175", nombre: "Mavesa mayonesa 175g", costo: 1.94, margen: 20.00 },

    // --- KETCHUP Y VINAGRE ---
    { id: "ketchup-pampero-387", nombre: "Pampero ketchup 387g", costo: 2.83, margen: 20.00 },
    { id: "ketchup-pampero-189", nombre: "Pampero ketchup 189g", costo: 1.35, margen: 20.00 },
    { id: "vinagre-mavesa-500", nombre: "Mavesa vinagre 500mL", costo: 1.24, margen: 20.00 },

    // --- MARGARINAS Y QUESO ---
    { id: "margarina-mavesa-500", nombre: "Mavesa margarina 500g", costo: 2.69, margen: 15.00 },
    { id: "margarina-mavesa-250", nombre: "Mavesa margarina 250g", costo: 1.50, margen: 15.00 },
    { id: "rikesa-cheddar", nombre: "Rikesa cheddar", costo: 3.47, margen: 20.00 },

    // --- HARINAS, ARROZ Y AVENA ---
    { id: "harina-pan-gf", nombre: "Harina PAN gluten free", costo: 1.37, margen: 5.00 }, // Margen estricto del 5%
    { id: "arroz-primor-sup", nombre: "Arroz primor superior", costo: 1.74, margen: 15.00 },
    { id: "avena-quaker-400", nombre: "Avena Quaker 400g", costo: 1.50, margen: 15.00 },
    { id: "avena-quaker-200", nombre: "Avena Quaker 200g", costo: 0.80, margen: 15.00 },

    // --- ENLATADOS ---
    { id: "atun-margarita-175", nombre: "Atún Margarita 175g", costo: 2.49, margen: 17.00 }, // Costo 2.49
    { id: "sardina-margarita", nombre: "Sardina margarita", costo: 1.12, margen: 20.00 },

    // --- CAFÉ ---
    { id: "cafe-bien-500", nombre: "Bien café premium 500g", costo: 6.11, margen: 20.00 },
    { id: "cafe-bien-200", nombre: "Bien café 200g", costo: 2.46, margen: 18.00 },
    { id: "cafe-buen-100", nombre: "Buen café 100g", costo: 1.25, margen: 20.00 },

    // --- PASTAS ---
    { id: "pasta-corta-primor-500", nombre: "Pasta corta primor 500g", costo: 0.92, margen: 15.00 },
    { id: "pasta-corta-primor-1k", nombre: "Pasta corta primor 1Kg", costo: 1.83, margen: 15.00 },
    { id: "pasta-larga-vermiceli-1k", nombre: "Pasta larga (veremiceli) 1Kg", costo: 1.66, margen: 15.00 },

    // --- LIMPIEZA / JABONES ---
    { id: "las-llaves-limon-400", nombre: "Las llaves detergente polvo limón 400g", costo: 1.09, margen: 20.00 },
    { id: "las-llaves-bebe-900", nombre: "Las llaves detergente polvo 900g bebé", costo: 3.04, margen: 20.00 },
    { id: "las-llaves-floral-900", nombre: "Las llaves detergente polvo L. Activa floral 900g", costo: 2.33, margen: 20.00 },
    { id: "las-llaves-jabon-200", nombre: "Las llaves jabón en barra 200g", costo: 0.87, margen: 20.00 },

    // --- BEBIDAS Y REFRESCOS PET ---
    { id: "golden-manzanita-pet-2l", nombre: "Golden Manzanita PET 2L", costo: 1.42, margen: 25.00 },
    { id: "pepsi-pet-2l", nombre: "Pepsi Cola PET 2L", costo: 1.42, margen: 25.00 },
    { id: "pepsi-pet-1l", nombre: "Pepsi Cola PET 1L", costo: 0.83, margen: 25.00 },
    { id: "cocacola-pet-1l", nombre: "Coca-Cola PET 1L", costo: 0.83, margen: 25.00 },
    { id: "cocacola-pet-2l", nombre: "Coca-Cola PET 2L", costo: 1.42, margen: 25.00 },
    { id: "chinotto-pet-1.5l", nombre: "Chinotto S/Cal PET 1.5L", costo: 7.02, margen: 20.00 },
    { id: "powerade-pet-500", nombre: "PowerRade PET 500mL", costo: 1.17, margen: 20.00 },
    { id: "maltin-polar-pet-1.5l", nombre: "Maltin Polar PET 1.5L", costo: 1.64, margen: 25.00 },
    { id: "delvalle-frut-1.5l", nombre: "Del valle Frut. Cit. PET 1.5L", costo: 1.12, margen: 25.00 },
    { id: "delvalle-frut-500", nombre: "Del valle Frut. Cit. 500 mL PET 0.5L", costo: 0.64, margen: 25.00 },

    // --- REFRESCOS RETORNABLES (RET) ---
    { id: "pepsi-ret-1.25l", nombre: "Pepsi Cola RET 1.25L", costo: 0.67, margen: 25.00 },
    { id: "7up-ret-1.25l", nombre: "7Up RET 1.25L", costo: 0.67, margen: 25.00 },
    { id: "golden-kolita-ret-1.25l", nombre: "Golden Kolita RET 1.25L", costo: 0.67, margen: 25.00 },
    { id: "golden-manzanita-ret-1.25l", nombre: "Golden Manzanita RET 1.25L", costo: 0.67, margen: 25.00 },
    { id: "cocacola-ret-1.25l", nombre: "Coca-Cola Original RET 1.25L", costo: 0.67, margen: 25.00 }
];

// Acumuladores y estados del sistema
let invoiceSubtotal = 0.0;

// Variables de estado para el modo interactivo de selección
let enModoSeleccion = false;
let coincidenciasEncontradas = [];
let cantidadPendiente = 1;

/**
 * Procesa el comando rápido de la terminal
 */
function parseProductCommand(commandLine) {
    const promptInput = document.getElementById("product-cmd");

    // --- FLUJO B: SI EL SISTEMA ESTÁ ESPERANDO QUE ELIJAS UN NÚMERO ---
    if (enModoSeleccion) {
        const opcion = parseInt(commandLine.trim());
        
        // Validar que el usuario metió un número válido de la lista
        if (isNaN(opcion) || opcion < 1 || opcion > coincidenciasEncontradas.length) {
            alert(`Opción inválida. Elige un número del 1 al ${coincidenciasEncontradas.length} o escribe 'clear' para cancelar.`);
            return;
        }

        // Procesar el producto seleccionado
        const productoElegido = coincidenciasEncontradas[opcion - 1];
        agregarProductoAFactura(productoElegido, cantidadPendiente);

        // Salir del modo selección y restaurar el prompt
        quitarMenuSeleccionHTML();
        enModoSeleccion = false;
        coincidenciasEncontradas = [];
        cantidadPendiente = 1;
        
        // Cambiar el texto del prompt al original
        document.querySelector(".prompt-line label").textContent = "abasto@prompt:~$ ";
        if (promptInput) promptInput.placeholder = "cant, producto, precio";
        return;
    }

    // --- FLUJO A: FACTURACIÓN NORMAL ---
    const parts = commandLine.split(",");
    let quantity = 1;
    let productSearch = "";

    if (parts.length >= 2) {
        quantity = parseInt(parts[0].trim()) || 1;
        productSearch = parts[1].trim().toLowerCase();
    } else {
        productSearch = parts[0].trim().toLowerCase();
    }

    // BUSCADOR MULTIPLE: Filtra todos los productos que contengan el texto buscado en su ID o Nombre
    coincidenciasEncontradas = INVENTARIO_PRODUCTOS.filter(p => 
        p.id.includes(productSearch) || p.nombre.toLowerCase().includes(productSearch)
    );

    // CASO 1: No se encontró nada
    if (coincidenciasEncontradas.length === 0) {
        alert(`Error: El producto '${productSearch}' no se encuentra en el inventario.`);
        return;
    }

    // CASO 2: Coincidencia exacta única
    if (coincidenciasEncontradas.length === 1) {
        agregarProductoAFactura(coincidenciasEncontradas[0], quantity);
        return;
    }

    // CASO 3: Múltiples opciones (El inconveniente) -> Activamos Modo Selección
    enModoSeleccion = true;
    cantidadPendiente = quantity;
    
    // Cambiar visualmente el prompt para advertir al usuario
    document.querySelector(".prompt-line label").textContent = "seleccionar@id:~$ ";
    if (promptInput) promptInput.placeholder = `Ingresa un número (1-${coincidenciasEncontradas.length})`;

    // Renderizar las opciones estilo consola en la tabla
    mostrarMenuSeleccionHTML(coincidenciasEncontradas);
}

/**
 * Realiza la matemática financiera e inserta la línea real en la factura
 */
function agregarProductoAFactura(producto, cantidad) {
    const margenDecimal = producto.margen / 100;
    const unitPrice = producto.costo / (1 - margenDecimal);
    const unitPriceRounded = Math.round(unitPrice * 100) / 100;
    const totalPrice = cantidad * unitPriceRounded;

    invoiceSubtotal += totalPrice;
    renderNewRow(cantidad, producto.nombre, unitPriceRounded, totalPrice);
    updateInvoiceTotals();
}

/**
 * Muestra las opciones disponibles directamente dentro del cuerpo de la tabla
 */
function mostrarMenuSeleccionHTML(lista) {
    const tbody = document.getElementById("invoice-items");
    if (!tbody) return;

    // Crear una fila especial de advertencia
    const avisoRow = document.createElement("tr");
    avisoRow.className = "selection-system-row";
    avisoRow.innerHTML = `
        <td colspan="4" style="color: #ffbd2e; padding: 5px 0;">
            [!] Múltiples artículos encontrados. Elige una opción:
        </td>
    `;
    tbody.appendChild(avisoRow);

    // Listar las opciones en formato de terminal
    lista.forEach((prod, index) => {
        const row = document.createElement("tr");
        row.className = "selection-option-row";
        row.style.color = "#aaa";
        row.innerHTML = `
            <td style="text-align: center; color: #10b981;">[${index + 1}]</td>
            <td colspan="2">${prod.nombre}</td>
            <td style="text-align: right;">Cost: $${prod.costo.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Limpia las filas de opciones una vez tomada la decisión
 */
function quitarMenuSeleccionHTML() {
    document.querySelectorAll(".selection-system-row").forEach(el => el.remove());
    document.querySelectorAll(".selection-option-row").forEach(el => el.remove());
}

/**
 * Renderiza la fila definitiva de la compra
 */
function renderNewRow(cant, desc, pu, total) {
    const tbody = document.getElementById("invoice-items");
    if (!tbody) return;

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${cant}</td>
        <td>${desc}</td>
        <td>${pu.toFixed(2)}</td>
        <td>${total.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
}

/**
 * Actualiza los totales en pantalla
 */
function updateInvoiceTotals() {
    const txtSubtotal = document.getElementById("txt-subtotal");
    const txtDiscount = document.getElementById("txt-discount");
    const txtTotal = document.getElementById("txt-total");

    let discount = 0.0;
    if (invoiceSubtotal > 20.0) {
        discount = invoiceSubtotal * 0.10;
    }

    const grandTotal = invoiceSubtotal - discount;

    if (txtSubtotal) txtSubtotal.textContent = `$${invoiceSubtotal.toFixed(2)}`;
    if (txtDiscount) txtDiscount.textContent = `-$${discount.toFixed(2)}`;
    if (txtTotal) txtTotal.textContent = `$${grandTotal.toFixed(2)}`;
}

/**
 * Cancela procesos y limpia la pantalla (Comando 'clear')
 */
function resetInvoiceTotals() {
    invoiceSubtotal = 0.0;
    enModoSeleccion = false;
    coincidenciasEncontradas = [];
    cantidadPendiente = 1;
    document.querySelector(".prompt-line label").textContent = "abasto@prompt:~$ ";
    const promptInput = document.getElementById("product-cmd");
    if (promptInput) promptInput.placeholder = "cant, producto, precio";
    updateInvoiceTotals();
}