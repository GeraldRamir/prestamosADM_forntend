import React, { useState, useContext } from 'react';
import useClientes from "../hooks/useClientes";

const ModalEditarCliente = ({ cliente, cerrarModal }) => {
    const { editarCliente } = useClientes();
    const [formData, setFormData] = useState(cliente);

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
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 rounded-4 shadow-lg">
                    <div className="modal-header border-0">
                        <h5 className="modal-title text-dark">Editar Cliente</h5>
                        <button type="button" className="btn-close" onClick={cerrarModal}></button>
                    </div>
                    <div className="modal-body p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-muted">Nombre</label>
                                <input 
                                    type="text" 
                                    className="form-control rounded-3 border-light shadow-sm" 
                                    name="nombre" 
                                    value={formData.nombre} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-muted">Banco</label>
                                <input 
                                    type="text" 
                                    className="form-control rounded-3 border-light shadow-sm" 
                                    name="Banco" 
                                    value={formData.Banco} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-muted">Empresa</label>
                                <input 
                                    type="text" 
                                    className="form-control rounded-3 border-light shadow-sm" 
                                    name="Empresa" 
                                    value={formData.Empresa} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary rounded-3 px-4 py-2"
                                >
                                    Guardar Cambios
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary rounded-3 px-4 py-2" 
                                    onClick={cerrarModal}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEditarCliente;
