
  var config = {
    apiKey: "AIzaSyBJT7N_bl2kcYaAKEdRkB8D4z8T6g3ILxM",
    authDomain: "lucyq19trainscheduler.firebaseapp.com",
    databaseURL: "https://lucyq19trainscheduler.firebaseio.com",
    projectId: "lucyq19trainscheduler",
    storageBucket: "lucyq19trainscheduler.appspot.com",
    messagingSenderId: "241822132631"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrainBtn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var trainFrequency =$("#trainFrequency").val().trim();

    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    $("#trainName").val("");
    $("#trainDestination").val("");
    $("trainTime").val("");
    $("#trainFrequency").val("");

  });
  
  database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("hh:mm"));

    var convertedTime = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(convertedTime);

    var diffTime = moment().diff(moment(convertedTime), "minutes");
    console.log("Difference in Time: " + diffTime);

    var timeRemainder = diffTime % trainFrequency;
    console.log(timeRemainder);

    var minutesAway = trainFrequency - timeRemainder;
    console.log("Minutes Away: " + minutesAway);

    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("Next Arrival: " + moment(nextArrival).format("hh:mm"));

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(moment(nextArrival).format("hh:mm A")),
      $("<td>").text(minutesAway)
    );

    $("#scheduleTable > tbody").append(newRow);  

  });