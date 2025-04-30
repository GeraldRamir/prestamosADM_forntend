import React, { useState, useContext, useCallback, useEffect } from "react";
import "../styles/app.css";
import "../styles/clases.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import PagosModal from "./PagosModal";
import PagosContext from "../context/PagosProvider";
import feather from 'feather-icons';

import Mapa from "./Mapa";

const ClienteBody = ({ cliente, onEdit, onDelete }) => {
  const { pagos, editarPago, eliminarPago } = useContext(PagosContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [ubicacionMapa, setUbicacionMapa] = useState({ lat: null, lng: null });
  const [imagenUbicacion, setImagenUbicacion] = useState('');

  // Validar si pagos es un array antes de usar filter
  const pagosCliente = Array.isArray(pagos) ? pagos.filter((pago) => pago.clienteId === cliente._id) : [];

  // Función para abrir el mapa y colocar el marcador en la ubicación del cliente
  const openMap = (lat, lng) => {
    if (lat && lng) {
      setUbicacionMapa({ lat, lng });
      setMostrarMapa(true); // Abre el mapa
      return
    }
    
  };
    useEffect(() => {
      feather.replace(); // Reemplazar íconos de Feather después del renderizado
    }, []);

  const obtenerImagenUbicacion = (lat, lng) => {
    return `https://example.com/map-image?lat=${lat}&lng=${lng}`;
  };

  useEffect(() => {
    if (ubicacionMapa.lat && ubicacionMapa.lng) {
      const urlImagen = obtenerImagenUbicacion(ubicacionMapa.lat, ubicacionMapa.lng);
      setImagenUbicacion(urlImagen);
    }
  }, [ubicacionMapa]); // Se ejecuta cuando las coordenadas cambian

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <Mapa
        mostrarMapa={mostrarMapa}
        ubicacionMapa={ubicacionMapa}
        setMostrarMapa={setMostrarMapa}
        imagenUbicacion={imagenUbicacion}
      />

      <tr style={{ borderBottom: "1px solid #dee2e6" }}>
        <td onClick={handleOpenModal} style={{ cursor: "pointer", padding: "12px 24px" }}>
          {cliente.nombre}
        </td>
        {/* <td style={{ padding: "12px 24px" }}>{cliente.telefono}</td> */}
        <td style={{ padding: "12px 24px" }}>{cliente.copiaCedula}</td>
        <td style={{ padding: "12px 24px" }}>{cliente.Banco}</td>
        <td style={{ padding: "12px 24px" }}>{cliente.ClaveTarjeta}</td>
        <td style={{ padding: "12px 24px" }}>{cliente.Interes}</td>
        <td style={{ padding: "12px 24px" }}>{cliente.Empresa}</td>

        <td style={{ whiteSpace: "nowrap", padding: "12px 24px" }}>
          {cliente.FechaIngreso ? cliente.FechaIngreso: ""}
        </td>

        <td style={{ whiteSpace: "nowrap", padding: "12px 24px" }}>
          {cliente.FechaPago ? cliente.FechaPago: ""}
        </td>


        <td style={{ padding: "12px 24px" }}>
          <span className="badge bg-success">RD$ {cliente.ValorPrestamo}</span>
        </td>

        <td style={{ padding: "12px 24px" }}>{cliente.NumeroCuenta}</td>
 
        <td style={{ padding: "12px 40px", whiteSpace: "nowrap" }}>
          <span
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
            onClick={() => openMap(cliente.ubicacion?.lat, cliente.ubicacion?.lng)}
          >
            {cliente.nombreUbicacion && !cliente.nombreUbicacion.includes('state') 
              ? cliente.nombreUbicacion 
              : "Ubicación no disponible"}
          </span>

        </td>

        <td style={{ padding: "12px 24px" }}>
          <div className="d-flex gap-2">
            <button
              onClick={() => onEdit(cliente)}
              className="d-flex align-items-center gap-1 border-0 px-3 py-1 rounded bg-warning bg-opacity-25 text-warning fw-bold"
            >
              <i data-feather="edit" className="me-2"></i>
              <span>Editar</span>
            </button>

            <button
              onClick={() => onDelete(cliente._id)}
              className="d-flex align-items-center gap-1 border-0 px-3 py-1 rounded bg-danger bg-opacity-25 text-danger fw-bold"
            >
              <i data-feather="trash" className="me-2"></i>
              Eliminar
            </button>
          </div>
        </td>
      </tr>




      <PagosModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        clienteId={cliente._id}
        pagos={pagosCliente}
        editarPago={editarPago}
        eliminarPago={eliminarPago}
      />
    </>
  )
}

export default ClienteBody;


