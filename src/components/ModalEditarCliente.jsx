import React, { useState, useContext } from 'react';
import useClientes from "../hooks/useClientes";
import { Feather } from 'react-feather'; // Asegúrate de tener Feather Icons instalados

const ModalEditarCliente = ({ cliente, cerrarModal }) => {
    const { editarCliente } = useClientes();
    const formatDate = (date) => {
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Esto devuelve en formato YYYY-MM-DD
    };
    
    const [formData, setFormData] = useState({
        FechaPago: formatDate(cliente.FechaPago), // Asegúrate de pasar la fecha ya formateada
        FechaIngreso: formatDate(cliente.FechaIngreso), // Asegúrate de pasar la fecha ya formateada
        nombre: cliente.nombre,
        Banco: cliente.Banco,
        Empresa: cliente.Empresa,
        ClaveTarjeta: cliente.ClaveTarjeta,
        copiaCedula: cliente.copiaCedula,
        NumeroCuenta: cliente.NumeroCuenta,
        ValorPrestamo: cliente.ValorPrestamo,
        Interes: cliente.Interes,
        // Otros campos...
        nombreUbicacion: cliente.nombreUbicacion || '', // Asegúrate de que la ubicación tenga un valor por defecto
    });
    console.log(formData)
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await editarCliente(formData);
        cerrarModal();
    };


    return (
        
        
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.3)" }}>
                {/* <style>
    {`
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}
  </style> */}

            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 9999,
                    maxHeight: "90vh", // Limitar la altura del modal
                    overflowY: "auto", // Permitir scroll si hay muchos campos
                }}
            >
                <div
                    style={{
                        backgroundColor: "#fff9e6",
                        border: "1px solid #f5d3a1",
                        borderRadius: "20px",
                        padding: "20px",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                        fontFamily: "Arial, sans-serif",
                        width: "420px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "15px",
                        }}
                    >
                        <i
                            data-feather="edit-2"
                            className="me-2"
                            style={{
                                fontSize: "32px",
                                marginRight: "12px",
                                color: "#ff6f00",
                            }}
                        ></i>
                        <strong style={{ color: "#ff6f00", fontSize: "20px" }}>
                            Editar Cliente
                        </strong>
                    </div>
                    <div style={{ color: "#ff6f00", marginBottom: "20px" }}>
                        Modifica los datos del cliente según sea necesario.
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-muted">Nombre</label>
                            <div className="d-flex align-items-center">
                                <Feather
                                    icon="user"
                                    size={18}
                                    style={{ color: "#ff6f00", marginRight: "10px" }}
                                />
                                <input
                                    type="text"
                                    className="form-control rounded-3 border-light shadow-sm"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    style={{ paddingLeft: "25px" }}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-muted">Banco</label>
                            <div className="d-flex align-items-center">
                                <Feather
                                    icon="credit-card"
                                    size={18}
                                    style={{ color: "#ff6f00", marginRight: "10px" }}
                                />
                                <input
                                    type="text"
                                    className="form-control rounded-3 border-light shadow-sm"
                                    name="Banco"
                                    value={formData.Banco}
                                    onChange={handleChange}
                                    required
                                    style={{ paddingLeft: "25px" }}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-muted">Empresa</label>
                            <div className="d-flex align-items-center">
                                <Feather
                                    icon="briefcase"
                                    size={18}
                                    style={{ color: "#ff6f00", marginRight: "10px" }}
                                />
                                <input
                                    type="text"
                                    className="form-control rounded-3 border-light shadow-sm"
                                    name="Empresa"
                                    value={formData.Empresa}
                                    onChange={handleChange}
                                    required
                                    style={{ paddingLeft: "25px" }}
                                />
                            </div>
                        </div>
                        {/* Agrega más campos aquí */}
                        <div className="mb-3">
                            <label className="form-label text-muted">Fecha Ingreso</label>
                            <div className="d-flex align-items-center">
                                <Feather
                                    icon="mail"
                                    size={18}
                                    style={{ color: "#ff6f00", marginRight: "10px" }}
                                />
                                <input
                                    type="date"
                                    className="form-control rounded-3 border-light shadow-sm"
                                    name="FechaIngreso"
                                    value={formData.FechaIngreso}
                                    onChange={handleChange}
                                    required
                                    style={{ paddingLeft: "25px" }}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-muted">Fecha de Pago</label>
                            <div className="d-flex align-items-center">
                                <Feather
                                    icon="phone"
                                    size={18}
                                    style={{ color: "#ff6f00", marginRight: "10px" }}
                                />
                                <input
                                    type="date"
                                    className="form-control rounded-3 border-light shadow-sm"
                                    name="FechaPago"
                                    value={formData.FechaPago}
                                    onChange={handleChange}
                                    required
                                    style={{ paddingLeft: "25px" }}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-muted">Numero de cuenta</label>
                            <div className="d-flex align-items-center">
                                <Feather
                                    icon="phone"
                                    size={18}
                                    style={{ color: "#ff6f00", marginRight: "10px" }}
                                />
                                <input
                                    type="number"
                                    className="form-control rounded-3 border-light shadow-sm"
                                    name="NumeroCuenta"
                                    value={formData.NumeroCuenta}
                                    onChange={handleChange}
                                    required
                                    style={{ paddingLeft: "25px" }}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-muted">Ubicacion</label>
                            <div className="d-flex align-items-center">
                                <Feather
                                    icon="phone"
                                    size={18}
                                    style={{ color: "#ff6f00", marginRight: "10px" }}
                                />
                                <input
                                    type="text"
                                    className="form-control rounded-3 border-light shadow-sm"
                                    name="ubicacion"
                                    value={formData.nombreUbicacion}
                                    onChange={handleChange}
                                    required
                                    style={{ paddingLeft: "25px" }}
                                />
                            </div>
                        </div>


                        {/* Botones */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "10px",
                                marginTop: "20px",
                            }}
                        >
                            <button
                                type="submit"
                                className="btn btn-primary rounded-3 px-4 py-2"
                                style={{
                                    backgroundColor: "#ff6f00",
                                    border: "none",
                                    color: "#fff",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s",
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = "#e65100")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "#ff6f00")}
                            >
                                Guardar Cambios
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary rounded-3 px-4 py-2"
                                onClick={cerrarModal}
                                style={{
                                    backgroundColor: "#e2e6ea",
                                    border: "none",
                                    color: "#6c757d",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s",
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = "#ced4da")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "#e2e6ea")}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalEditarCliente;
