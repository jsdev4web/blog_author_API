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
    
//the index.html passes to the delete.html
//I made a delete form and has a fetch call to the server function



document.getElementById('myDeleteForm').addEventListener('submit', (event) => {
    event.preventDefault()
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); //used in the url
    console.log(id)
    const myToken = tokenData.token

         
        //how am i getting the id for the below postId
         let urlTwo = `http://127.0.0.1:3000/posts/delete/${id}`;
         console.log(urlTwo)
        fetch(urlTwo, {
            method: 'DELETE',
            credentials: 'omit',
            mode: "cors",
            headers: { 'Authorization': myToken, 'Content-Type': 'application/json' },
            //body: JSON.stringify(formData) was coming from formData
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

