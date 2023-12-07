
const toggle_filters = document.getElementById('toggle-filters')
const mobile_filters = document.getElementById('mobile-filter')

let filter_click = true
const filters = {true:'block',false:'none'}

toggle_filters.addEventListener('click',()=>{
  mobile_filters.style.display = filters[filter_click]
  filter_click = !filter_click
})