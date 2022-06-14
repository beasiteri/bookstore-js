document.addEventListener("DOMContentLoaded", () => {
   document.getElementById('test').onclick = () => {
    fetch('http://localhost:1337/test')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.getElementById('test-number').innerHTML = `${data.length} test elements`;
      })
  };

  document.getElementById('none').onclick = (event) => {
    event.preventDefault();
    document.getElementById('entries-container').innerHTML = '';
  }

  document.getElementById('books').onclick = (event) => {
    event.preventDefault();
    fetch('http://localhost:1337/api/books')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.getElementById('entries-container').innerHTML = data.map((entity, index) => 
          `<div class="entity-content">
            <div>
              <h2>Book ${index + 1}</h2>
              <ul class="books">
                <li id="entityID"><i class="fas fa-edit"></i><b> ID:</b> <span>${entity._id}</span></li>
                <li><i class="fas fa-edit"></i><b> Title:</b> <span id="entity-title">${entity.title}</span></li>
                <li><i class="fas fa-edit"></i><b> Writer</b>: <span id="entity-writer">${entity.writer}</span></li>
                <li><i class="fas fa-edit"></i><b> Publish Date</b>: <span id="entity-publish_date">${entity.publish_date}</span></li>
              </ul>
            </div>
            <div class="buttons">
              <button id="delete-btn">Delete</button>
            </div>
          </div>`
        ).join('');

        document.getElementById('entries-container').classList.add("entries-container-show");
      }).catch((err) => console.error(err));
  };


  const addBookForm = document.getElementById('add-book-form');
  addBookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const writer = document.getElementById('writer').value;
    const publish_date = document.getElementById('publish_date').value;

    fetch('http://localhost:1337/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, writer, publish_date })
    }).then((response) => {
      addBookForm.reset();
      return response.json();
    }).catch((err) => console.error(err));
  });


  document.addEventListener( "click", (event) => {
    const element = event.target;
    if(element.tagName == 'BUTTON' && element.id == 'delete-btn'){
      const id = element.parentElement.previousElementSibling.querySelector('#entityID').textContent.slice(5);
      const elementParent = element.parentElement.parentElement;

      fetch(`http://localhost:1337/api/books/${id}`, {
        method: 'DELETE',
      }).then(() => {
        elementParent.remove();
      }).catch((err) => console.error(err));
    }
  });


  document.addEventListener( "click", (event) => {
    const element = event.target;
    let isBooks;
    if (element.parentElement) {
      isBooks = element.parentElement.parentElement.classList.value === 'books';
    }
    
    if(element.tagName == "I" && element.className == "fas fa-edit" && isBooks) {
      const id = element.parentElement.parentElement.querySelector('#entityID').textContent.slice(5);
      
      const selectedElement = element.parentElement.querySelector('span');
      selectedElement.setAttribute("contenteditable", "true");
      selectedElement.classList.add("editor");

      const button = document.createElement("button");
      button.innerHTML = "Save";
      selectedElement.after(button);

      let title = document.getElementById("entity-title").innerText;
      let writer = document.getElementById("entity-writer").innerText;
      let publish_date = document.getElementById("entity-publish_date").innerText;

      button.addEventListener( "click", (event) => {
        if (event.target.previousElementSibling.id === 'entity-title') {
          title = selectedElement.innerText;
        }
        if (event.target.previousElementSibling.id === 'entity-writer') {
          writer = selectedElement.innerText;
        }
        if (event.target.previousElementSibling.id === 'entity-publish_date') {
          publish_date = selectedElement.innerText;
        }

        fetch(`http://localhost:1337/api/books/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, writer, publish_date })
        }).then(() => {
          button.remove();
        }).catch((err) => console.error(err));
      });  
    }
  });


  document.getElementById('customers').onclick = (event) => {
    event.preventDefault();
    fetch('http://localhost:1337/api/customers')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.getElementById('entries-container').innerHTML = data.map((entity, index) => 
          `<div class="entity-content">
            <div>
              <h2>Customer ${index + 1}</h2>
              <ul class="customers">
                <li id="entityID"><b> ID:</b>${entity._id}</span></li>
                <li><i class="fas fa-edit"></i><b> First Name:</b><span id="entity-first_name"> ${entity.first_name}</span></li>
                <li><i class="fas fa-edit"></i><b> Last Name</b> <span id="entity-last_name">: ${entity.last_name}</span></li>
                <li><i class="fas fa-edit"></i><b> Email</b> <span id="entity-email">: ${entity.email}</span></li>
                <li><i class="fas fa-edit"></i><b> Phone</b> <span id="entity-phone">: ${entity.phone}</span></li>
                <li><i class="fas fa-edit"></i><b> Address</b> <span id="entity-address">: ${entity.address}</span></li>
                <li><i class="fas fa-edit"></i><b> Postal code</b> <span id="entity-postal_code">: ${entity.postal_code}</span></li>
                <li><i class="fas fa-edit"></i><b> City</b> <span id="entity-city">: ${entity.city}</span></li>
                <li><i class="fas fa-edit"></i><b> Subscribe Date</b> <span id="entity-subscribe_date">: ${entity.subscribe_date}</span></li>
              </ul>
            </div>
            <div class="buttons">
              <button id="delete-btn">Delete</button>
            </div>
          </div>`
        ).join('');

        document.getElementById('entries-container').classList.add("entries-container-show");
      }).catch((err) => console.error(err));
  };

  const addCustomerForm = document.getElementById('add-customer-form');
  addCustomerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const postalCode = document.getElementById('postal_code').value;
    const city = document.getElementById('city').value;

    fetch('http://localhost:1337/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        first_name: firstName, 
        last_name: lastName, 
        email, 
        phone, 
        address, 
        postal_code: postalCode, 
        city 
      })
    }).then((response) => {
      addCustomerForm.reset();
      return response.json();
    }).catch((err) => console.error(err));
  });


  document.addEventListener( "click", (event) => {
    const element = event.target;
    if(element.tagName == 'BUTTON' && element.id == 'delete-btn'){
      const id = element.parentElement.previousElementSibling.querySelector('#entityID').textContent.slice(4);
      const elementParent = element.parentElement.parentElement;

      fetch(`http://localhost:1337/api/customers/${id}`, {
        method: 'DELETE',
      }).then(() => {
        elementParent.remove();
      }).catch((err) => console.error(err));
    }
  });

  document.addEventListener( "click", (event) => {
    const element = event.target;
    let isCustomers;
    if (element.parentElement) {
      isCustomers = element.parentElement.parentElement.classList.value === 'customers';
    }

    if(element.tagName == "I" && element.className == "fas fa-edit" && isCustomers) {
      const id = element.parentElement.parentElement.querySelector('#entityID').textContent.slice(4);
      console.log(id);

      const selectedElement = element.parentElement.querySelector('span');
      selectedElement.setAttribute("contenteditable", "true");
      selectedElement.classList.add("editor");

      const button = document.createElement("button");
      button.innerHTML = "Save";
      selectedElement.after(button);

      let first_name = document.getElementById("entity-first_name").innerText;
      let last_name = document.getElementById("entity-last_name").innerText;
      let email = document.getElementById("entity-email").innerText;
      let phone = document.getElementById('entity-phone').innerText;
      let address = document.getElementById('entity-address').innerText;
      let postal_code = document.getElementById('entity-postal_code').innerText;
      let city = document.getElementById('entity-city').innerText;
      let subscribe_date = document.getElementById('entity-subscribe_date').innerText;

      button.addEventListener( "click", (event) => {
        if (event.target.previousElementSibling.id === 'entity-first_name') {
          first_name = selectedElement.innerText;
        }
        if (event.target.previousElementSibling.id === 'entity-last_name') {
          last_name = selectedElement.innerText;
        }
        if (event.target.previousElementSibling.id === 'entity-email') {
          email = selectedElement.innerText;
        }
        if (event.target.previousElementSibling.id === 'entity-phone') {
          phone = selectedElement.innerText;
        }
        if (event.target.previousElementSibling.id === 'entity-address') {
          address = selectedElement.innerText;
        }
        if (event.target.previousElementSibling.id === 'entity-postal_code') {
          postal_code = selectedElement.innerText;
        }
        if (event.target.previousElementSibling.id === 'entity-city') {
          city = selectedElement.innerText;
        }
        if (event.target.previousElementSibling.id === 'entity-subscribe_date') {
          subscribe_date = selectedElement.innerText;
        }

        fetch(`http://localhost:1337/api/customers/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ first_name, last_name, email, phone, address, postal_code, city, subscribe_date })
        }).then(() => {
          button.remove();
        }).catch((err) => console.error(err));
      });  
    }
  });


  document.getElementById('invoices').onclick = (event) => {
    event.preventDefault();
    fetch('http://localhost:1337/api/invoices')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.getElementById('entries-container').innerHTML = data.map((entity, index) => 
          `<div class="entity-content">
            <div>
              <h2>Invoice ${index + 1}</h2>
              <ul class="invoices">
                <li id="entityID"><b>ID:</b> ${entity._id}</li>
                <li><i class="fas fa-edit"></i><b> Invoice Number:</b> <span id="entity-number"> ${entity.number}</li></span>
                <li><i class="fas fa-edit"></i><b> Date</b> <span id="entity-date">: ${entity.date}</li></span>
                <li><i class="fas fa-edit"></i><b> Total Price</b> <span id="entity-total_price">: ${entity.total_price} $</li></span>
                <li><i class="fas fa-edit"></i><b> Items</b> <span id="entity-items">: ${entity.items}</li></span>
              </ul>
            </div>
            <div class="buttons">
              <button id="delete-btn">Delete</button>
            </div>
          </div>`
        ).join('');

        document.getElementById('entries-container').classList.add("entries-container-show");
      }).catch((err) => console.error(err));
  };


  const addInvoiceForm = document.getElementById('add-invoice-form');
  addInvoiceForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const invoiceNumber = document.getElementById('invoice_number').value;
    const date = document.getElementById('date').value;
    const totalPrice = document.getElementById('total_price').value;
    const items = document.getElementById('items').value;

    fetch('http://localhost:1337/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        number: invoiceNumber,
        date,
        total_price: totalPrice, 
        items
      })
    }).then((response) => {
      addInvoiceForm.reset();
      return response.json();
    }).catch((err) => console.error(err));
  });


  document.addEventListener( "click", (event) => {
    const element = event.target;
    if(element.tagName == 'BUTTON' && element.id == 'delete-btn'){
      const id = element.parentElement.previousElementSibling.querySelector('#entityID').textContent.slice(4);
      const elementParent = element.parentElement.parentElement;

      fetch(`http://localhost:1337/api/invoices/${id}`, {
        method: 'DELETE',
      }).then(() => {
        elementParent.remove();
      }).catch((err) => console.error(err));
    }
  });


  document.addEventListener( "click", (event) => {
    const element = event.target;
    let isInvoices;
    if (element.parentElement) {
      isInvoices = element.parentElement.parentElement.classList.value === 'invoices';
    }

    if(element.tagName == "I" && element.className == "fas fa-edit" && isInvoices) {
      const id = element.parentElement.parentElement.querySelector('#entityID').textContent.slice(4);
      
      const selectedElement = element.parentElement.querySelector('span');
      selectedElement.setAttribute("contenteditable", "true");
      selectedElement.classList.add("editor");

      const button = document.createElement("button");
      button.innerHTML = "Save";
      selectedElement.after(button);

      let number = document.getElementById("entity-number").innerText;
      let date = document.getElementById("entity-date").innerText;
      let total_price = document.getElementById("entity-total_price").innerText;
      let items = document.getElementById("entity-items").innerText;

      button.addEventListener( "click", (event) => {
        if (event.target.previousElementSibling.id === 'entity-number') {
          number = selectedElement.innerText;
        }
        if (event.target.previousElementSibling.id === 'entity-date') {
          date = selectedElement.innerText;
        }
        if (event.target.previousElementSibling.id === 'entity-total_price') {
          total_price = selectedElement.innerText;
        }
        if (event.target.previousElementSibling.id === 'entity-items') {
          items = selectedElement.innerText;
        }

        fetch(`http://localhost:1337/api/invoices/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ number, date, total_price, items })
        }).then(() => {
          button.remove();
        }).catch((err) => console.error(err));
      });  
    }
  });
});
