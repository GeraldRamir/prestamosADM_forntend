import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import PagosContext from "./PagosProvider";  // Importamos el contexto de pagos

const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState('');

    useEffect(() => {
        obtenerClientes(); // Llama a la función para obtener los clientes al cargar el componente
    }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente
    
    useEffect(() => {
        if (empresaSeleccionada === '') {
            setClientesFiltrados(clientes); // Si no hay filtro, muestra todos los clientes
        } else {
            const filtrados = clientes.filter(cliente => cliente.empresa === empresaSeleccionada);
            setClientesFiltrados(filtrados); // Filtra según la empresa seleccionada
        }
    }, [empresaSeleccionada, clientes]); // Este useEffect se ejecuta cuando cambia empresaSeleccionada o clientes
    


    // Obtención de clientes al cargar el componente
// Obtención de clientes al cargar el componente
const obtenerClientes = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log("🔑 Token obtenido:", token); // Ver el token
        if (!token) return;
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await clienteAxios('/clientes', config);
        console.log("📥 Datos de clientes obtenidos:", data); // Ver la respuesta de la API
        setClientes(data); // Actualiza el estado de clientes
    } catch (error) {
        console.error("❌ Error al obtener clientes:", error); // Ver error si ocurre
    }
};

    
    // Función para guardar un nuevo cliente
  // Función para guardar un nuevo cliente
  const guardarCliente = async (cliente) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
  
      const { data } = await clienteAxios.post('/clientes', cliente, config);
  
      const clienteConId = {
        ...cliente,
        _id: data._id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      };
  
      setClientes(prev => [...prev, clienteConId]);
  
      if (data._id) {
        obtenerPagos(data._id);
      }
  
      console.log("✅ Cliente guardado localmente:", clienteConId);
  
    } catch (error) {
      console.error("❌ Error al guardar cliente:", error);
    }
  };
  

    // Función para obtener los pagos de un cliente
    const obtenerPagos = async (clienteId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token || !clienteId) return;  // Verifica que clienteId esté disponible
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await clienteAxios(`/pagos/${clienteId}`, config);
            console.log("Pagos obtenidos para el cliente:", data);
            // Aquí podrías actualizar el estado de los pagos si es necesario
        } catch (error) {
            console.log(error);
        }
    };

    // Función para eliminar un cliente
    const eliminarCliente = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            await clienteAxios.delete(`/clientes/${id}`, config);
            setClientes(prevClientes => prevClientes.filter(cliente => cliente._id !== id));
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
        }
    };

    // Función para editar un cliente
    const editarCliente = async (cliente) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await clienteAxios.put(`/clientes/${cliente._id}`, cliente, config);
            setClientes(clientes.map(c => c._id === data._id ? data : c));
        } catch (error) {
            console.error("Error al actualizar cliente:", error.response?.data || error.message);
        }
    };

    return (
        <ClientesContext.Provider value={{
            clientes,
            clientesFiltrados, // Añadido
            obtenerClientes,
            guardarCliente,
            eliminarCliente,
            editarCliente,
            setClienteSeleccionado,
            clienteSeleccionado,
            setEmpresaSeleccionada // Si quieres cambiar la empresa desde otros componentes
        }}>
            {children}
        </ClientesContext.Provider>
        
    );
};

export default ClientesContext;
