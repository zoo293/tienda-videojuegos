//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("tu pedido a sido procesado exitosamente !GRACIAS POR TU COMPRA!");
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}
//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";
}
// ================== PROTECCIÓN: si no hay sesión, vuelve al login ==================
if (!localStorage.getItem('gv_sesion')) { window.top.location.href = 'login.html'; }
var sesion = JSON.parse(localStorage.getItem('gv_sesion') || '{}');

var IGV = 0.18; // 18% (los precios ya incluyen IGV)

// ================== UTILIDADES ==================
function precioNumero(texto){ return parseFloat(String(texto).replace(/[^0-9.]/g, '')) || 0; }
function dinero(n){ return '$ ' + n.toFixed(2); }
function limpiar(t){ return String(t).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

// ================== INICIO ==================
if (document.readyState == 'loading') { document.addEventListener('DOMContentLoaded', ready); } else { ready(); }

function ready(){
    // Solo los botones "Agregar al Carrito" (los de "Mas informacion" ya no agregan nada)
    var botones = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botones.length; i++){
        if (botones[i].textContent.trim().indexOf('Agregar') === 0){
            botones[i].addEventListener('click', agregarAlCarritoClicked);
        }
    }
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
    document.getElementById('btn-imprimir').addEventListener('click', function(){ window.print(); });
    document.getElementById('btn-cerrar-boleta').addEventListener('click', function(){
        document.getElementById('boleta-overlay').style.display = 'none';
    });
}

