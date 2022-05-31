document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendar');

  fetch('http://localhost:1337/api/events')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const events = data.map((event) => {
      return {
        title: `${event.event_name}`,
        start: `${event.date}`
      };
    });

    const calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'interaction', 'dayGrid' ],
      defaultDate: new Date(),
      editable: true,
      eventLimit: true,
      events: events
    });
  
    calendar.render();
    return data;
  })
  .then((results) => {
    const selectedEvent = document.querySelector('.fc-content');
    const eventContent = document.createElement('span');
    
    selectedEvent.onclick = (event) => {
      event.preventDefault();
      selectedEvent.append(eventContent);
      selectedEvent.classList.add('event-content');

      const found = results.some((result) => {
        return result.event_name === event.target.innerHTML;
      });

      if (found) {
        results.map((result) => {
          if (result.event_name === event.target.innerHTML) {
            eventContent.innerHTML = `
              <p class="event-title">${result.event_name}</p>
              <p class="event-description">${result.description}</p>
              <p class="event-address">${result.address}</p>
              <p>${result.city_name}, ${result.country_name}</p>
            `;
          }
        });
      }

      selectedEvent.lastChild.onclick = () => {
        let child = selectedEvent.lastChild.lastElementChild; 
        while (child) {
          selectedEvent.lastChild.removeChild(child);
          child = selectedEvent.lastChild.lastElementChild;
        }
      }
    }
  })
  .catch((err) => console.error(err));
});


