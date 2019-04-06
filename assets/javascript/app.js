
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
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var trainFrequency =$("#trainFrequency").val().trim();

    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: firstTrainTime,
      frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    $("#trainName").val("");
    $("#trainDestination").val("");
    $("firstTrainTime").val("");
    $("#trainFrequency").val("");

  });
  
  database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);


  });