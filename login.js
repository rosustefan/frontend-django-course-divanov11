let form = document.getElementById('login-form')

form.addEventListener('submit', (e) => {
    // prevent the default behavior == page refresh on submit
    e.preventDefault()
    // console.log('Form was submitted')

    let formData = {
        'username': form.username.value,
        'password': form.password.value
    }
    // console.log('Form Data:', formData)

    // 1. send the form data to this url
    fetch('http://127.0.0.1:8000/api/users/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // 2. pass the data into the body
        body: JSON.stringify(formData)
    })
    // 3. and get the response
    .then(response => response.json())
    .then(data => {
        // console.log('DATA:', data.access)
        if(data.access) {
            // set the received token in the browser's Local Storage
            localStorage.setItem('token', data.access)
            // and then redirect to the projects list
            window.location = 'http://127.0.0.1:5500/projects-list.html'
        } else {
            alert('Username OR password did not work')
        }
    })
})