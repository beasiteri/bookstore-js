document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['interaction', 'dayGrid'],
  });

  calendar.render();

  if (calendarEl.childNodes.length !== 0) {
    const prevButton = document.querySelector('.fc-prev-button');
    const nextButton = document.querySelector('.fc-next-button');
    
    prevButton.addEventListener('click', () => addEvents());  
    nextButton.addEventListener('click', () => addEvents());

    addEvents();
  }
})

function addEvents() {
  fetch('http://localhost:1337/api/events')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const events = data.map((event) => {
      return {
        title: `${event.event_name}`,
        start: `${event.date.split('T')[0]}`,
        description: `${event.description}`,
        address: `${event.address}`,
        cityName: `${event.city_name}`,
        countryName: `${event.country_name}`,
      };
    });

    const days = document.querySelectorAll('.fc-content-skeleton thead td');
    const daysContent = document.querySelectorAll('.fc-content-skeleton tbody td');

    events.forEach((event) => {
      for (const [index, day] of days.entries()) {
        if (event.start === day.getAttribute('data-date')) {
          for (const [i, dayContent] of daysContent.entries()) {
            if (index === i) {
              dayContent.classList.add('event-container');
              dayContent.innerHTML = `
                <div class="event-content">
                  <p class="event-title">${event.title}</p>
                </div>
                <div id="modal-container" class="modal-container">
                  <div class="modal-content">
                    <p class="event-title">${event.title}</p>
                    <p class="event-date">${event.start}</p>
                    <p class="event-description">${event.description}</p>
                    <p class="event-address">${event.address}</br>
                    ${event.cityName}, ${event.countryName}</p>
                    <button id="close">Close</button>
                  </div>
                </div>`;
            }
          }
        }
      }
    });

    eventModal();
  })
  .catch((err) => console.error(err));
}

function eventModal() {
  const eventContent = document.querySelectorAll('.event-content');
  const skeletonElements = document.querySelectorAll('.fc-row .fc-content-skeleton');
  const dayGrid = document.querySelector('.fc-day-grid');
  const modalButtons = document.querySelectorAll('#close');

  eventContent.forEach((el) => {
    el.addEventListener('click', () => {
      el.parentElement.classList.add('show');
      el.nextElementSibling.style.display = 'block';
      dayGrid.classList.add('show'); 

      for (const skeletonElement of skeletonElements) {
        skeletonElement.classList.add('modifyLayer');
      }
    })
  })

  modalButtons.forEach((el) => {
    el.addEventListener('click', () => {
      const btnParent = el.closest('.modal-container');

      btnParent.style.display = 'none';
      btnParent.parentElement.classList.remove('show');
      dayGrid.classList.add('remove');

      for (const skeletonElement of skeletonElements) {
        skeletonElement.classList.remove('modifyLayer');
      }
    })
  })
}
