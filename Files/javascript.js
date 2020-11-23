var flag1 = false;
var flag2 = false;
function main()
{
    var APIkey;
    APIkey = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname.value + "&appid=e940f6acb08573926ccbb6e3c7718d9f";
    putCityData(APIkey);
    flag1 = true;
}
function defaultFunc()
{
    var cities = new Array("peshawar","quetta","islamabad","karachi","lahore");
    var i = 0;
    var city;
    while(i < 5)
    {
        city = "http://api.openweathermap.org/data/2.5/weather?q=" + cities[i] + "&appid=e940f6acb08573926ccbb6e3c7718d9f";
        putCityData(city);
        i++;
    }
}
function  putCityData(toSearch)
{
    var doc;
    doc = new XMLHttpRequest();
    doc.open('GET', toSearch , true);
    doc.onload = function()
    {
        var gotData;
        gotData = JSON.parse(this.response);
        console.log(gotData);
        if(gotData.cod == 200)
        {
            $(document).ready(function()
            {
                $("#inputError").hide();
                $("#weathertable").show();
            });
            flag2 = true;
        }
        if(gotData.cod == 404)
        {
            $(document).ready(function()
            {
                $("#weathertable").toggle(300);
                document.getElementById("inputError").innerHTML='Error !! Invalid Input.';
                $("#inputError").show();
            });
            flag2 = false;
        }
        if(flag2 == true && flag1 == true)
        {
            searchedCity();
        }
        gotData.main.temp = gotData.main.temp - 273.15;
        var tableRowData = "<tr><td>" + gotData.name + "</td><td>" + gotData.weather[0].main + "</td><td>" + gotData.wind.speed + "</td><td>" + gotData.main.humidity + "</td><td>" + Math.ceil(gotData.main.temp) + ' ⁰C' + "</td></tr>";
        $('#weathertable').append(tableRowData);  
    }
    doc.send(); 
}
function searchedCity()
{
    var len = $("#weathertable tr").length;
    len--;
    while(len)
    {
        document.getElementById("weathertable").deleteRow(len); 
        len--;
    }
}
function headerAnimation()
{
    $("h1").animate({fontSize: '70px'}, 4500);
}