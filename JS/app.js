const arrayIngresos = [
    new Ingreso('Nomina', 2100),
    new Ingreso('Venta carro', 1500)
]

const arrayEgresos = [
    new Egreso('Pago renta', 900),
    new Egreso('Pago renta 2', 400)
]

let cargarPagina = () => {
    let total = totalIngresos() - totalEgresos();
    let porcentajeEgresos = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(total);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
    document.getElementById('porcentajeEgresos').innerHTML = formatoPorcentaje(porcentajeEgresos);

    listaIngresos();
    listaEgresos();
}

let formatoMoneda = (valor) => {
    return valor.toLocaleString('en-US', {style:'currency', currency : 'USD', minimumFractionDigits: 2})
}

let formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits: 2})
}

let totalIngresos = () => {
    let totalIngresos = 0;
    for (let ingreso of arrayIngresos){
        totalIngresos += ingreso.valor
    }
    return totalIngresos
}

let totalEgresos = () => {
    let totalEgresos = 0;
    for (let egreso of arrayEgresos){
        totalEgresos += egreso.valor
    }
    return totalEgresos
}

let listaIngresos = () => {
    let textoIngresos = ''
    for (let ingreso of arrayIngresos){
        textoIngresos += formartoIngresosHTML(ingreso)
    }

    document.getElementById('listIngresosHTML').innerHTML = textoIngresos;
}

let formartoIngresosHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="flex text-lg p-2 place-content-between ingreso">
        <p class="">${ingreso.descripcion}</p>
        <div class="flex items-center ingreso text-sky-400">
            <p class="ingreso-valor">+ ${formatoMoneda(ingreso.valor)}</p>
            <ion-icon class="btn-oculto text-2xl" name="close-circle-outline" onclick="borrarIngreso(${ingreso.id})"></ion-icon>
        </div>
    </div>
    `
    return ingresoHTML;
}

let listaEgresos = () => {
    let textEgresos = '';
    for (let egreso of arrayEgresos){
        textEgresos += formatoEgresosHTML(egreso);
    }
    document.getElementById('listEgresosHTML').innerHTML = textEgresos;
}

let formatoEgresosHTML = (egreso) => {
    let egresoHTML = `
    <div class="flex text-lg p-2 place-content-between ingreso">
        <p class="">${egreso.descripcion}</p>
        <div class="flex items-center ingreso text-orange-400">
            <p class="ingreso-valor">- ${formatoMoneda(egreso.valor)}</p>
            <p class="p-1 text-xs ml-2 bg-red-200 rounded-sm">${formatoPorcentaje(egreso.valor/ totalEgresos())}</p>
            <ion-icon class="btn-oculto text-2xl" name="close-circle-outline" onclick="borrarEgreso(${egreso.id})"></ion-icon>
        </div>
    </div>
    `

    return egresoHTML
}

let borrarIngreso = (id) => {
    let indiceEliminar = arrayIngresos.findIndex( arrayIngresos => arrayIngresos.id === id);
    arrayIngresos.splice(indiceEliminar, 1);
    cargarPagina()
} 

let borrarEgreso = (id) => {
    let indiceEliminar = arrayEgresos.findIndex(arrayEgresos => arrayEgresos.id === id)
    arrayEgresos.splice(indiceEliminar, 1)
    cargarPagina()
}

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'].value;
    let descripcion = forma['descripcion'].value;
    let valor = Number(forma['valor'].value);

    if (tipo === 'ingreso'){
        arrayIngresos.push(new Ingreso(descripcion, valor));
        
    } else if (tipo === 'egreso'){
        arrayEgresos.push(new Egreso(descripcion, valor))
    }

    cargarPagina();
}