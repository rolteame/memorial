const dbApiLink = "https://memorial-db-rotimiadebiyi.harperdbcloud.com";

export const sendCondolence = () => {
  fetch(dbApiLink, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic cm9sdGVhbWU6U2FtdWVsQDIwNjg1"
    },
    body: JSON.stringify({
      "operation": "insert",
      "schema": "memorial_db",
      "table": "condolences",
      "records": [
        {
          fullName: document.getElementById("fullName").value,
          email: document.getElementById("email").value,
          condolence: document.getElementById("condolence").value,
          status: "Disapproved"
        }
      ]
    }),
    redirect: "follow"
  })
    .then((response) => response.text())
    .then((data) => {
      if(data === ' '){
        alert('Some fields are empty');
      }else {
          alert('Thanks you for your condolences');
          location.reload();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};


export const getData = async () => {
  // fetch(dbApiLink, {
  //   method: "POST", // or 'PUT'
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": "Basic cm9sdGVhbWU6U2FtdWVsQDIwNjg1"
  //   },
  //   body: JSON.stringify({
  //     "operation": "sql",
  //     "sql": "SELECT * from memorial_db.condolences",
  //   }),
  //   redirect: "follow"
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  try {
    const response =  await fetch(dbApiLink, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic cm9sdGVhbWU6U2FtdWVsQDIwNjg1"
      },
      body: JSON.stringify({
        "operation": "sql",
        "sql": "SELECT * from memorial_db.condolences",
      }),
      redirect: "follow"
      });
      const data = response.json();
      return data;
  } catch (error) {
      console.log(error);
  }
}

export const showCondolences = async () => {
  const showMessage = document.getElementById('showCondolences');
  const data = await getData();
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    // if(data[i].status == 'Approved') {
    //   showMessage.innerHTML += `
    //   <div class="card m-2" style="width: 18rem;">
    //     <div class="card-body">
    //     <p class="card-text text-dark">${data[i].condolence}</p>
    //     <h6 class="card-subtitle mb-2 text-muted text-end text-dark">${data[i].fullName}</h6>
    //   </div>
    //   `;
    // }else {
    //   showMessage.innerHTML = '<div class="text-light "><p>No Condolences to Show</p></div>';
    // }
    while (data[i].status === "Approved") {
      showMessage.innerHTML += `
        <div class="card m-2" style="width: 18rem;">
          <div class="card-body">
          <p class="card-text text-dark">${data[i].condolence}</p>
          <h6 class="card-subtitle mb-2 text-muted text-end text-dark">${data[i].fullName}</h6>
        </div>
        `;
    }
  }


}

