//variable for request to be sent
textFile = new XMLHttpRequest();

function findWord()
{
    var results = document.getElementById("results");
    var searchText = document.getElementById("searchText");
    var word = searchText.value;

    //when something happens
    textFile.onreadystatechange=function()
    {
        //if request not loaded yet, but coming
        if (textFile.readyState==2 && textFile.status==200)
        {
            //display loader
            results.innerHTML="<img id='ajax-loader' src='files/ajax-loader.gif'></img>";
        }
        //if request loaded
        if (textFile.readyState==4 && textFile.status==200)
        {
            //split text file into array of words
            var text = textFile.responseText.split("\n");
            var yes = false;
            //binary search
            var lower = 0;
            var upper = text.length-1;
            while(lower < upper)
            {
                var mid = Math.round((upper+lower)/2);

                if(word.localeCompare(text[mid]) > 0)
                    lower = mid+1;
                    
                else if(word.localeCompare(text[mid]) < 0)
                    upper = mid-1;
            }

            if (text[mid].trim() == word || text[mid-1].trim() == word || text[mid+1].trim() == word)
                results.innerHTML = "<h1 style='color:green;'>YES! </h1>"+word+" is a valid word.";
            else
                results.innerHTML = "<h1 style='color:red;'>No! </h1>"+word+" is not a valid word.";
        }
    }
    //open text file
    textFile.open("GET","files/words.txt",true);
    textFile.send();
}