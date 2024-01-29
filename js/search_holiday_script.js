let inputCountryCode = document.querySelector('#inputCountryCode')
let inputYear = document.querySelector('#inputYear')
let search_button = document.querySelector('#search-button')
let longWeekend_list = document.querySelector('#longweekend-list')
let display_long = document.querySelector('#display-long')
let date_display = document.querySelector('.date-display')
let search_event = document.querySelector('#search-event')
let public_holiday = document.querySelector('.public-holiday')

//Current date
const currentDate = new Date()
console.log(currentDate.toUTCString())
date_display.innerHTML = `<p> Date :: ${currentDate.toDateString()}  (Local) </p>
                          <p> Time :: ${currentDate.toTimeString()}  (Local) </p>
                            `

loadCountriesList()


// On list change event change country and loaded on the input field   
dynamicCountryList.addEventListener('change',()=> {
    inputCountryCode.value =  dynamicCountryList.value
    })

search_button.addEventListener('click',()=> {
    loadCountryProfile()
    // load_longweekend()
})

search_event.addEventListener('click',()=> {

    load_longweekend()
    load_publicHoliday()
})

async function loadCountryProfile(){

    //https://www.youtube.com/watch?v=zUcc4vW-jsI

    let response = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${inputCountryCode.value}`)
    // let countryProfile = response.
    //console.log(response.data)
  
    let country_profile = document.querySelector('.country-profile')
    country_profile.innerHTML =    `<p> <span class="font-p" >Name : </span>${response.data.commonName}</p>
                                    <p> <span class="font-p" >Official Name : </span> ${response.data.officialName}</p>
                                    <p> <span class="font-p" >Region : </span> ${response.data.region}</p>
                                    <p> <span class="font-p" >Borders : </span> Total of ${response.data.borders.length} border(s) is/are given in below table</p>
                                    `
    //console.log(response.data.borders.length)
    let borders_list = response.data.borders
    //console.log(`[][] =>> ${response.data.borders[1].commonName}`)
    if (response.data.borders.length > 0){
        
        let country_borders = document.querySelector('.country-borders')
        // <input id="inputCountryCode" value="" placeholder="Enter the country code here !">
        createDynamicTable(['Country Name','Country Code', 'Official Name','Region'],borders_list,'.country-profile')

       
    } 

}

async function load_publicHoliday(){


    let response = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${inputYear.value}/${inputCountryCode.value}`)
    // console.log(response)
    let listofPublicHoliday = [response.data]
    // public_holiday.innerHTML 
    let data_list=''
    listofPublicHoliday.map((element) => {
        data_list = `

                    `
    })


}

async function load_longweekend(){

    let response = await axios.get(`https://date.nager.at/api/v3/LongWeekend/${inputYear.value}/${inputCountryCode.value}`)
    //console.log(response.data)
    let listofLoogWeekend = [response.data]
    console.log(listofLoogWeekend)
    let data_list =''
    // display_long.innerHTML = `<div><h3>${'Long Weekend'}</h3></div>`
    listofLoogWeekend[0].map((element)=>{
    data_list += `<ul dir="ul-long">
                <li class="li-long">Days Count : ${element.dayCount} </li>
                <li class="li-long">Start Date : ${element.startDate} </li>
                <li class="li-long">End Date : ${element.endDate}</li>
                </ul>
                `
    })
    // console.log(data_list)
    longWeekend_list.innerHTML = data_list
        


}

async function createDynamicTable(table_Header,tableData,getElement){
    //Table Header

    //Create table element
    const dynamic_Table = document.createElement('table')

    //Create table row element
    const dynamic_TH_Row = document.createElement('tr')

    //Adding table header
    for (let i=0;i<table_Header.length;i++){
         //Create table header element
        const dynamic_T_Header = document.createElement('th')

        dynamic_T_Header.textContent = table_Header[i]
        dynamic_TH_Row.appendChild(dynamic_T_Header)
    }
   dynamic_Table.appendChild(dynamic_TH_Row)

   //Create rows with data
   for(let j=0;j<tableData.length;j++){
    //console.log(`Table length : ${tableData.length}`)
        const t_row = document.createElement('tr')

            
            const table_data_1 = document.createElement('td')
            table_data_1.textContent = tableData[j].commonName
            t_row.appendChild(table_data_1) 

            const table_data_2 = document.createElement('td')           
            table_data_2.textContent = tableData[j].officialName
            t_row.appendChild(table_data_2)

            const table_data_3 = document.createElement('td')
            table_data_3.textContent = tableData[j].countryCode
            t_row.appendChild(table_data_3)

            const table_data_4 = document.createElement('td')
            table_data_4.textContent = tableData[j].region
            t_row.appendChild(table_data_4)

        dynamic_Table.appendChild(t_row)
   }


    document.querySelector(getElement).appendChild(dynamic_Table)


}

// Load all the countries with their code on page loading

async function loadCountriesList(){
    
    let dynamicCountryList = document.querySelector('#dynamicCountryList')

    let response = await axios.get('https://date.nager.at/api/v3/AvailableCountries')

    //console.log(response.data)

    let listOfCodes_n_Countries = [response.data]

    //console.log(listOfCodes_n_Countries[0])
    
    for(let i=0;i<listOfCodes_n_Countries[0].length;i++ )
    {
        let optionalElement = document.createElement('option')
        //console.log(` Name : ${listOfCodes_n_Countries[0][i].name} Code : ${listOfCodes_n_Countries[0][i].countryCode}  `)
        optionalElement.value =`${listOfCodes_n_Countries[0][i].countryCode}`
        optionalElement.text =`${listOfCodes_n_Countries[0][i].name}`
        dynamicCountryList.appendChild(optionalElement)


    }

}


// https://www.youtube.com/watch?v=m_vL25vzpiE