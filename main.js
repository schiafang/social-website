(function () {
  const baseUrl = "https://lighthouse-user-api.herokuapp.com/"
  const indexUrl = baseUrl + "api/v1/users/"
  const data = []
  const dataPanel = document.getElementById("data-panel")
  const userDetail = document.getElementById('user-detail')


  ///////// Listener
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.card-img-top')) {
      showDetail(event.target.dataset.id)
    }
    if (event.target.classList.contains('fa-ban')) {
      console.log(event.target.parentElement.parentElement)
      let delet = event.target.parentElement.parentElement
      delet.remove()
    }
  })

  // userDetail.addEventListener('click', (event) => {
  //   if ((event.target.matches('btn'))) {
  //     userAvatar.src = ""
  //     console.log(event.target)
  //   }
  // })

  //show data in dataPanel
  axios
    .get(indexUrl)
    .then((response) => {
      data.push(...response.data.results)
      displayDataList(data)
    })
    .catch((error) => console.log(error))

  function displayDataList(data) {
    let htmlContent = ""
    data.forEach((item, index) => {
      htmlContent += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card mt-3 mb-3" style="border:none">
            <div class="card-body ${item.gender}-wrapper">
            <div class="text-right"><i class="fa fa-ban" aria-hidden="true"></i></div>
              <p class="card-title">${item.name}</p>
              <p class="card-subtitle text-black-50 text-uppercase">${item.region}</p>
              <p></p>
              <img class="card-img-top" data-id="${item.id}" data-toggle="modal" data-target="#show-user-modal" src="${item.avatar}" alt="Card image cap">
            </div>
          </div>
        </div>
      `
    })
    dataPanel.innerHTML = htmlContent
  }

  //show detail in Modal
  function showDetail(id) {
    const userUrl = indexUrl + id

    axios.get(userUrl).then((response) => {
      const data = response.data
      const userTitle = document.getElementById('show-user-title')
      userTitle.textContent = `${data.name} ${data.surname}`

      let htmlContent = ''
      htmlContent += `
        <div class="col-sm-8"></div>
            <div class="col-sm-12 ">
              <div class="d-flex justify-content-center"><img class="user-avatar" src="${data.avatar}" alt="Responsive image"></div>
              <p class="pt-4 ml-5"><i class="fa fa-${data.gender} fa-fw"></i><span class="ml-2">${data.age}</span></p>
              <p class=""><i class="ml-5 fa fa-birthday-cake fa-fw"></i><span class="ml-2">${data.birthday}</span></p>
              <p class=""><i class="ml-5 fa fa fa-map-marker fa-fw" style"text-color:#fff;"></i><span class="ml-2">${data.region}</span></p>
              <p class=""><i class="ml-5 fa fa-envelope fa-fw"></i><span class="ml-2">${data.email}</span></p>
            </div>
        </div>
       `
      userDetail.innerHTML = htmlContent
    })
  }
})()
