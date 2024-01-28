let inputCountryCode = document.querySelector('#inputCountryCode')
let search_button = document.querySelector('#search-button')
loadCountriesList()


// On list change event change country and loaded on the input field   
dynamicCountryList.addEventListener('change',()=> {
    inputCountryCode.value =  dynamicCountryList.value
    })

search_button.addEventListener('click',()=> {
    loadCountryProfile()
})

async function loadCountryProfile(){

    let response = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${inputCountryCode.value}`)
    // let countryProfile = response.
    console.log(response.data)

}




// Load all the countries with their code on page loading

async function loadCountriesList(){
    
    let dynamicCountryList = document.querySelector('#dynamicCountryList')

    let response = await axios.get('https://date.nager.at/api/v3/AvailableCountries')

    //console.log(response.data)

    let listOfCodes_n_Countries = [response.data]

    console.log(listOfCodes_n_Countries[0])
    
    for(let i=0;i<listOfCodes_n_Countries[0].length;i++ )
    {
        let optionalElement = document.createElement('option')
        //console.log(` Name : ${listOfCodes_n_Countries[0][i].name} Code : ${listOfCodes_n_Countries[0][i].countryCode}  `)
        optionalElement.value =`${listOfCodes_n_Countries[0][i].countryCode}`
        optionalElement.text =`${listOfCodes_n_Countries[0][i].name}`
        dynamicCountryList.appendChild(optionalElement)


    }

}