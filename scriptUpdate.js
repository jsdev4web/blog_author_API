
//makes a variable for the login button
    const myButton = document.getElementById('updateLogon')
    //create variable to grab the token data
    let tokenData;
  
    // Button listener to fetch login token data
    myButton.addEventListener('click', () => {
        const url = { site: "http://127.0.0.1:3000/posts/login" }
        console.log(url.site)

        fetch(url.site, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(url)
        })
            .then(res => res.json())
            .then(data => {
                tokenData = data
                console.log(tokenData.token)
            })
            
    })
    



document.getElementById('myUpdateForm').addEventListener('submit', (event) => {
    event.preventDefault()
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); //used in the url

    const myToken = tokenData.token
    const myUpdatedForm = document.getElementById('myUpdateForm')

        //I am not using this but makes form submit into objects
       const formData = new FormData(myUpdatedForm)  //my data needed    
       let title = formData.get('title');
       let content = formData.get('content')
       let published;
       published = (published === formData.get('published'))

        //how am i getting the id for the below postId
         let urlTwo = `http://127.0.0.1:3000/posts/update/${id}`;
         console.log(urlTwo)
        fetch(urlTwo, {
            method: 'PUT',
            credentials: 'omit',
            mode: "cors",
            headers: { 'Authorization': myToken, 'Content-Type': 'application/json' },
            //body: JSON.stringify(formData) was coming from formData
            body: JSON.stringify({ title: title, content: content, published: published })
        })
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error('Error:', error)); 
    


    window.location.href = 'index.html'; 
})


