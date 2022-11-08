// console.log('Hello, World!')

let loginButton = document.getElementById('login-button')
let logoutButton = document.getElementById('logout-button')

let token = localStorage.getItem('token')

if (token) {
    loginButton.remove()
} else {
    logoutButton.remove()
}

// delete the JWT (Jason Web Token) for access on logout
logoutButton.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    window.location = 'http://127.0.0.1:5500/login.html'
})


let projectsUrl = 'http://127.0.0.1:8000/api/projects/' // endpoint to call

let getProjects = () => {

    fetch(projectsUrl) // call the endpoint
    .then(response => response.json()) // convert the response to JSON data
    .then(data => {
        // console.log(data) // print the JSON data
        buildProjects(data)
    })

}

let buildProjects = (projects) => {

    let projectsWrapper = document.getElementById('projects--wrapper')
    // Clear the projects at each iterration and reloard them to reflect their standings after each vote
    // See line 81
    projectsWrapper.innerHTML = ''
    for (let i = 0; projects.length > i; i++) {
        let project = projects[i]
        // console.log(project)

        // using backticks for template literals
        let projectCard = `
            <div class="project--card">
                <!-- <p>${project.title}</p> -->

                <img src="http://127.0.0.1:8000${project.featured_image}" />

                <div>
                    <div class="card--header">
                        <h3>${project.title}</h3>
                        <!-- Using custom attributes: -->
                        <!-- data-vote="up" data-vote="down" data-project="${project.id}" -->
                        <strong class="vote--option" data-vote="up" data-project="${project.id}" >&#43;</strong>
                        <strong class="vote--option" data-vote="down" data-project="${project.id}" >&#8722;</strong>
                    </div>
                    <i>${project.vote_ratio}% Positive Feedback</i>
                    <p>${project.description.substring(0,150)}</p>
                </div>
                
            </div>
        `
        // appending the content generated in the above loop to the HTML wrapper
        // in order to render out all the projects we get from the endpoint call
        projectsWrapper.innerHTML += projectCard
    }

    // Add an Event Listener
    addVoteEvents()

}

let addVoteEvents = () => {
    let voteButtons = document.getElementsByClassName('vote--option')
    // console.log('VOTE BUTTONS:', voteButtons)

    for (let i = 0; voteButtons.length > i; i++) {
        voteButtons[i].addEventListener('click', (e) => {
            // console.log('Vote was clicked:', i)

            // Set the token in the browser's Application/Storage/Local Storage
            // by setting a token key (double click) and setting it's value
            // Note: this a temporary solution unti we set-up this up in the frontend, from the login form
            let token = localStorage.getItem('token')

            // What type of vote and for which project ?
            let vote = e.target.dataset.vote
            let project = e.target.dataset.project
            // console.log('PROJECT:', project, 'VOTE:', vote)

            fetch(`http://127.0.0.1:8000/api/projects/${project}/vote/`, {
                method: 'POST', 
                headers: {
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({'value':vote})
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
                // Refresh the projects list to reflect the vote ratio
                getProjects()
            })
        })
    }
}


getProjects()
