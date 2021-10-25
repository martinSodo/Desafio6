const socket = io.connect();

const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const articulo = document.getElementsByName('articulo')[1].value;
  const precio = document.getElementsByName('precio')[1].value;
  const imagen = document.getElementsByName('imagen')[1].value;
  
  socket.emit('new-product', {articulo, precio, imagen});
});

socket.on('products', (products) => {
    const productList = products.map((product) => `
        <tr>
        <th scope="row">${product.id}</th>
        <td>${product.articulo}</td>
        <td>${product.precio}</td>
        <td><img src="${product.imagen}" width="50px" height="50px"></td>
        </tr>
      `).join(' ');

  const list = document.getElementById('real-time-products');

  list.innerHTML = 
  `<div class="col jumbotron text-center ">
    <table class="table border-dark m-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Articulo</th>
          <th scope="col">Precio</th>
          <th scope="col">Imagen</th>
        </tr>
      </thead>
      <tbody>${productList}
      </tbody>
    </table>
  </div>`;
})

const form2 = document.getElementById('form2');

form2.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementsByName('email')[0].value;
  const texto = document.getElementsByName('texto')[1].value;
  
  socket.emit('new-message', {email, texto});
});

socket.on('messages', (messages) => {
    const messagesList = messages.map((message) => `
        <tr>
        <th scope="row">${message.id}</th>
        <td class ="text-danger">${message.email}</td>
        <td>${message.texto}</td>
       </tr>
      `).join(' ');

  const list = document.getElementById('real-time-messages');

  list.innerHTML = 
  `<div class="col jumbotron m-5 text-center ">
    <table class="table border border-dark bg-light m-3">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Email</th>
          <th scope="col">Texto</th>
        </tr>
      </thead>
      <tbody>${messagesList}
      </tbody>
    </table>
  </div>`;
})