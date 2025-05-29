let aVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
 let modoEdicion = false;
  let indexEditar = null;

const agregarVehiculo = () => {
   let marca = document.getElementById('marca').value;
    let modelo = document.getElementById('modelo').value;
     let año = document.getElementById('año').value;
     let costo = document.getElementById('costo').value;
       let placa = document.getElementById('placa').value;

  if (marca.trim() === '' || modelo.trim() === '' || año.trim() === '' || costo.trim() === '' || placa.trim() === '') {
    Swal.fire({ title: 'ERROR', text: 'FALTA LLENAR CAMPOS!!!', icon: 'error' });
    return;
  }

  let vehiculo = { marca, modelo, año, costo, placa };

  if (modoEdicion) {
    aVehiculos[indexEditar] = vehiculo;
    modoEdicion = false;
    indexEditar = null;
  } else {
    aVehiculos.push(vehiculo);
  }

  localStorage.setItem('vehiculos', JSON.stringify(aVehiculos));
   limpiarCampos();
    cerrarModal();
  refrescarTabla();
};

const limpiarCampos = () => {
  document.getElementById('marca').value = '';
   document.getElementById('modelo').value = '';
    document.getElementById('año').value = '';
     document.getElementById('costo').value = '';
      document.getElementById('placa').value = '';
};

const refrescarTabla = () => {
  aVehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];
  let tablaHTML = '';
  aVehiculos.forEach((v, index) => {
    tablaHTML += `
      <tr>
         <td>${v.marca}</td>
          <td>${v.modelo}</td>
           <td>${v.año}</td>
            <td>${v.costo}</td>
             <td>${v.placa}</td>
              <td>
          <button type="button" class="btn btn-danger" onclick="eliminarVehiculo(${index})">
          <i class="bi bi-x-circle"></i>
          </button>
          <button type="button" class="btn btn-primary" onclick="editarVehiculo(${index})">
        <i class="bi bi-pencil-fill"></i>
          </button>
        </td>
      </tr>
    `;
  });
  document.getElementById('listaVehiculos').innerHTML = tablaHTML;
};

const eliminarVehiculo = (index) => {
  Swal.fire({
    title: "¿eliminar vehiculo?",
    showDenyButton: true,
    confirmButtonText: "Sí",
    denyButtonText: `No`,
    icon: "warning"
  }).then((result) => {
    if (result.isConfirmed) {
      aVehiculos.splice(index, 1);
      localStorage.setItem("vehiculos", JSON.stringify(aVehiculos));
      refrescarTabla();
      Swal.fire("Éxito", "Se elimino", "success");
    }
  });
};

const editarVehiculo = (index) => {
  const vehiculo = aVehiculos[index];
  document.getElementById('marca').value = vehiculo.marca;
   document.getElementById('modelo').value = vehiculo.modelo;
    document.getElementById('año').value = vehiculo.año;
     document.getElementById('costo').value = vehiculo.costo;
      document.getElementById('placa').value = vehiculo.placa;

  modoEdicion = true;
  indexEditar = index;


  const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
  modal.show();
};

const cerrarModal = () => {
  const modalElement = document.getElementById('exampleModal');
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  if (modalInstance) {
    modalInstance.hide();
  }
  modoEdicion = false;
  indexEditar = null;
};
refrescarTabla();




















