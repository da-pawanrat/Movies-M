document.addEventListener('prechange', function(event) {
    document.querySelector('ons-toolbar .center')


  });

  $(function(){
  var firebaseConfig = { 
    apiKey: "AIzaSyCCOpytQ9b-iPLC7IRtE7S4BK3AitxkdUk",
    authDomain: "plearnhub-509b2.firebaseapp.com",
    databaseURL: "https://plearnhub-509b2.firebaseio.com",
    projectId: "plearnhub-509b2",
    storageBucket: "plearnhub-509b2.appspot.com",
    messagingSenderId: "59399787997",
    appId: "1:59399787997:web:deee24f3c7840853a91234",
    measurementId: "G-WYRXEDJQ1V"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  var db = firebase.firestore();
  var index = 1;
  db.collection("trailer").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      var id = doc.id
      var vedioUrl = doc.data().videoURL
      var pic = `<ons-carousel-item id="${id}" class='header'
      style="background-image:url(${doc.data().posterURL});background-repeat: no-repeat;background-size: cover;">
      </ons-carousel-item>`
      $("#carousel").append(pic);

      var vedio = `<video style='width:100%; height:100%' id='vedio_${id}' >
      <source src="${vedioUrl}" ></video>`
      $("#"+id).append(vedio);
      $("#vedio_"+id).hide();
      hover(id,vedioUrl);
    })
  })

  var db = firebase.firestore();
  var index = 1;
  db.collection("favourites").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      var id = doc.id
      var vedioUrl = doc.data().videoURL
      var pic = ` <ons-col width="30%" style="margin: 1%;"><img src="${doc.data().posterURL}" style="width:100%; height: 100%;">
      </ons-col>`
      $("#fav").append(pic);
    })
  })


  function hover(id){

    $("#"+id).mouseover(function() {
      $("#vedio_"+id).show();
      $("#vedio_"+id).get(0).play();
    })
    $("#"+id).mouseleave(function() {
      $("#vedio_"+id).hide();
      $("#vedio_"+id).get(0).pause();
      $("#vedio_"+id).get(0).currentTime = 0;
    })
    
    
  }


  db.collection("movies").limit(5).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        console.log(doc.data());

        var row =     `<div class="card">
        <img class="card-img-top" src="${doc.data().posterURL}" alt="">
        <div class="card-body">
          <h4 class="card-title">${doc.data().title}(${doc.data().years})</h4>
        </div>
      </div>`
        $("#list").append(row);
    });
  } );
  });