//ip address of the post API
const url = 'http://127.0.0.1:3000/posts/'
console.log(url)

//Fetch all the posts inerate the objects
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        let myDiv = document.createElement("div");
        let spacer = document.createElement("br");
        document.body.append(myDiv)
        const ul = document.createElement('ul');
        //list each object in this manner
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.setAttribute('id', 'liPost')

            listItem.innerHTML = `
            title: ${item.title}
            <br>
            content: ${item.content}<br>
            
            <a href="update.html?id=${item.id}"><button>Update</button><br><a/>
            <a href="delete.html?id=${item.id}"><button>Delete</button><br><a/>
            `
            //<a id="deleteBtn" href="http://127.0.0.1:3000/posts/delete/:${item.id}/"><button>Delete</button><a/>
            ul.append(listItem)
        })
        myDiv.appendChild(ul)
    })
    .catch(error => console.log(error))
    
    

    //makes a variable for the login button
    const myButton = document.getElementById('myLink')
    //create variable to grab the token data
    let tokenData;
    let updateToken;
  
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
                updateToken = tokenData.token
            })
            
    })
    

    //Post Create with Fetch call from index.html
    const myForm = document.getElementById('myForm')
    //listen to the submit click for create post
    myForm.addEventListener('submit', function(event){
        //prevents default submit behavior
        event.preventDefault();
        // i needed to initialize var for input below
        let published;
        //make sure form works
        console.log(myForm)
        //I am not using this but makes form submit into objects
       const formData = new FormData(myForm)
       console.log(formData)
        // test if the data is working correctly 
       console.log(formData.get('title'))
       console.log(formData.get('content'))
       console.log(formData.get('published'))
        // make the right variables so i can add variables in fetch data
       let title = formData.get('title');
       let content = formData.get('content')
       //let published = formData.get('published')
       published = (published === formData.get('published'))


       //the secret key and token are connected.
       const myToken = tokenData.token
       console.log(myToken)

          let urlTwo = 'http://127.0.0.1:3000/posts';
        fetch(urlTwo, {
            method: 'POST',
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
    })


