// Objeto para almacenar los datos del carrito
let data = { "quantity": 0, "price": 0.00 };

// Espera a que el documento HTML se cargue completamente
document.addEventListener("DOMContentLoaded", function () {
  // Obtiene los datos del carrito almacenados en localStorage o inicializa el carrito
  getData();

  // -- Al hacer clic en el icono de suma --
  document.getElementById("btn-add-quantity").addEventListener("click", function () {
    // Incrementa la cantidad en 1
    const quantityInput = document.getElementById("txt-quantity");
    quantityInput.value = parseInt(quantityInput.value) + 1;
  });

  // -- Al hacer clic en el icono de resta --
  document.getElementById("btn-minus-quantity").addEventListener("click", function () {
    // Disminuye la cantidad en 1 si es mayor que cero
    const quantityInput = document.getElementById("txt-quantity");
    if (parseInt(quantityInput.value) > 0) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  });

  // -- Al hacer clic en el botón "Add to cart" --
  document.getElementById("btn-add-to-cart").addEventListener("click", function () {
    // Obtiene la cantidad seleccionada y actualiza los datos del carrito
    const quantity = parseInt(document.getElementById("txt-quantity").value);
    if (quantity > 0) {
      data.quantity += quantity;
      data.price = (data.quantity * 125).toFixed(2);
      displayCart();
      document.getElementById("txt-quantity").value = "0";
      updateData();
    }
  });

  // -- Al hacer clic en el icono de eliminar --
  document.getElementById("btn-remove").addEventListener("click", function () {
    // Reinicia los datos del carrito y actualiza la visualización
    data.quantity = 0;
    data.price = 0.00;
    displayCart();
    updateData();
  });

  // -- Al hacer clic en el botón "Checkout" --
  document.querySelector(".btn-checkout").addEventListener("click", function () {
    // Si hay elementos en el carrito, reinicia los datos y muestra un mensaje de confirmación
    if (data.quantity > 0) {
      data.quantity = 0;
      data.price = 0.00;
      displayCart();
      updateData();
      Swal.fire({
        icon: 'success',
        title: '¡Compra exitosa!',
        text: 'Gracias por comprar con nosotros.',
        customClass: {
          confirmButton: 'btn-checkout px-4 text-uppercase',
        },
        allowOutsideClick: false,
      });
    }
  });
});

// -- Función para mostrar los elementos agregados al carrito --
function displayCart() {
  const cartItems = document.querySelectorAll(".cart-item");
  const emptyCartMessage = document.querySelector("#cart-dropdown .dropdown-item.empty");
  const navbarCartQuantity = document.querySelector("#btn-cart .badge");

  // Si no hay elementos en el carrito, oculta los elementos y muestra el mensaje del carrito vacío
  if (data.quantity === 0) {
    cartItems.forEach(function (item) {
      item.style.display = "none";
    });
    document.querySelector(".cart-checkout").style.display = "none";
    navbarCartQuantity.style.display = "none";
    emptyCartMessage.style.display = "block";
  } else {
    // Si hay elementos en el carrito, actualiza la cantidad y el precio total y muestra los elementos del carrito
    emptyCartMessage.style.display = "none";
    navbarCartQuantity.textContent = data.quantity;
    navbarCartQuantity.style.display = "inline-block";
    document.querySelectorAll(".cart-quantity").forEach(function (quantityElement) {
      quantityElement.textContent = data.quantity;
    });
    document.querySelectorAll(".cart-price").forEach(function (priceElement) {
      priceElement.textContent = "$" + data.price.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    });
    cartItems.forEach(function (item) {
      item.style.display = "block";
    });
    document.querySelector(".cart-checkout").style.display = "block";
  }
}

// -- Función para obtener los datos del carrito almacenados en el localStorage --
function getData() {
  const cartData = localStorage.getItem('cartdata');
  if (cartData === null) {
    data.quantity = 0;
    data.price = 0.00;
  } else {
    data = JSON.parse(cartData);
  }
  console.log(data);
  displayCart();
}

// -- Función para actualizar los datos del carrito en el localStorage --
function updateData() {
  localStorage.setItem('cartdata', JSON.stringify(data));
}





