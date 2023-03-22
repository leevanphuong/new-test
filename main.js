import getData from "./users.js";

const tbody =document.querySelector('tbody');

getData()
.then((response) => response.json())
.then((data)=>{
    showUser(data)
    const btnRemove = document.querySelectorAll('.btn-remove')
    for(let btn of btnRemove){
        const id =btn.dataset.id;
        btn.addEventListener('click',()=>{
            return removeUser(id)
            
        })
    }

    const btnupdate=document.querySelectorAll('.btn-update')
    for(let btn of btnupdate){
        const id =btn.dataset.id;
        btn.addEventListener('click',()=>{
            return update(id)
        })
    }
})

const showUser = (data)=>{
    tbody.innerHTML = data.map((user,index)=>{
        return `
        <tr>
        <td>${index +1}</td>
        <td>${user.name}</td>
        <td>
            <button data-id="${user.id}" class="btn-remove">Xoa</button>
            <button data-id="${user.id}" class="btn-update">Cap nhap</button>
        </td>
        </tr>
        `
    }).join('')
}

const removeUser =(id) =>{
    fetch(`http://localhost:3000/users/${id}`,{
        method : "DELETE"
    }
    )
}

const addUser =()=>{
    document.querySelector('body').innerHTML=`
        <form action="">
            <input type="text" id="userName"/>
            <button id="btn-submit">Them</button>
        </form>
    `
    document.querySelector('#btn-submit').addEventListener('click',()=>{
        const newUser ={
            "name" : document.querySelector('#userName').value
        }
        fetch('http://localhost:3000/users',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
    })
}
document.querySelector('#btn-add').addEventListener('click',addUser)

const update =(id)=>{
    fetch(`http://localhost:3000/users/${id}`)
    .then((response)=> response.json())
    .then((data)=>{
        document.querySelector('body').innerHTML=`
        <form action="">
            <input type="text" id="userName" value="${data.name}"/>
            <button id="btn-update">Sua</button>
        </form>
    `
    document.querySelector('#btn-update').addEventListener('click',()=>{
        const newUser ={
            "name" : document.querySelector('#userName').value
        }
        fetch(`http://localhost:3000/users/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
    })
    })
}