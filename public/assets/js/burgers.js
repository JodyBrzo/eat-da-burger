document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
  
    // UPDATE
    const changeDevourBtns = document.querySelectorAll('.change-devoured');

    if (changeDevourBtns) {
        changeDevourBtns.forEach((button) => {
          button.addEventListener('click', (e) => {
            // Grabs the id of the element that goes by the name, "id"
            const id = e.target.getAttribute('data-id');
            const newDevour = e.target.getAttribute('data-newburger');
    
            const newDevourState = {
              devour: newDevour,
            };
    
            fetch(`/api/burgers/${id}`, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
    
              body: JSON.stringify(newDevourState),
            }).then((response) => {
                if (response.ok) {
                console.log(`changed devoured to: ${newDevour}`);
                location.reload('/');
              } else {
                alert('something went wrong!');
              }
            });
          });
        });
      }
      const createDevourBtn = document.getElementById('create-form');

  if (createCatBtn) {
    createCatBtn.addEventListener('submit', (e) => {
      e.preventDefault();

      const newBurger = {
        burger_name: document.getElementById('ba').value.trim(),
        devour: document.getElementById('devoured').checked,
      };

      fetch('/api/burgers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(newBurger),
      }).then(() => {
        document.getElementById('ba').value = '';

        console.log('Created a new burger!');
        location.reload();
      });
    });
  }

  // DELETE
  const deleteBurgerBtns = document.querySelectorAll('.delete-burger');

  // Set up the event listeners for each delete button
  deleteBurgerBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');

      // Send the delete request
      fetch(`/api/burgers/${id}`, {
        method: 'DELETE',
      }).then((res) => {
        console.log(res);
        console.log(`Deleted burger: ${id}`);

        // Reload the page
        location.reload();
      });
    });
  });
  
});