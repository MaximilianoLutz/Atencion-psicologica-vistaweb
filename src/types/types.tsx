

export const types = {

    login: '[Auth] Login',
    logout: '[Auth] Logout',

    authCheckingFinish: '[Auth] finishChecking' ,

    uiOpenModal: '[UI] Open Modal',
    uiCloseModal: '[UI] Close Modal',

    calendarEventAddNew: '[Calendar] Event add new',
    calendarEventSetActive: '[Calendar] Event set active',
    clearActiveNote: '[Calendar] Clear active note',
    calendarEventUpdated: '[Calendar] Event updated',
    calendatEventDeleted: '[Calendar] Event deleted',
    eventLoaded: '[Calendar] Event loaded',
    eventLogout: '[Calendar] Event logout',

    cargarPacientes: '[Pacientes] Cargar',
    pacienteActive: '[Pacientes] Set active pacient',

    cargarPacientesdeProfesional: '[Profesional] Cargar lista de pacientes del profesional actual',
    cargarDatosdeProfesional: '[Profesional] Cargar datos del profesional actual',
    cargarListadeProfesionales: '[Profesional] Cargar listado de profesionales en auth',

    cargarProfesional: '[Profesional] Cargar listado de profesionales',
    clearProfesional: '[Profesional] Limpiar profecional activo'
}