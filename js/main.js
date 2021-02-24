
const URL_API = 'https://api.airtable.com/v0/appbkih2J6B816R5L/Productos?&view=Grid%20view';
const URL_API_BORRAR = 'https://api.airtable.com/v0/appbkih2J6B816R5L/Productos?records[]=';
const URL_API_ACTUALIZAR = 'https://api.airtable.com/v0/appbkih2J6B816R5L/Productos'
const AUTHORIZATION = 'Bearer keyYeYS1aqxUutFWK';


new Vue({
    el: '#app',
    data: {
        productos: [],
        //variable que guarda el texto de la nueva variable a actualizar
        productoActualizar: ''
    },
    mounted: function () {
        this.obtenerProductos();
    },
    methods: {
        obtenerProductos: function () {
            fetch(URL_API, {
                headers: {
                    'Authorization': AUTHORIZATION
                }
            })
                .then(function (response) {
                    // Transforma la respuesta. En este caso lo convierte a JSON
                    return response.json();
                })
                .then((json) => {
                    this.productos = json.records;
                });
        },
          borrarProducto: function (id) {
              fetch(URL_API_BORRAR.concat(id), {
                  headers: {
                      'Authorization': AUTHORIZATION
                  },
                  method: 'DELETE'
              });
              //Borramos de local
              this.productos = this.productos.filter(producto => {
                  return producto.id !== id
              });

          },
          actualizarAdquiridoEnApi: function (id, checked) {
            fetch(URL_API_ACTUALIZAR, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': AUTHORIZATION
                },
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                            "id": id,
                            "fields": {
                                "Adquirido": checked,
                            }
                        }
                    ]
                })
            })
              //Actualizamos en local
              this.productos = this.productos.map((producto) => {
                  if (producto.id === id) {
                      let miProducto = producto;
                      producto.fields.Adquirido = checked;
                      return miProducto;
                  } else {
                      return producto;
                  }

              });

        }

    }
})