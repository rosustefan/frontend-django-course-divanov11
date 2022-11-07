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

    let projectsWrapper = document.getElementById('projects--wrapper')
    
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
                        <strong class="vote--option" >&#43;</strong>
                        <strong class="vote--option" >&#8722;</strong>
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

}

getProjects()
