// console.log('Hello, World!')

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

    let projectsWrapper = document.getElementById('projects-wrapper')
    
    for (let i = 0; projects.length > i; i++) {
        let project = projects[i]
        // console.log(project)

        // using backticks for template literals
        let projectCard = `
            <div>
                <p>${project.title}</p>
            </div>
        `
        // appending the content generated in the above loop to the HTML wrapper
        // in order to render out all the projects we get from the endpoint call
        projectsWrapper.innerHTML += projectCard
    }

}

getProjects()
