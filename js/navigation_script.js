class standardHeader extends HTMLElement {
    pullStandardMenu(){
        this.innerHTML =`
        <img class="logo" src="#" alt="logo"> 
            <div class="logo-class"><span class="logo-name">Holiday App</span></div>
            <nav>
                <ul class="navigation-links">
                    <li><a href="/week3/my_holiday_app_project_week_1/search_holiday.html">Search Holidays</a></li>
                    <li><a href="#">Currency Exchange</a></li>
                    <li><a href="#">Weather Forcast</a></li>
                </ul>
            </nav>
        `
    }
}


// 
customElements.define('standard-header',standardHeader)

// https://css-tricks.com/the-simplest-ways-to-handle-html-includes/