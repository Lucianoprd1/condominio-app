import Gasto from "../models/gastos.model.js";
import mongoose from "mongoose";

export const crearGasto = async (req, res) => {
  try {
    const { total, utilidades, mantencion, otros, mes, userId } = req.body;

    // Validar que el userId es válido
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "userId inválido o faltante" });
    }

    // Validar que no exista un gasto registrado para el usuario en el mismo mes
    const gastoExistente = await Gasto.findOne({ userId, mes });
    if (gastoExistente) {
      return res.status(400).json({
        message: `Ya existe un gasto registrado para el usuario con ID ${userId} en el mes ${mes}.`,
      });
    }

    // Crear el gasto asociado al usuario especificado
    const nuevoGasto = new Gasto({
      total,
      utilidades,
      mantencion,
      otros,
      mes,
      userId,
    });

    const gastoGuardado = await nuevoGasto.save();
    res
      .status(201)
      .json({ message: "Gasto creado con éxito", gasto: gastoGuardado });
  } catch (error) {
    console.error("Error al crear el gasto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener gastos por usuario (solo para admin)
export const obtenerGastoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar si el id es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    // Buscar los gastos asociados al usuario
    const gastos = await Gasto.find({ userId: id });

    // Validar si no hay gastos asociados al usuario
    if (!gastos || gastos.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron gastos para este usuario" });
    }

    res.status(200).json(gastos);
  } catch (error) {
    console.error("Error al obtener los gastos del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const registrarPago = async (req, res) => {
  try {
    const { gastoId } = req.body;

    // Validar si el gasto existe
    const gasto = await Gasto.findById(gastoId);
    if (!gasto) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    // Verificar si el gasto ya está pagado
    if (gasto.estadoPago === "pagado") {
      return res.status(400).json({ message: "El gasto ya está pagado" });
    }

    // Actualizar el estado del pago
    gasto.estadoPago = "pagado";
    gasto.fechaPago = new Date();
    await gasto.save();

    res.json({ message: "Pago registrado con éxito", gasto });
  } catch (error) {
    console.error("Error al registrar el pago:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//registrar pago de gasto por id
export const registrarPagoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar si el gasto existe
    const gasto = await Gasto.findById(id);
    if (!gasto) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    // Verificar si el gasto ya está pagado
    if (gasto.estadoPago === "pagado") {
      return res.status(400).json({ message: "El gasto ya está pagado" });
    }

    // Actualizar el estado del pago
    gasto.estadoPago = "pagado";
    gasto.fechaPago = new Date();
    await gasto.save();

    res.json({ message: "Pago registrado con éxito", gasto });
  } catch (error) {
    console.error("Error al registrar el pago:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const obtenerGastos = async (req, res) => {
  try {
    const gastos = await Gasto.find({ userId: req.userId });

    if (!gastos || gastos.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron gastos para este usuario" });
    }

    res.json(gastos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los gastos" });
  }
};

export const eliminarGasto = async (req, res) => {
  try {
    const { id } = req.params;

    const gastoEliminado = await Gasto.findByIdAndDelete(id);

    if (!gastoEliminado) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    res.json({ message: "Gasto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el gasto" });
  }
};

export const actualizarGasto = async (req, res) => {
  try {
    const { id } = req.params;
    const { total, utilidades, mantencion, otros, mes } = req.body;

    const gasto = await Gasto.findById(id);

    if (!gasto) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    gasto.total = total;
    gasto.utilidades = utilidades;
    gasto.mantencion = mantencion;
    gasto.otros = otros;
    gasto.mes = mes;

    await gasto.save();

    res.json({ message: "Gasto actualizado correctamente", gasto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el gasto" });
  }
};

//Agregar observaciones (residente)
export const agregarObservaciones = async (req, res) => {
  try {
    const { id } = req.params;
    const { observaciones } = req.body;

    const gasto = await Gasto.findById(id);

    if (!gasto) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    gasto.Observaciones = observaciones;

    await gasto.save();

    res.json({ message: "Observaciones agregadas correctamente", gasto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al agregar observaciones" });
  }
};

//Editar observaciones (residente)
export const editarObservaciones = async (req, res) => {
  try {
    const { id } = req.params;
    const { observaciones } = req.body;

    const gasto = await Gasto.findById(id);

    if (!gasto) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    gasto.Observaciones = observaciones;

    await gasto.save();

    res.json({ message: "Observaciones editadas correctamente", gasto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al editar observaciones" });
  }
};

//Eliminar observaciones (residente)
export const eliminarObservaciones = async (req, res) => {
  try {
    const { id } = req.params;

    const gasto = await Gasto.findById(id);

    if (!gasto) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    gasto.Observaciones = "";

    await gasto.save();

    res.json({ message: "Observaciones eliminadas correctamente", gasto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar observaciones" });
  }
};

// Calcular morosidad para las rutas
export const obtenerMorosidadResidentes = async (req, res) => {
  try {
    const resultado = await calcularMultas();
    res
      .status(200)
      .json({ message: "Cálculo de multas completado", multas: resultado });
  } catch (error) {
    console.error("Error al obtener multas:", error);
    res.status(500).json({ message: "Error al obtener multas" });
  }
};

// Calcular morosidad
export const calcularMorosidad = async () => {
  try {
    const hoy = new Date();

    // Obtener todos los gastos no pagados
    const gastosMorosos = await Gasto.find({ pagado: false });

    const actualizaciones = [];

    for (const gasto of gastosMorosos) {
      // Calcular el mes y año del límite de pago
      const mesAnterior = gasto.mes - 1 > 0 ? gasto.mes - 1 : 12; // Si es enero, va a diciembre
      const anioAnterior = gasto.mes - 1 > 0 ? gasto.anio : gasto.anio - 1;

      // Fecha límite: 15 del mes anterior
      const fechaLimite = new Date(anioAnterior, mesAnterior - 1, 15);

      if (hoy > fechaLimite) {
        // Calcular nueva multa (2% del monto original)
        const nuevaMulta = gasto.multa + gasto.total * 0.02;

        // Actualizar gasto en la base de datos
        const actualizado = await Gasto.findByIdAndUpdate(
          gasto._id,
          { morosidad: true, multa: nuevaMulta },
          { new: true } // Devuelve el documento actualizado
        );
        actualizaciones.push(actualizado);
      }
    }

    console.log("Cálculo de multas completado.");
    return actualizaciones; // Devuelve los gastos actualizados
  } catch (error) {
    console.error("Error al calcular multas:", error);
    throw new Error("Error al calcular multas");
  }
};

export const obtenerMorosidadUsuario = async (req, res) => {
  try {
    // Obtener el userId del usuario autenticado (asumiendo que está en req.userId)
    const userId = req.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "ID de usuario inválido o faltante" });
    }

    // Filtrar los gastos no pagados y morosos del usuario
    const morosidad = await Gasto.find({ userId, morosidad: true });

    if (!morosidad || morosidad.length === 0) {
      return res.status(404).json({
        message: "No se encontraron gastos morosos para este usuario",
      });
    }

    res
      .status(200)
      .json({ message: "Morosidad obtenida con éxito", morosidad });
  } catch (error) {
    console.error("Error al obtener morosidad del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const eliminarMorosidad = async (req, res) => {
  try {
    const { id } = req.params;

    const gasto = await Gasto.findById(id);

    if (!gasto) {
      return res.status(404).json({ message: "Gasto no encontrado" });
    }

    // Verificar si el gasto tiene morosidad
    if (!gasto.morosidad) {
      return res.status(400).json({ message: "El gasto no tiene morosidad" });
    }

    // Eliminar la morosidad
    gasto.morosidad = false;
    gasto.multa = 0;
    await gasto.save();

    res.json({ message: "Morosidad eliminada correctamente", gasto });
  } catch (error) {
    console.error("Error al eliminar la morosidad:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener listado de pagos pendientes de un residente según su id (Admin).
export const obtenerPagosPendById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el userId desde los parámetros de la URL

    // Validar si el id es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    // Buscar los gastos con estadoPago = "pendiente" asociados al usuario
    const pagosPendientes = await Gasto.find({
      userId: id,
      estadoPago: "pendiente",
    });

    // Validar si no hay pagos pendientes para el usuario
    if (!pagosPendientes || pagosPendientes.length === 0) {
      return res.status(404).json({
        message: "No se encontraron pagos pendientes para este usuario",
      });
    }

    res.status(200).json(pagosPendientes);
  } catch (error) {
    console.error("Error al obtener los pagos pendientes del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener listado de pagos cancelados de un residente según su id (admin).
export const obtenerPagosCancelById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el userId desde los parámetros de la URL

    // Validar si el id es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    // Buscar los gastos con estadoPago = "pagado" asociados al usuario
    const pagosCancelados = await Gasto.find({
      userId: id,
      estadoPago: "pagado",
    });

    // Validar si no hay pagos cancelados para el usuario
    if (!pagosCancelados || pagosCancelados.length === 0) {
      return res.status(404).json({
        message: "No se encontraron pagos cancelados para este usuario",
      });
    }

    res.status(200).json(pagosCancelados);
  } catch (error) {
    console.error("Error al obtener los pagos cancelados del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener un listado de todos los residentes que se encuentran con pagos pendientes. (admin)
export const reporteResidentesPagoPend = async (req, res) => {
  try {
    // Agrupar los gastos con estadoPago = "pendiente" por userId
    const usuariosConPagosPendientes = await Gasto.aggregate([
      {
        $match: { estadoPago: "pendiente" }, // Filtrar los documentos con pagos pendientes
      },
      {
        $group: {
          _id: "$userId", // Agrupar por userId
          totalPendientes: { $sum: 1 }, // Contar cuántos pagos pendientes tiene cada usuario
          gastos: { $push: "$$ROOT" }, // Incluir todos los gastos pendientes del usuario
        },
      },
      {
        $lookup: {
          from: "users", // Nombre de la colección de usuarios
          localField: "_id", // Campo de la colección actual (userId)
          foreignField: "_id", // Campo de la colección de usuarios (id)
          as: "usuario", // Campo para almacenar los datos del usuario
        },
      },
      {
        $unwind: "$usuario", // Descomponer el array de usuarios para tener un objeto plano
      },
      {
        $project: {
          _id: 0, // Excluir el campo _id del resultado final
          userId: "$_id", // Renombrar _id a userId
          totalPendientes: 1, // Mantener el conteo de pagos pendientes
          gastos: 1, // Mantener los gastos
          "usuario.name": 1, // Incluir solo el campo `nombre` del usuario
          "usuario.email": 1, // Incluir el campo `email` del usuario (u otros campos si los necesitas)
        },
      },
    ]);

    // Validar si no hay resultados
    if (usuariosConPagosPendientes.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron usuarios con pagos pendientes" });
    }

    res.status(200).json(usuariosConPagosPendientes);
  } catch (error) {
    console.error("Error al obtener usuarios con pagos pendientes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Listar todos los residentes con sus gastos comunes por mes (nombre, depto y monto )y que calcule el total.
export const listarGGCCResidentes = async (req, res) => {
  try {
    const residentesConGastos = await Gasto.aggregate([
      // Relacionar la colección gastos con la colección de usuarios
      {
        $lookup: {
          from: "users", // Nombre de la colección de usuarios
          localField: "userId", // Campo en la colección de gastos
          foreignField: "_id", // Campo en la colección de usuarios
          as: "usuario", // Campo donde se guardará el resultado del join
        },
      },
      // Asegurar que el usuario esté en formato plano (descomponer array)
      { $unwind: "$usuario" },
      // Agrupar por usuario
      {
        $group: {
          _id: "$userId", // Agrupar por userId
          nombre: { $first: "$usuario.nombre" }, // Nombre del usuario
          email: { $first: "$usuario.email" }, // Email del usuario
          gastosPorMes: {
            $push: {
              mes: "$mes", // Mes del gasto
              estadoPago: "$estadoPago", // Estado del pago
              total: "$total", // Total del gasto
            },
          },
          totalPendiente: {
            $sum: {
              $cond: [{ $eq: ["$estadoPago", "pendiente"] }, "$total", 0],
            },
          },
          totalPagado: {
            $sum: {
              $cond: [{ $eq: ["$estadoPago", "pagado"] }, "$total", 0],
            },
          },
        },
      },
      // Ordenar los gastos por mes en el resultado
      {
        $project: {
          _id: 0,
          userId: "$_id",
          nombre: 1,
          email: 1,
          totalPendiente: 1,
          totalPagado: 1,
          gastosPorMes: {
            $sortArray: {
              input: "$gastosPorMes",
              sortBy: { mes: 1 }, // Ordenar los meses en orden ascendente
            },
          },
        },
      },
    ]);

    // Validar si no se encontraron registros
    if (!residentesConGastos || residentesConGastos.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron residentes con gastos comunes" });
    }

    res.status(200).json(residentesConGastos);
  } catch (error) {
    console.error(
      "Error al listar los residentes con sus gastos comunes:",
      error
    );
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//  Mismo listado anterior, pero agreganto totales del condominio.
export const listarGGCCResidentesCondominio = async (req, res) => {
  try {
    const residentesConGastos = await Gasto.aggregate([
      // Relacionar la colección gastos con la colección de usuarios
      {
        $lookup: {
          from: "users", // Nombre de la colección de usuarios
          localField: "userId", // Campo en la colección de gastos
          foreignField: "_id", // Campo en la colección de usuarios
          as: "usuario", // Campo donde se guardará el resultado del join
        },
      },
      // Asegurar que el usuario esté en formato plano (descomponer array)
      { $unwind: "$usuario" },
      // Agrupar por usuario
      {
        $group: {
          _id: "$userId", // Agrupar por userId
          nombre: { $first: "$usuario.nombre" }, // Nombre del usuario
          email: { $first: "$usuario.email" }, // Email del usuario
          gastosPorMes: {
            $push: {
              mes: "$mes", // Mes del gasto
              estadoPago: "$estadoPago", // Estado del pago
              total: "$total", // Total del gasto
            },
          },
          totalPendiente: {
            $sum: {
              $cond: [{ $eq: ["$estadoPago", "pendiente"] }, "$total", 0],
            },
          },
          totalPagado: {
            $sum: {
              $cond: [{ $eq: ["$estadoPago", "pagado"] }, "$total", 0],
            },
          },
        },
      },
      // Ordenar los gastos por mes en el resultado
      {
        $project: {
          _id: 0,
          userId: "$_id",
          nombre: 1,
          email: 1,
          totalPendiente: 1,
          totalPagado: 1,
          gastosPorMes: {
            $sortArray: {
              input: "$gastosPorMes",
              sortBy: { mes: 1 }, // Ordenar los meses en orden ascendente
            },
          },
        },
      },
    ]);

    // Calcular totales globales
    const totalGlobal = await Gasto.aggregate([
      {
        $group: {
          _id: null,
          totalGlobalPendiente: {
            $sum: {
              $cond: [{ $eq: ["$estadoPago", "pendiente"] }, "$total", 0],
            },
          },
          totalGlobalPagado: {
            $sum: {
              $cond: [{ $eq: ["$estadoPago", "pagado"] }, "$total", 0],
            },
          },
        },
      },
    ]);

    // Si no se encontraron residentes
    if (!residentesConGastos || residentesConGastos.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron residentes con gastos comunes" });
    }

    // Combinar datos de residentes con los totales globales
    const response = {
      residentes: residentesConGastos,
      totalesGlobales: {
        "GG.CC. Condominio - Total Pendiente":
          totalGlobal[0]?.totalGlobalPendiente || 0,
        "GG.CC. Condominio - Total Pagado":
          totalGlobal[0]?.totalGlobalPagado || 0,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(
      "Error al listar los residentes con sus gastos comunes:",
      error
    );
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
