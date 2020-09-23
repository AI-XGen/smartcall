// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
sessionStorage.clear();

function storedata(){
   // Add a new document in collection "cities"
   id = document.getElementById("id").value;
   name = document.getElementById("name").value;
   contact = document.getElementById("contact").value;
   arrears = document.getElementById("arrears").value;
   dpd = document.getElementById("dpd").value;

    db.collection("caller").doc(id).set({
        id:id ,
        name: name,
        contact: contact,
        arrears: arrears,
        dpd: dpd,
        status: 'new', // new , ongoing, done
        device: 'null' //null,device1,device2
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });


    // //editing
    //     var washingtonRef = db.collection("caller").doc("1");

    // // Set the "capital" field of the city 'DC'
    // return washingtonRef.update({
    //     status: 'done'
    // })
    // .then(function() {
    //     console.log("Document successfully updated!");
    // })
    // .catch(function(error) {
    //     // The document probably doesn't exist.
    //     console.error("Error updating document: ", error);
    // });

}


var table = document.getElementById("table_data");

db.collection("caller").onSnapshot(function(querySnapshot) {
    querySnapshot.docChanges().forEach(function(change){
        if(change.type === "added"){
            console.log(change.doc.data());
            var row = `<tr>
                    <td>${change.doc.data().id}</td>
                    <td>${change.doc.data().name}</td>
                    <td>${change.doc.data().contact}</td>
                    <td>${change.doc.data().arrears}</td>
                    <td>${change.doc.data().dpd}</td>
                    <td><button onclick="deletedb(${change.doc.data().id})">Delete</button></td>
                   </tr>`
            table.innerHTML += row;
        if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
        }
                
        }
    });
});

function deletedb(id){
    console.log(id);
    db.collection("caller").doc(id.toString()).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    
}



//document.getElementById("initialze").innerHTML = Caller(); 

