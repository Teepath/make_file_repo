var token = process.env.GITHUB_KEY;

function myFunction() {
    let username = document.getElementById("search_term").value;
    const body = {
      query: `query {
    user(login:"Teepath" ){
      avatarUrl
      createdAt
      bio
      name
      
      email
      repositories(first: 20, orderBy:{field: CREATED_AT, direction:DESC}){
           edges{
            node{
              ... on Repository{
                name,
                id,
                owner{
                  login
                },
                stargazers{
                  totalCount
                },
                primaryLanguage {
                  name
                }
                description
                url
                pushedAt
                updatedAt
                forkCount
               
                
               
              }
            }
          }
      }
      
    }
  }
  `,
    };

    const baseUrl = "https://api.github.com/graphql";

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(baseUrl, JSON.stringify(body), {
        method: "POST",
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.data.user.avatarUrl);
        myLoadData(response.data.data);
 
      })
      .catch((err) => console.log(JSON.stringify(err)));
  
  
 
  
}

myFunction()


function getUserRepo(){
 
  // var token =process.env.GITHUB_TOKEN;
  let username = document.getElementById("search_term").value;

 
  const body = {
    query: `query {
    user(login:${username !== "" ? JSON.stringify(username) : "Teepath"} ){
      avatarUrl
      createdAt
      bio
      name
      
      email
      repositories(first: 20, orderBy:{field: CREATED_AT, direction:DESC}){
           edges{
            node{
              ... on Repository{
                name,
                id,
                owner{
                  login
                },
                stargazers{
                  totalCount
                },
                primaryLanguage {
                  name
                }
                description
                url
                pushedAt
                updatedAt
                forkCount
               
                
               
              }
            }
          }
      }
      
    }
  }
  `,


  }

  document.getElementById("display").innerHTML = "";
  const baseUrl = "https://api.github.com/graphql";

  const headers = {
    Authorization: `Bearer ${token}`
  };

  axios
    .post(baseUrl, JSON.stringify(body), {
      method: "POST",
      headers: headers,
    })
    .then((response) => {
      console.log(response.data.data.user.avatarUrl);
   
     myLoadData(response.data.data);
 
    })
    .catch((err) => console.log(JSON.stringify(err)));
  

}



const myLoadData = (data) => {

  const { avatarUrl, name, email, bio, createdAt, repositories } = data.user;
  document.getElementById("avatar").src = avatarUrl;
   document.getElementById("name").innerHTML = name;
  let alias = document.getElementById("search_term").value;
  document.getElementById("alias").innerHTML = alias;
  document.getElementById("bio").innerHTML = bio;
  document.getElementById("repo_total").innerHTML = repositories.edges.length;


 

    
  appendToDOM(repositories.edges);
  
   
}




const appendToDOM = (res) => {
  const display = document.getElementById('display');
console.log(res)
  res.map(({ node }) => {
   
    const li = document.createElement('LI');
    li.style.width = "100%";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.borderBottom = " 1px solid grey";
    li.id = node.url;
  
    li.append(createDiv(node), buttonTag());
    document.getElementById("display").appendChild(li)
 
  });

 
};


const createTag = (node) => {
  const div = document.createElement('div');
  div.style.width = "100%";
  div.style.display = "flex";
  div.style.justifyContent = "space-around";
  div.style.alignItems = "center";
  
  div.appendChild(updateAt(node));

  return div;
  
}

const updateAt = (node) => {
  const span = document.createElement('span');
  span.innerHTML = `updated at ${new Date(node.updatedAt)}`;
  return span;
}

const lang = (node) => {
   const em = document.createElement('em');
  // em.setAttribute("class", "fas fa-circle");
  em.innerHTML = node.primaryLanguage.name;
  return em;
}




const createDiv = (node) => {

  // li.appendChild(mainInfo)
  const div = document.createElement('div');
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.justifyContent = "space-around";
  div.style.alignItems = "flex-start";
  div.style.width = "80%";

  const repo_name = document.createElement('p');
  repo_name.style.color = "blue";
  repo_name.style.fontSize = "90%";
  repo_name.innerHTML = node.name;
  div.append(repo_name, createTag(node));
  // div.appendChild(createLi(node), buttonTag())
  return div;
}


const buttonTag = () => {
  const button = document.createElement('Button');
  button.style.display = "flex";
  button.style.justifyContent = " flex-end";
  button.style.height = "30px"
  buttonStar = document.createElement('em');
  buttonStar.setAttribute('class', "fas fa-star");
  button.innerHTML = "start";
  button.appendChild(buttonStar)
  return button;
}

const createEm = (node) => {
    const div = document.createElement('div');
  div.setAttribute("class", "fas fa-circle");
  div.innerHTML = node.primaryLanguage.name;
  return div;
}

















