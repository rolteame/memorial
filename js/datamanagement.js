const dbApiLink = "https://memorial-db-rotimiadebiyi.harperdbcloud.com";

export const sendCondolence = () => {
  fetch(dbApiLink, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic cm9sdGVhbWU6U2FtdWVsQDIwNjg1",
    },
    body: JSON.stringify({
      operation: "insert",
      schema: "memorial_db",
      table: "condolences",
      records: [
        {
          fullName: document.getElementById("fullName").value,
          email: document.getElementById("email").value,
          condolence: document.getElementById("condolence").value,
          status: "Disapproved",
        },
      ],
    }),
    redirect: "follow",
  })
    .then((response) => response.text())
    .then(() => {
      
        alert("Thanks you for your condolences");
        location.reload();
      
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
    const response = await fetch(dbApiLink, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic cm9sdGVhbWU6U2FtdWVsQDIwNjg1",
      },
      body: JSON.stringify({
        operation: "sql",
        sql: "SELECT * from memorial_db.condolences",
      }),
      redirect: "follow",
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const showCondolences = async () => {
  const showMessage = document.getElementById("showCondolences");
  const data = await getData();
  showMessage.innerHTML = `
  <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th class="text-light" scope="col-1">#</th>
              <th class="text-light" scope="col">Name</th>
              <th class="text-light" scope="col">Condolence</th>
              <th class="text-light" scope="col"></th>
            </tr>
          </thead>
          <tbody id="inputContent">
          </tbody>
        </table>
      </div>
  `
  const tableContent = document.getElementById('inputContent');
  for (let i = 0; i < data.length; i++) {
    // if(data[i].status == 'Approved') {
    tableContent.innerHTML += `
            <tr>
              <th class="text-light " scope="row">${i + 1}</th>
              <td class="text-light">${data[i].fullName}</td>
              <td class="text-light text-truncate">${data[i].condolence}</td>
              <td class=" text-end"><a data-bs-toggle="modal" data-bs-target="#showFullCondolenceMessage" class="pe-auto text-light text-decoration-none">Read More</a></td>

              <!-- Modal -->
              <div class="modal fade" id="showFullCondolenceMessage" tabindex="-1" aria-labelledby="showFullCondolenceMessage" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="showFullCondolenceMessageLabel">Condolence Message</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body id="showMessageInModal">
                      <p class="fw-light ">${data[i].condolence}</p>
                      <p class="text-end">${data[i].fullName}</p>
                    </div>
                  </div>
                </div>
              </div>

            </tr>
            `;

            console.log(document.getElementById("showMessageInModal"))
    // }else {
    //   showMessage.innerHTML = '<div class="text-light "><p>No Condolences to Show</p></div>';
    // }
    // showMessage.innerHTML += `
    //   <div class="card m-2" style="width: 18rem;">
    //     <div class="card-body">
    //     <p class="card-text text-dark">${data[i].condolence}</p>
    //     <h6 class="card-subtitle mb-2 text-muted text-end text-dark">${data[i].fullName}</h6>
    //   </div>
    //   `;
  }
};
