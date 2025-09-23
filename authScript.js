
document.getElementById('myForm').addEventListener('submit', function(event){
    event.preventDefault(); //prevents form from returning window

    formData = new FormData(event.target);

    const title = formData.get('title')
    const content = formData.get('content')
    const published = formData.get('published')

    console.log("title:", title)
    console.log("content:", content)
    console.log("published:", published)

    const dataObject = Object.fromEntries(formData.entries())
    console.log("Data as a Object:", dataObject)

})