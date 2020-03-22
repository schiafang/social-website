(function () {
  const baseUrl = "https://lighthouse-user-api.herokuapp.com/"
  const indexUrl = baseUrl + "api/v1/users/"
  const data = JSON.parse(localStorage.getItem('favoriteList')) || []
  const dataPanel = document.getElementById("data-panel")
  const userDetail = document.getElementById('user-detail')
  const pagination = document.getElementById('pagination')
  const previous = document.getElementById('previous')
  const next = document.getElementById('next')
  const perPageItem = 20
  const userModal = document.getElementById('show-user-modal')


  let pagNum = 1
  let paginationData = []
  let totalPages = 1

  displayDataList(data)

  //----- Listener -----//
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.card-img-top')) {
      showDetail(event.target.dataset.id)
    } else if (event.target.matches('.fa-times')) {
      removeFavoriteItem(event.target.dataset.id)
      displayDataList(data)
    }
  })

  userModal.addEventListener('click', (event) => {
    if (event.target.matches('.dislike-btn')) {
      removeFavoriteItem(event.target.dataset.id)
      displayDataList(data)
    }
  })

  pagination.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      getPageData(event.target.dataset.page)
    }
    pageNum = event.target.dataset.page
  })

  //----- Function -----//
  //show data in data-panel
  function displayDataList(data) {
    let htmlContent = ""
    data.forEach((item, index) => {
      htmlContent += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card mt-3 mb-3" style="border:none">
            <div class="card-body ${item.gender}-wrapper">
            <div class="text-right" id="delet"><i class="fa fa-times" data-id="${item.id}" aria-hidden="true"></i></div>
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
              <button type="button" class="dislike-btn btn btn-info" data-id="${data.id}" data-dismiss="modal">
            Remove Favorite
          </button>
            </div>
        </div>
       `
      userDetail.innerHTML = htmlContent
    })
  }

  function getTotalPages(data) {
    let totalPages = Math.ceil(data.length / perPageItem) || 1
    let pageItemContent = ''
    for (let i = 0; i < totalPages; i++) {
      pageItemContent += `
        <li class="page-item">
          <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
        </li>
      `
    }
    pagination.innerHTML += pageItemContent
  }

  function getPageData(pageNum, data) {
    paginationData = data || paginationData
    let offset = (pageNum - 1) * perPageItem
    let pageData = paginationData.slice(offset, offset + perPageItem)

    displayDataList(pageData)
  }

  function removeFavoriteItem(id) {
    const index = data.findIndex(data => data.id === Number(id))
    if (index === -1) return
    data.splice(index, 1)
    localStorage.setItem('favoriteList', JSON.stringify(data))
  }
})()