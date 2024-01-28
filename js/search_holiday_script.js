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

    //https://www.youtube.com/watch?v=zUcc4vW-jsI

    let response = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${inputCountryCode.value}`)
    // let countryProfile = response.
    console.log(response.data)
  
    let country_profile = document.querySelector('.country-profile')
    country_profile.innerHTML =    `<p> <span class="font-p" >Name : </span>${response.data.commonName}</p>
                                    <p> <span class="font-p" >Official Name : </span> ${response.data.officialName}</p>
                                    <p> <span class="font-p" >Region : </span> ${response.data.region}</p>
                                    <p> <span class="font-p" >Borders : </span> All total ${response.data.borders.length} borders are given in below table</p>
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
    console.log(`Table length : ${tableData.length}`)
        const t_row = document.createElement('tr')

        // for(let k=0;k<table_Header.length;k++){
            //console.log(`Table Header length : ${table_Header.length}`)
            const table_data_1 = document.createElement('td')
            table_data_1.textContent = tableData[j].commonName
            // console.log(tableData[k].commonName)
            t_row.appendChild(table_data_1) 

            const table_data_2 = document.createElement('td')           
            table_data_2.textContent = tableData[j].officialName
            // console.log(tableData[k].officialName)
            t_row.appendChild(table_data_2)

            const table_data_3 = document.createElement('td')
            table_data_3.textContent = tableData[j].countryCode
            // console.log(tableData[k].countryCode)
            t_row.appendChild(table_data_3)

            const table_data_4 = document.createElement('td')
            table_data_4.textContent = tableData[j].region
            // console.log(tableData[k].region)
            t_row.appendChild(table_data_4)
        // }
        dynamic_Table.appendChild(t_row)
   }


    document.querySelector(getElement).appendChild(dynamic_Table)

    dynamic_Table.setAttribute('border','2')
}

/* /*
function displayDataAsTable(apiData) {
    // Assuming the keys of the first object represent table headers
    const headers = Object.keys(apiData[0]);

    // Create a table element
    const table = document.createElement('table');

    // Create a header row
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Create rows with data
    apiData.forEach(item => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header];
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    // Append the table to the container
    document.getElementById('apiDataContainer').appendChild(table);
// // } */ 
// }


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