// ================== CARRITO ==================
function agregarAlCarritoClicked(event){
    var item = event.currentTarget.closest('.item');
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

function hacerVisibleCarrito(){
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';
    document.getElementsByClassName('contenedor-items')[0].style.width = '60%';
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    var nombres = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombres.length; i++){
        if (nombres[i].innerText == titulo){ alert("El item ya se encuentra en el carrito"); return; }
    }
    var item = document.createElement('div');
    item.innerHTML = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${limpiar(titulo)}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${limpiar(precio)}</span>
            </div>
            <button class="btn-eliminar"><i class="fa-solid fa-trash"></i></button>
        </div>`;
    itemsCarrito.append(item);
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
    item.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);
    item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);
    actualizarTotalCarrito();
}

function sumarCantidad(event){
    var input = event.target.parentElement.getElementsByClassName('carrito-item-cantidad')[0];
    input.value = parseInt(input.value) + 1;
    actualizarTotalCarrito();
}
function restarCantidad(event){
    var input = event.target.parentElement.getElementsByClassName('carrito-item-cantidad')[0];
    if (parseInt(input.value) > 1){ input.value = parseInt(input.value) - 1; actualizarTotalCarrito(); }
}
function eliminarItemCarrito(event){
    event.target.closest('.carrito-item').parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}
function ocultarCarrito(){
    if (document.getElementsByClassName('carrito-items')[0].childElementCount == 0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        document.getElementsByClassName('contenedor-items')[0].style.width = '100%';
    }
}
function actualizarTotalCarrito(){
    var filas = document.getElementsByClassName('carrito')[0].getElementsByClassName('carrito-item');
    var total = 0;
    for (var i = 0; i < filas.length; i++){
        total += precioNumero(filas[i].getElementsByClassName('carrito-item-precio')[0].innerText)
               * parseInt(filas[i].getElementsByClassName('carrito-item-cantidad')[0].value);
    }
    document.getElementsByClassName('carrito-precio-total')[0].innerText = dinero(total);
}

// ================== PAGAR + BOLETA ==================
function pagarClicked(){
    var filas = document.getElementsByClassName('carrito-item');
    if (filas.length == 0){ alert("Tu carrito está vacío"); return; }

    var productos = [], total = 0;
    for (var i = 0; i < filas.length; i++){
        var nombre = filas[i].getElementsByClassName('carrito-item-titulo')[0].innerText;
        var cant = parseInt(filas[i].getElementsByClassName('carrito-item-cantidad')[0].value);
        var pu = precioNumero(filas[i].getElementsByClassName('carrito-item-precio')[0].innerText);
        productos.push({nombre: nombre, cant: cant, pu: pu, importe: pu * cant});
        total += pu * cant;
    }

    // Número correlativo de boleta (se guarda en el navegador)
    var n = (parseInt(localStorage.getItem('gv_boleta_n')) || 0) + 1;
    localStorage.setItem('gv_boleta_n', n);

    mostrarBoleta({
        numero: 'B001-' + String(n).padStart(6, '0'),
        fecha: new Date().toLocaleString('es-PE'),
        cliente: sesion.nombre || 'Cliente',
        productos: productos,
        total: total
    });

    // Vaciar el carrito
    var cont = document.getElementsByClassName('carrito-items')[0];
    while (cont.hasChildNodes()) cont.removeChild(cont.firstChild);
    actualizarTotalCarrito();
    ocultarCarrito();
}

function mostrarBoleta(d){
    var base = d.total / (1 + IGV);
    var filas = d.productos.map(function(p){
        return '<tr><td>' + limpiar(p.nombre) + '</td><td class="der">' + p.cant + '</td><td class="der">' + p.importe.toFixed(2) + '</td></tr>';
    }).join('');
    document.getElementById('boleta-contenido').innerHTML = `
        <div class="boleta-papel">
            <h2>GAMEVERSE</h2>
            <p class="centro">Tienda de videojuegos</p>
            <p class="tipo">BOLETA DE VENTA ELECTRÓNICA</p>
            <p class="centro">N° ${d.numero}</p>
            <hr>
            <p>Fecha: ${d.fecha}</p>
            <p>Cliente: ${limpiar(d.cliente)}</p>
            <hr>
            <table>
                <tr><th>Producto</th><th class="der">Cant.</th><th class="der">Importe</th></tr>
                ${filas}
            </table>
            <hr>
            <table>
                <tr><td>Op. gravada</td><td class="der">${dinero(base)}</td></tr>
                <tr><td>IGV (18%)</td><td class="der">${dinero(d.total - base)}</td></tr>
                <tr class="total"><td>TOTAL</td><td class="der">${dinero(d.total)}</td></tr>
            </table>
            <hr>
            <div class="codigo"></div>
            <p class="centro">¡Gracias por tu compra!</p>
            <p class="centro">Que disfrutes tus juegos</p>
        </div>`;
    document.getElementById('boleta-overlay').style.display = 'flex';
}




// ================== PROTECCIÓN: si no hay sesión, vuelve al login ==================
if (!localStorage.getItem('gv_sesion')) { window.top.location.href = 'index.html'; }
var sesion = JSON.parse(localStorage.getItem('gv_sesion') || '{}');

var IGV = 0.18; // 18% (los precios ya incluyen IGV)

// ================== UTILIDADES ==================
function precioNumero(texto){ return parseFloat(String(texto).replace(/[^0-9.]/g, '')) || 0; }
function dinero(n){ return '$ ' + n.toFixed(2); }
function limpiar(t){ return String(t).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

// ================== INICIO ==================
if (document.readyState == 'loading') { document.addEventListener('DOMContentLoaded', ready); } else { ready(); }

function ready(){
    // Solo los botones "Agregar al Carrito" (los de "Mas informacion" ya no agregan nada)
    var botones = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botones.length; i++){
        if (botones[i].textContent.trim().indexOf('Agregar') === 0){
            botones[i].addEventListener('click', agregarAlCarritoClicked);
        }
    }
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
    document.getElementById('btn-imprimir').addEventListener('click', function(){ window.print(); });
    document.getElementById('btn-cerrar-boleta').addEventListener('click', function(){
        document.getElementById('boleta-overlay').style.display = 'none';
    });
}

// ================== CARRITO ==================
function agregarAlCarritoClicked(event){
    var item = event.currentTarget.closest('.item');
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

function hacerVisibleCarrito(){
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';
    document.getElementsByClassName('contenedor-items')[0].style.width = '60%';
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    var nombres = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombres.length; i++){
        if (nombres[i].innerText == titulo){ alert("El item ya se encuentra en el carrito"); return; }
    }
    var item = document.createElement('div');
    item.innerHTML = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${limpiar(titulo)}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${limpiar(precio)}</span>
            </div>
            <button class="btn-eliminar"><i class="fa-solid fa-trash"></i></button>
        </div>`;
    itemsCarrito.append(item);
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
    item.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);
    item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);
    actualizarTotalCarrito();
}

