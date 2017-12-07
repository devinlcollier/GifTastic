var terms = ["cats", "dogs", "Star Wars", "The Avengers", "tacos", "pizza"];

function addButton(str)
{
	var btn = $("<button>");
	btn.text(str);
	btn.addClass("gifBtn btn btn-info");

	btn.on("click", gifBtnClick);

    $("#buttons").append(btn);
}

function gifBtnClick()
{
	addGif($(this).text());
}

function addGif(str) 
{
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + str + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
    }).done(function(response) 
    {
    	var results = response.data;
    	$("#gifs").empty();
    	for (var i = 0; i < results.length; i++) 
    	{
    		var gifDiv = $("<div>");
    		gifDiv.addClass("gif");
    		gifDiv.append($("<p>").text("Rating: " + results[i].rating));

    		var gif = $("<img>");
    		gif.attr("src", results[i].images.fixed_height_still.url);
    		gif.attr("data-still", results[i].images.fixed_height_still.url);
    		gif.attr("data-animate", results[i].images.fixed_height.url);
    		gif.attr("data-state", "still");
    		gif.on("click", gifPause);

    		gifDiv.append(gif);
    		$("#gifs").append(gifDiv);
    	}
	});
}

function gifPause() 
{
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

window.onload = function() 
{
    for (var i = 0; i < terms.length; i++) 
    {
        addButton(terms[i]);
    }

    $("#submitbtn").on("click", function() 
    {
    	event.preventDefault();
    	var str = $("#gifsearch").val().trim();
    	$("#gifsearch").val("");
    	if(str !== null && str !== "")
    	{
    		addButton(str);
    	}
    });
}