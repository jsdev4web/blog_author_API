
const url = 'http://127.0.0.1:3000'
console.log(url)


// this is grabbing all of my current post from the server as a test
fetch(url)
    .then(response => response.json())
    .then(data => {
        a = data;
        console.log(a)
        
        let myDiv = document.createElement("div")
        console.log(myDiv)
        document.body.append(myDiv)

        Object.keys(a).forEach(item => {
            let list = document.createElement("div")
            let space = document.createElement("br")
            list.innerHTML = ` ${item}: ${a[item]}`
            console.log(list)
            myDiv.appendChild(space)
            myDiv.appendChild(list)
        });

        
        //myDiv.innerHTML = JSON.stringify(a)
    })
    .catch(error => console.log(error))
    

    const myButton = document.getElementById('myLink')
    let tokenData;
  

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
    

    //this code handles the for data fetch call
    const myForm = document.getElementById('myAuthForm').addEventListener('submit', function(event){
        event.preventDefault();

        let title = document.getElementById("title").value
        let content = document.getElementById("content").value
        let published = document.getElementById("published").value

        console.log(title, content, published)

       const formData = new FormData(myForm)

       //the secret key and token are connected.
       //console.log(tokenData.token)
       const myToken = tokenData.token
       console.log(myToken)

       // let urlTwo = 'http://127.0.0.1:3000/posts/2';
       let urlTwo = 'http://127.0.0.1:3000/posts';
        fetch(urlTwo, {
            method: 'POST',
            credentials: 'omit',
            mode: "cors",
            headers: { 'Authorization': myToken, 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
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
    })
