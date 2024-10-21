const cityName=document.getElementById("cityName");
const submitBtn=document.getElementById("submitBtn");
const city_name=document.getElementById("city_name");
const output=document.getElementById("output");
const temp_status=document.getElementById("temp_status");
const dataHide=document.getElementsByClassName("middle_layer")[0];
const day=document.getElementById("day");
const today_date=document.getElementById("today_date");

const dayArr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthArr=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

// function call

const getInfo=async(event)=>{
    event.preventDefault();
    let cityVal=cityName.value

    if(cityVal===""){
        city_name.innerText=`Please enter the city name before search`;
        dataHide.classList.add("data_hide");
    }
    else{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=0d4decbd59ab01d496da65fa3944e274`;
            const response=await fetch(url);
            const data=await response.json();
            
            // converting to array
            const dataArr=[data]
            city_name.innerText=`${dataArr[0].name} , ${dataArr[0].sys.country}`;
            output.innerText=dataArr[0].main.temp; 

            //Date and month
            let date = new Date();
            let Ddate = date.getDate();
            let month=date.getMonth();
            today_date.innerText=`${Ddate} ${monthArr[month]}`
            let Dday=date.getDay();
            day.innerText=`${dayArr[Dday]}`;

            // condition for sunny or cloudy image
            const tempMood=dataArr[0].weather[0].main;  
            
            if(tempMood=="Clear"){
                temp_status.innerHTML=`<i class="fas fa-sun" style="color:#eccc68;"></i>`;
            }
            else if(tempMood=="Clouds"){
                temp_status.innerHTML=`<i class="fas fa-cloud" style="color:#f1f2f6;"></i>`;
            }
            else if(tempMood=="Rain"){
                temp_status.innerHTML=`<i class="fas fa-cloud-rain" style="color:#a4b0be;"></i>`;
            }
            else{
                temp_status.innerHTML=`<i class="fas fa-sun" style="color:#eccc68;"></i>`;

            }
            dataHide.classList.remove("data_hide");


        }
        catch{
            city_name.innerText=`Please enter the correct city name`;
            dataHide.classList.add("data_hide");

        }
    }


}

// triggered when clicked on submit

submitBtn.addEventListener("click",getInfo)
