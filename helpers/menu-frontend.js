const getMenuFrontEnd = (role) => {
    const menu = [
        {
          titulo: 'Dahsboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            {titulo: 'Main', url: '/'},
            {titulo: 'Gráficas', url: 'grafica1'},
            {titulo: 'ProgressBar', url: 'progress'},
            {titulo: 'Promesas', url: 'promesas'},
            {titulo: 'RXJS', url: 'rxjs'},
          ]
        },
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            //{titulo: 'Usuarios', url: 'usuarios'},
            {titulo: 'Hospitales', url: 'hospitales'},
            {titulo: 'Médicos', url: 'medicos'},
          ]
        }
      ]

    if (role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({titulo: 'Usuarios', url: 'usuarios'})
    }

    return menu;
}

module.exports = {getMenuFrontEnd}