$(function () {
    console.log("DOM");

    var url = 'https://my-json-server.typicode.com/malgorzatakonkol/odtwarzacz/movie';
    var mainDiv = $(".container");


    function findMovie(inputVal) {
        var inputValue = inputVal;
        $.ajax({
            url: url,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            var as;
            if (inputValue !== "" && inputValue !== " ") {
                var tmp = response;
                as = $(tmp).filter(function (i, n) {
                    if (n) {
                        if (n.title) {
                            if (n.title.toLowerCase().includes(inputValue)) {
                                return n;
                            }
                        }
                        if (n.name) {
                            if (n.name.toLowerCase().includes(inputValue)) {
                                return n
                            }
                        }
                        if (n.description) {
                            if (n.description.toLowerCase().includes(inputValue)) {
                                return n
                            }
                        }
                    }

                });
            }
            showMovie(as);
        }).fail(function (error) {
            console.log(error);
        })
    }

    function showMovie(element) {
        if (element && element.length > 0) {
            for (var i = 0; i < element.length; i++) {
                var nameText = element[i].name;
                var titleText = element[i].title;
                var desText = element[i].description;
                var movieUrl = element[i].url;


                console.log(nameText);
                console.log(titleText);
                console.log(desText);
                console.log(movieUrl);

                var newList = $("<ul>");

                var newLi = $("<li>");
                newLi.attr("id", element[i].id);

                var newh3n = $("<h3>");
                newh3n.text(nameText);

                var newh3 = $("<h3>");
                newh3.text(titleText);

                var newSpan = $("<span>");
                newSpan.text(desText);


                var openButton = $("<button>");
                openButton.text("odtwórz film");


                newLi.append(newh3n);
                newLi.append(newh3);
                newLi.append(newSpan);
                newLi.append(openButton);


                function test(button, url) {
                    button.on("click", function () {
                        $(".videoWindow").empty();
                        console.log("url", url);
                        var newDiv = $("<div class='videoWindow'>");
                        var videoDiv = $("<video width='680' height='470' class='video'></video>");

                        var movie = $("<source class='movie' type='video/mp4'>");
                        movie.attr("src", url);
                        if (url) {
                            videoDiv.append(movie);


                            var playButton = $("<input class='play' type=button value='play'>");
                            var pauseButton = $("<input class='pausa' type=button value='pause'>");
                            var stopButton = $("<input class='dtop' type=button value='stop'>");
                            var slowlyButton = $("<input class='slowly' type=button value='slowly'>");
                            var nextButton = $("<input class='next' type=button value='one frame forward'>");
                            var backButton = $("<input class='back' type=button value='one frame back'>");


                            newDiv.append(playButton);
                            newDiv.append(pauseButton);
                            newDiv.append(slowlyButton);
                            newDiv.append(stopButton);
                            newDiv.append(nextButton);
                            newDiv.append(backButton);

                            newDiv.append(videoDiv);


                            playButton.on("click", function () {
                                videoDiv[0].play();
                                videoDiv[0].playbackRate = 1;
                            });

                            pauseButton.on("click", function () {
                                videoDiv[0].pause()
                            });

                            stopButton.on("click", function () {
                                videoDiv[0].load()
                            });


                            slowlyButton.on("click", function () {
                                videoDiv[0].playbackRate = 0.5;
                            });

                            nextButton.on("click", function () {

                                if (videoDiv[0].paused) {
                                    console.log("paused");
                                    var frameTime = 1 / 24;
                                    videoDiv[0].currentTime = Math.min(videoDiv[0].duration, videoDiv[0].currentTime + frameTime);
                                }
                            });

                            backButton.on("click", function () {

                                if (videoDiv[0].paused) {
                                    console.log("paused");
                                    var frameTime = 1 / 24;
                                    videoDiv[0].currentTime = Math.max(0, videoDiv[0].currentTime - frameTime);
                                }
                            });


                            mainDiv.append(newDiv);

                        } else {
                            newDiv.text("Brak URL");
                            mainDiv.append(newDiv);
                        }
                    })

                }

                test(openButton, movieUrl);


                newList.append(newLi);
                mainDiv.append(newList);

            }
        } else {
            mainDiv.text("Nie znaleziono wideo");
        }
    }

    var button = $(".find");
    var infoInput = $(".description");


    function addToList(e) {
        e.preventDefault();
        mainDiv.empty();
        var text = infoInput.val().toLowerCase();
        findMovie(text);
    }

    button.on("click", addToList);


});