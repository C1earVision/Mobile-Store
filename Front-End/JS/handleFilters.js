{/* <div>
  <input type="radio" class="company" value="samsung" name="filter">
  <label>Samsung</label>
</div> */}

const toggle_filters = document.getElementById('toggle-filters')
const mobile_filters = document.getElementById('mobile-filter')

const filter_form = document.getElementById('filter-form')
const insert_before = document.getElementById('insert-before')

let filter_click = true
const filters = {true:'block',false:'none'}

toggle_filters.addEventListener('click',()=>{
  mobile_filters.style.display = filters[filter_click]
  filter_click = !filter_click
})


async function displayCompanys(){
  var urlParams = new URLSearchParams(window.location.search);
  const used = Boolean(urlParams.get('used'))
  const data = await axios.get(`https://mobilestoreapi-eo3f.onrender.com/api/v1/products?used=${used}`)
  const companies = []
  let uniqueCompanies = []
  data.data.products.map((product)=>{
    const {company} = product
    companies.push(company)
    uniqueCompanies = [...new Set(companies)]
  })
  uniqueCompanies.map((company)=>{
    const company_div = document.createElement('div')
    company_div.innerHTML = `  
    <input type="radio" class="company" value="${company}" name="filter">
    <label>${company.toUpperCase()}</label>`
    filter_form.insertBefore(company_div, insert_before)
  })
}

displayCompanys()