function sumarCantidad(event){
    var input = event.target.parentElement.getElementsByClassName('carrito-item-cantidad')[0];
    input.value = parseInt(input.value) + 1;
    actualizarTotalCarrito();
}
function restarCantidad(event){
    var input = event.target.parentElement.getElementsByClassName('carrito-item-cantidad')[0];
    if (parseInt(input.value) > 1){ input.value = parseInt(input.value) - 1; actualizarTotalCarrito(); }
}
function eliminarItemCarrito(event){
    event.target.closest('.carrito-item').parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}
function ocultarCarrito(){
    if (document.getElementsByClassName('carrito-items')[0].childElementCount == 0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        document.getElementsByClassName('contenedor-items')[0].style.width = '100%';
    }
}
function actualizarTotalCarrito(){
    var filas = document.getElementsByClassName('carrito')[0].getElementsByClassName('carrito-item');
    var total = 0;
    for (var i = 0; i < filas.length; i++){
        total += precioNumero(filas[i].getElementsByClassName('carrito-item-precio')[0].innerText)
               * parseInt(filas[i].getElementsByClassName('carrito-item-cantidad')[0].value);
    }
    document.getElementsByClassName('carrito-precio-total')[0].innerText = dinero(total);
}

// ================== PAGAR + BOLETA ==================
function pagarClicked(){
    var filas = document.getElementsByClassName('carrito-item');
    if (filas.length == 0){ alert("Tu carrito está vacío"); return; }

    var productos = [], total = 0;
    for (var i = 0; i < filas.length; i++){
        var nombre = filas[i].getElementsByClassName('carrito-item-titulo')[0].innerText;
        var cant = parseInt(filas[i].getElementsByClassName('carrito-item-cantidad')[0].value);
        var pu = precioNumero(filas[i].getElementsByClassName('carrito-item-precio')[0].innerText);
        productos.push({nombre: nombre, cant: cant, pu: pu, importe: pu * cant});
        total += pu * cant;
    }

    // Número correlativo de boleta (se guarda en el navegador)
    var n = (parseInt(localStorage.getItem('gv_boleta_n')) || 0) + 1;
    localStorage.setItem('gv_boleta_n', n);

    mostrarBoleta({
        numero: 'B001-' + String(n).padStart(6, '0'),
        fecha: new Date().toLocaleString('es-PE'),
        cliente: sesion.nombre || 'Cliente',
        productos: productos,
        total: total
    });

    // Vaciar el carrito
    var cont = document.getElementsByClassName('carrito-items')[0];
    while (cont.hasChildNodes()) cont.removeChild(cont.firstChild);
    actualizarTotalCarrito();
    ocultarCarrito();
}

function mostrarBoleta(d){
    var base = d.total / (1 + IGV);
    var filas = d.productos.map(function(p){
        return '<tr><td>' + limpiar(p.nombre) + '</td><td class="der">' + p.cant + '</td><td class="der">' + p.importe.toFixed(2) + '</td></tr>';
    }).join('');
    document.getElementById('boleta-contenido').innerHTML = `
        <div class="boleta-papel">
            <h2>GAMEVERSE</h2>
            <p class="centro">Tienda de videojuegos</p>
            <p class="tipo">BOLETA DE VENTA ELECTRÓNICA</p>
            <p class="centro">N° ${d.numero}</p>
            <hr>
            <p>Fecha: ${d.fecha}</p>
            <p>Cliente: ${limpiar(d.cliente)}</p>
            <hr>
            <table>
                <tr><th>Producto</th><th class="der">Cant.</th><th class="der">Importe</th></tr>
                ${filas}
            </table>
            <hr>
            <table>
                <tr><td>Op. gravada</td><td class="der">${dinero(base)}</td></tr>
                <tr><td>IGV (18%)</td><td class="der">${dinero(d.total - base)}</td></tr>
                <tr class="total"><td>TOTAL</td><td class="der">${dinero(d.total)}</td></tr>
            </table>
            <hr>
            <div class="codigo"></div>
            <p class="centro">¡Gracias por tu compra!</p>
            <p class="centro">Que disfrutes tus juegos</p>
        </div>`;
    document.getElementById('boleta-overlay').style.display = 'flex';
}


