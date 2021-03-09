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
              devoured: newDevour,
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

  if (createDevourBtn) {
    createDevourBtn.addEventListener('submit', (e) => {
      e.preventDefault();

      const newBurger = {
        burger_name: document.getElementById('ba').value.trim(),
        devoured: false,
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
});