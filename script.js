const frm = document.querySelector('.formEle');
const outer = document.querySelector('.container');
document.querySelector('.subContainer').remove();

function getUser() {

  const userVal = document.getElementById('searchUser').value;
  // fetch(gitURL/)
  fetch("https://api.github.com/users/" + userVal, {
      method: "GET"
    })
    .then((data) => data.json())
    .then((users) => {
      frm.remove(); //removing the form after search

      const userContainer = document.createElement("div");
      userContainer.className = "subContainer";

      const userContainer1 = document.createElement("div");
      userContainer1.className = "subContainer1";

      console.log(`${users.avatar_url}, ${users.bio}, ${users.name}`);

      userContainer1.innerHTML = `
        <a href="${users.html_url}" target="_blank" ><img src="${users.avatar_url}" alt="User" class="avatar"></a>`;


      const userContainer2 = document.createElement("div");
      userContainer2.className = "subContainer2";

      userContainer2.innerHTML = `
        <h3 class="name">${users.name}</h3><br>
        <p class="bio">${users.bio}</p>
        <!-- <a href="https://api.github.com/repos/${userVal}" target="_blank"><p>List of Repos of ${users.name}</p></a> -->
         `;

      userContainer.append(userContainer1, userContainer2);
      outer.appendChild(userContainer);

      const userContainer3 = document.createElement('div');
      userContainer3.className = "subContainer3";


      fetch("https://api.github.com/users/" + userVal + "/repos", {
          method: "GET"
        })
        .then((users) => users.json())
        .then(data => {
          console.log(data)

          data.forEach((ele) => {
            const repoDiv = document.createElement('div');
            repoDiv.className = "repoDivClass"

            const repoEle = document.createElement('a');
            repoEle.href = ele.html_url;
            repoEle.target = "_blank";
            repoEle.className = "repoElems"

            const listItem = document.createElement('li');
            listItem.innerText = ele.name;

            const listBtn = document.createElement('button');
            listBtn.className = "listBtnClass btn btn-danger";
            listBtn.onclick = function() {
              repoFiles()
            };

            const listFile = document.createElement('i');
            listFile.className = "far fa-file";
            listBtn.appendChild(listFile);

            repoEle.append(listItem);
            repoDiv.append(repoEle, listBtn);
            userContainer3.append(repoDiv);
            outer.appendChild(userContainer3);

            function repoFiles() {
              console.log("Hellow");
              console.log(data)
              userContainer3.innerHTML = "";

              data.forEach((ele) => {
                fetch("https://api.github.com/repos" + userVal + ele.name + "/contents", {
                    method: "GET"
                  })
                  .then((data) => data.json())
                  .then((users) => {

                    console.log(ele.name)
                    const listItem = document.createElement('li');
                    listItem.innerText = ele.name;
                    listItem.className = "repoFiles"
                    userContainer3.appendChild(listItem);
                  })
              })
            }
            outer.appendChild(userContainer3);
          })
        })
    })
}
