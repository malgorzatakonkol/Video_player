$(function () {
   console.log("DOM");

    var url = 'http://localhost:3000/movie';
    var ulElemen = $(".movie_list");
    var video = $(".video");


    function findMovie(inputVal) {
        var inputValue = inputVal;
        $.ajax({
            url: url,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            var tmp = response;
            var as=$(tmp).filter(function (i,n){
                if(n){
                    if(n.title){
                        if(n.title.toLowerCase().includes(inputValue)){
                            return n;
                        }
                    }
                    if(n.name){
                        if(n.name.toLowerCase().includes(inputValue)){
                            return n
                        }
                    }
                    if(n.description){
                        if(n.description.toLowerCase().includes(inputValue)){
                            return n
                        }
                    }
                }

                });
            console.log("as",as);
            showMovie(as);
        }).fail(function (error) {
            console.log(error);
        })
    }

    function showMovie(element) {
        for (var i=0; i<element.length; i++) {
            var nameText = element[i].name;
            var titleText = element[i].title;
            var desText = element[i].description;
            var movieUrl = element[i].url;



            console.log(nameText);
            console.log(titleText);
            console.log(desText);
            console.log(movieUrl);

            var newLi = $("<li>");
            newLi.attr("id", element[i].id);

            var newh3n = $("<h3>");
            newh3n.text(nameText);

            var newh3 = $("<h3>");
            newh3.text(titleText);

            var newSpan = $("<span>");
            newSpan.text(desText);


            var newDiv = $("<div>");

            // var openButton =$("<embed class='button' width=200 height=200>");
            // openButton.text("play");
            // openButton.attr("src", movieUrl);

            var openButton = $("<button>");
            openButton.text("odtwórz film");

            // var filmik = $("<embed class='button' width=200 height=200 hidden='true'>");
            // filmik.attr("src", movieUrl);




            newLi.append(newh3n);
            newLi.append(newh3);
            newLi.append(newSpan);
            newLi.append(openButton);
            // newLi.append(filmik);


            function test(button, url){ //stworzenie buttonu odtwórz film
                button.on("click", function(){
                    console.log("url", url);



                    var movie = $("<source class='movie' type='video/mp4'>");
                    movie.attr("src", url);

                    video.append(movie);

                    var playButton = $("<input class='play' type=button value='play'>");
                    var pausaButton = $("<input class='pausa' type=button value='pausa'>");
                    var stopButton= $("<input class='dtop' type=button value='stop'>");
                    var slowlyButton = $("<input class='slowly' type=button value='slowly'>");
                    var nextButton = $("<input class='next' type=button value='jedną klatkę dalej'>");
                    var backButton = $("<input class='back' type=button value='jedną klatkę wstecz'>");

                    newDiv.append(playButton);
                    newDiv.append(pausaButton);
                    newDiv.append(slowlyButton);
                    newDiv.append(stopButton);
                    newDiv.append(nextButton);
                    newDiv.append(backButton);


                    playButton.on("click", function () {
                        video.get(0).play();
                    });

                    pausaButton.on("click", function () {
                        video.get(0).pause()
                    });

                    stopButton.on("click", function () {
                        video.get(0).load()
                    });


                    slowlyButton.on("click", function () {
                        video.get(0).playbackRate = 5;
                    });



                    newLi.append(newDiv);
                    newLi.append(movie);

                    video.append(movie);
                })

            }

            test(openButton, movieUrl);



            // openButton.on("click", test)
                // function (test) {
            //
            //     console.log("too", movieUrl);
            //
            //     //
            //     var playButton = $("<input class='play' type=button value='play'>");
            //     var pausaButton = $("<input class='pausa' type=button value='pausa'>");
            //     var slowlyButton = $("<input class='slowly' type=button value='slowly'>");
            //
            //     newDiv.append(playButton);
            //     newDiv.append(pausaButton);
            //     newDiv.append(slowlyButton);
            //
            //     newLi.append(newDiv);
            //

            // });


            ulElemen.append(newLi);


            // ulElemen.append(video);

        }
    }

    var button = $(".find");
    var infoInput = $(".description");



    function addToList(e) {
        e.preventDefault();
        var text = infoInput.val().toLowerCase();
        findMovie(text);
    }

    button.on("click", addToList);


});