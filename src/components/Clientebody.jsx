import React, { useState, useContext, useCallback, useEffect } from "react";
import "../styles/app.css";
import "../styles/clases.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import PagosModal from "./PagosModal";
import PagosContext from "../context/PagosProvider";

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
    } else {
      alert("Ubicación no disponible.");
    }
  };

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

      <tr>
        <td onClick={handleOpenModal} style={{ cursor: "pointer" }}>
          {cliente.nombre}
        </td>
        <td className="d-none d-xl-table-cell">{cliente.Banco}</td>
        <td className="d-none d-xl-table-cell">{cliente.Empresa}</td>
        <td>
          <span className="badge bg-success">RD$ {cliente.ValorPrestamo}</span>
        </td>
        <td className="d-none d-md-table-cell">{cliente.NumeroCuenta}</td>
        <td>
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => openMap(cliente.ubicacion.lat, cliente.ubicacion.lng)}
          >
            {cliente.nombreUbicacion || "Ubicación no disponible"}
          </span>
        </td>
        <td>
          <button
            onClick={() => onEdit(cliente)}
            className="btn btn-warning btn-sm me-2"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(cliente._id)}
            className="btn btn-danger btn-sm"
          >
            Eliminar
          </button>
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
  );
};

export default ClienteBody;


