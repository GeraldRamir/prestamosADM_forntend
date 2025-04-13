import React, { useState, useEffect, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import PagosContext from "../context/PagosProvider";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.css";

const PagosModal = ({ isOpen, onClose, clienteId }) => {
  const { obtenerPagos, crearPago, editarPago } = useContext(PagosContext);
  const [pagosEditable, setPagosEditable] = useState([]);
  const [valorPrestamo, setValorPrestamo] = useState(0);
  const [interes, setInteres] = useState(0);
  // const [Interes, setInteres] = useState(0);
  const handleDeleteRow = (index) => {
    setPagosEditable((prevPagos) => prevPagos.filter((_, i) => i !== index));
  };
  
  useEffect(() => {
    if (isOpen && clienteId) {
      const cargarPagos = async () => {
        try {
          console.log("Cargando pagos para el cliente:", clienteId);
          const pagosCliente = await obtenerPagos(clienteId);
          console.log("Pagos obtenidos:", pagosCliente);
  
          if (pagosCliente && pagosCliente.pagos && Array.isArray(pagosCliente.pagos)) {
            const pagos = pagosCliente.pagos;
            const valorInicial = pagos[0]?.capital || 0;
            const interesInicial = pagos[0]?.intereses || 0; // Se obtiene correctamente
  
            setValorPrestamo(valorInicial);
            setInteres(interesInicial); // Se guarda el interés inicial
  
            setPagosEditable(
              pagos.length
                ? pagos
                : [
                    {
                      clienteId,
                      quincena: "",
                      capital: valorInicial,
                      avance: 0,
                      abono: 0,
                      intereses: interesInicial, // Se asigna el interés correcto
                      total: 0,
                      atrasos: 0,
                      descuento: 0,
                    },
                  ]
            );
          } else {
            console.error("Error: No se recibieron pagos válidos.", pagosCliente);
            toast.error("No se pudieron cargar los pagos.");
          }
        } catch (error) {
          console.error("Error obteniendo pagos:", error);
          toast.error("No se pudieron cargar los pagos.");
        }
      };
  
      cargarPagos();
    }
  }, [isOpen, clienteId])

  const columnas = [
    {
      data: "quincena",
      type: "date",
      title: "Quincena",
      dateFormat: "YYYY-MM-DD",
      correctFormat: true,
      defaultDate: new Date(),
      allowInvalid: false,
      datePickerConfig: {
        firstDay: 1,
        showWeekNumbers: true,
        disableMobile: true,
      },
    },
    { data: "capital", type: "numeric", title: "Capital" },
    { data: "avance", type: "numeric", title: "Avance" },
    { data: "abono", type: "numeric", title: "Abono" },
    { data: "intereses", type: "numeric", title: "Intereses" },
    { data: "total", type: "numeric", title: "Total", readOnly: true },
    { data: "atrasos", type: "numeric", title: "Atrasos" },
    { data: "descuento", type: "numeric", title: "Descuento" },
  ];

  const calcularTotales = () => {
    let totalCapital = 0;
    let totalAvance = 0;
    let totalAbono = 0;
    let totalIntereses = 0;
    let totalTotal = 0;
    let totalAtrasos = 0;

    pagosEditable.forEach((pago) => {
      totalCapital += Number(pago.capital) || 0;
      totalAvance += Number(pago.avance) || 0;
      totalAbono += Number(pago.abono) || 0;
      totalIntereses += Number(pago.intereses) || 0;
      totalTotal += Number(pago.total) || 0;
      totalAtrasos += Number(pago.atrasos) || 0;
    });

    return [
      {
        quincena: "Totales",  // Etiqueta para la fila de totales
        capital: totalCapital,
        avance: totalAvance,
        abono: totalAbono,
        intereses: totalIntereses,
        total: totalTotal,
        atrasos: totalAtrasos,
      },
    ];
  };

  const addNewRow = () => {
    setPagosEditable((prevPagos) => {
      return [
        ...prevPagos,
        {
          clienteId,
          quincena: new Date().toISOString().split("T")[0],
          capital: prevPagos.length ? prevPagos[prevPagos.length - 1].capital : valorPrestamo, 
          avance: 0,
          abono: 0,
          intereses: prevPagos.length ? prevPagos[prevPagos.length - 1].intereses : interes,
          total: 0,
          atrasos: 0,
          descuento: 0,
        },
      ];
    });
  };
  
  
  

  const handleSave = async () => {
    try {
      console.log("Guardando cambios con los siguientes pagos:", pagosEditable);
  
      if (!clienteId) {
        console.error("Error: clienteId no está definido.");
        toast.error("No se puede guardar sin un cliente.");
        return;
      }
  
      // Verifica que todos los pagos tengan un valor para `quincena`
      const pagosConFecha = pagosEditable.map((pago) => {
        if (!pago.quincena) {
          pago.quincena = new Date().toISOString().split("T")[0]; // Asignar una fecha si falta
        }
        return pago;
      });
  
      await Promise.all(
        pagosConFecha.map(async (pago) => {
          console.log("Guardando pago:", pago);
  
          // Calculamos el total antes de guardar
          pago.total = (Number(pago.capital) || 0) + (Number(pago.avance) || 0) + (Number(pago.abono) || 0) + (Number(pago.intereses) || 0);
  
          if (pago._id) {
            await editarPago(clienteId, pago._id, pago);
          } else {
            await crearPago(pago);
          }
        })
      );
  
      toast.success("Pagos guardados correctamente");
      onClose();
    } catch (error) {
      toast.error("Error al guardar los pagos");
      console.error("Error al guardar pagos:", error);
    }
  };
  // const handleColumnChange = (changes, source) => {
  //   if (source !== "loadData" && changes) {
  //     setPagosEditable((prevPagos) => {
  //       const updatedPagos = [...prevPagos];
  //       changes.forEach(([row, prop, oldVal, newVal]) => {
  //         if (row < updatedPagos.length) {
  //           updatedPagos[row] = { ...updatedPagos[row], [prop]: newVal };
  //         }
  //       });
  //       return updatedPagos;
  //     });
  //   }
  // };

  const addNewColumn = () => {
    const newColumn = { data: `columna_${columnas.length + 1}`, type: "text", title: `Nueva Columna ${columnas.length + 1}` };
    setColumnas([...columnas, newColumn]);
  };

  const removeColumn = (index) => {
    setColumnas((prev) => prev.filter((_, i) => i !== index));
  };
  const handleRowRemove = (index, amount) => {
    setPagosEditable((prev) => {
      const updatedPagos = [...prev];
      updatedPagos.splice(index, amount);
      return updatedPagos;
    });
  };
  
  
  
  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Pagos del Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ maxHeight: "400px", overflowY: "auto", padding: "5px", borderRadius: "5px" }}>
          <HotTable
            data={[...pagosEditable, ...calcularTotales()]} // Aseguramos que siempre sea un arreglo
            colHeaders={columnas.map((col) => col.title)}
            columns={columnas}
            rowHeaders={true}
            licenseKey="non-commercial-and-evaluation"
            afterChange={(changes, source) => {
              if (Array.isArray(changes) && source !== 'loadData') {
                setPagosEditable((prevPagos) => {
                  const updatedPagos = [...prevPagos];
            
                  changes.forEach(([row, prop, oldVal, newVal]) => {
                    if (row >= updatedPagos.length) return;
            
                    const pago = { ...updatedPagos[row] };
            
                    if (prop === "avance") {
                      const avance = Number(newVal) || 0;
                      const oldAvance = Number(oldVal) || 0;
                      pago.capital += avance - oldAvance;
                    }
            
                    if (prop === "abono") {
                      const abono = Number(newVal) || 0;
                      const oldAbono = Number(oldVal) || 0;
                      pago.capital -= abono - oldAbono;
                    }
            
                    pago[prop] = newVal;
                    updatedPagos[row] = pago;
                  });
            
                  return updatedPagos;
                });
              }
            }}
            
            
            
            height={pagosEditable.length > 5 ? "auto" : "300px"}
            stretchH="all"
            dropdownMenu={true}
            contextMenu={['row_above', 'row_below', 'remove_row', 'undo', 'redo', 'make_read_only', 'copy', 'cut', 'paste']} // Menú contextual
            manualColumnInsert={true}
            manualColumnResize={true}
            manualRowResize={true}
            manualColumnMove={true}
            filters={true}
            manualRowMove={true}
            manualColumnRemove={true}
            manualRowRemove={true}
            afterRemoveRow={(index, amount) => handleRowRemove(index, amount)}
          

            beforeColumnRemove={(index) => removeColumn(index)}

          />
        </div>
        <Button variant="primary" onClick={addNewRow} className="mt-3">
          Agregar Fila
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PagosModal;
