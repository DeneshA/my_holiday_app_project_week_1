let inputCountryCode = document.querySelector('#inputCountryCode')
let inputYear = document.querySelector('#inputYear')
let search_button = document.querySelector('#search-button')
let longWeekend_list = document.querySelector('#longweekend-list')
let display_long = document.querySelector('#display-long')
let date_display = document.querySelector('.date-display')
let search_event = document.querySelector('#search-event')
let public_holiday = document.querySelector('.public-holiday')
let next_public_hiliday = document.querySelector('#next-public-hiliday')

//Current date
const currentDate = new Date()
//console.log(currentDate.toUTCString())
date_display.innerHTML = `<p> Date :: ${currentDate.toDateString()}  (Local) </p>
                          <p> Time :: ${currentDate.toTimeString()}  (Local) </p>
                            `

loadCountriesList()

// Coustomizing Public search
async function load_Next_Public_Holiday_Customize(){

    let response = await axios.get(`https://date.nager.at/api/v3/NextPublicHolidays/${inputCountryCode.value}`)
    console.log(response.data)
    let listofNextPublicHoliday = [response.data]
    let data_list = ''

    listofNextPublicHoliday[0].map((element) =>{
        data_list += `
                    <ul class="next-public"> 
                        <li> Date : ${element.date}</li>
                        <li> Local Name : ${element.localName}</li>
                        <li> Global Name : ${element.name}</li>
                        <li> Types : ${element.types}</li>                        
                    </ul>
                    `
    })
    
    next_public_hiliday.innerHTML = data_list

}


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
    // load_publicHoliday()
    load_Next_Public_Holiday_Customize()
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
        createDynamicTable(['Country Name', 'Official Name','Country Code','Region'],borders_list,'.country-profile')

       
    } 

}

async function load_publicHoliday(){


    let response = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${inputYear.value}/${inputCountryCode.value}`)
    //console.log(response.data)
    let listofPublicHoliday = response.data

    if(response.data.length > 0){
    // let table_header = ['Date','Local Name','Holiday','Counties','Types']
    createPublicHolidatTable(['Date','Local Name','Holiday','Counties','Types'],listofPublicHoliday,'.public-holiday')
    }
}


async function createPublicHolidatTable(table_Header,tableData,getElement){
 //Table Header
    
    // const publicHoliday_table= document.querySelector('.publicHoliday-table')
    // console.log(`existing  ${publicHoliday_table}`)
    // if(publicHoliday_table){
    //     publicHoliday_table.innerHTML=''
    //     return
    // }

    //Create table element
    // const dynamic_Table = document.createElement('table')
    const dynamic_Table = document.querySelector('.publicHoliday-table')

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
    
    //console.log(`tableData ${tableData}`)
   //Create rows with data
   for(let j=0;j<tableData.length;j++){
    //console.log(`Table length : ${tableData.length}`)
        const t_row = document.createElement('tr')

            
            const table_data_1 = document.createElement('td')
            table_data_1.textContent = tableData[j].date
            t_row.appendChild(table_data_1) 

            const table_data_2 = document.createElement('td')           
            table_data_2.textContent = tableData[j].localName
            t_row.appendChild(table_data_2)

            const table_data_3 = document.createElement('td')
            table_data_3.textContent = tableData[j].name
            t_row.appendChild(table_data_3)

            const table_data_4 = document.createElement('td')
            table_data_4.textContent = tableData[j].counties
            t_row.appendChild(table_data_4)

            const table_data_5 = document.createElement('td')
            table_data_5.textContent = tableData[j].types
            t_row.appendChild(table_data_5)

        dynamic_Table.appendChild(t_row)
   }

//    dynamic_Table.setAttribute('id','publicholiday-table')
   dynamic_Table.setAttribute('class','publicholiday-table')
    document.querySelector(getElement).appendChild(dynamic_Table)
    



}

async function load_longweekend(){

    let response = await axios.get(`https://date.nager.at/api/v3/LongWeekend/${inputYear.value}/${inputCountryCode.value}`)
    //console.log(response.data)
    let listofLoogWeekend = [response.data]
    //console.log(listofLoogWeekend)
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