const DayConditions = {
    
    getMonthName: (month) => {
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month];
    },

    isDay: (weatherKey) => {
        return (weatherKey.substr(weatherKey.length - 1) === 'd');
    },

    setWeatherSkyIcon: (weatherKey, theme = 'dark') => {
        let response = 'http://via.placeholder.com/50?text=No+data';

        switch(weatherKey) {
            case'01d':
                response = `/${theme}/sun.png`;
                break;
            case'01n':
                response = `/${theme}/moon.png`;
                break;
            case'02d':
                response = `/${theme}/half-sun.png`;
                break;
            case'02n':
                response = `/${theme}/half-moon.png`;
                break;
            case'03d': case'03n':
                response = `/${theme}/cloud.png`;            
                break;
            case'04d': case'04n':
                response = `/${theme}/full-cloud.png`;
                break;
            case'09d': case'09n':
                response = `/${theme}/little-rain.png`;                
                break;
            case'10d': case'10n':
                response = `/${theme}/rain.png`;                
                break;
            case'11d': case'11n':
                response = `/${theme}/lighting.png`;                
                break;
            case'13d': case'13n':
                response = `/${theme}/snow.png`;
                break;
            case'50d': case'50n':
                response = `/${theme}/mist.png`;            
                break;
            default:
                console.log(weatherKey)
                response = null
                break;
        }

        return response;
    }
}

export default DayConditions;