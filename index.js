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
                   </tr>`
            table.innerHTML += row;
        if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
        }
                
        }
    });
});





//document.getElementById("initialze").innerHTML = Caller(); 

setInterval(Caller, 10000); //calls the function every 10 seconds
function Caller(){
    
    db.collection("caller").onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change){
            if(change.type === "added"){
                if(change.doc.data().device == "device2"){
                    //dialing usig device 1
                    sessionStorage.setItem("device2", change.doc.data().id);
                }if(change.doc.data().device == "device1"){
                    //dialing using device 2
                    sessionStorage.setItem("device1", change.doc.data().id);
                }
                // console.log(change.doc.data());
                // var row = `<h2>${change.doc.data().name}</h2>
                //         ${change.doc.data().id}<br>
                //         Device in use : ${change.doc.data().device}<br>
                //         Status : ${change.doc.data().status}</p>`
                
                // console.log(row);
                // call_list.innerHTML = row;
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
                    
            }
        });
    });
    var device_one = document.getElementById("device_one");
    var device_two = document.getElementById("device_two");
    // Display 
    console.log(sessionStorage.getItem("device1"));
    if(sessionStorage.getItem("device1") != null){
        var docRef = db.collection("caller").doc(sessionStorage.getItem("device1"));
        docRef.get().then(function(doc) {
            
            var row = `<h3>Currently Dialing : ${doc.data().name}</h3>
                         ${doc.data().contact}<br>`
            device_one.innerHTML = row;
            if(doc.data().status == "new"){
                axios({
                    url:`https://5e42ffd8ff5d.ngrok.io/call?name=${doc.data().name}&arrears=${doc.data().arrears}&number=${doc.data().contact}&dpd=${doc.data().dpd}&index=${doc.data().id}`,
                    method:`GET`
                  })
                
                return docRef.update({
                    device: 'device1'
                }).then(function() {
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });

                sessionStorage.removeItem("device1")
            }
            
        });
        console.log("device 1 triggered");
    }if(sessionStorage.getItem("device2") != null){
        var docRef = db.collection("caller").doc(sessionStorage.getItem("device2"));
        docRef.get().then(function(doc) {
            
            var row = `<h3>Currently Dialing : ${doc.data().name}</h3>
                         ${doc.data().contact}<br>`
            device_two.innerHTML = row;
            if(doc.data().status == "new"){
                axios({
                    url:`https://6e605ba4c136.ngrok.io/call?name=${doc.data().name}&arrears=${doc.data().arrears}&number=${doc.data().contact}&dpd=${doc.data().dpd}&index=${doc.data().id}`,
                    method:`GET`
                })
                return docRef.update({
                    device: 'device2'
                }).then(function() {
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
                sessionStorage.removeItem("device2")
            }
            
        });//dial using device 1
        
        console.log("device 2 triggered");
    }

    // Clear Screen
    if(sessionStorage.getItem("device1") == null){
        var row = `<h2></h2>`
                console.log(row);
                device_one.innerHTML = row;
        
    }if(sessionStorage.getItem("device2") == null){
        var row = `<h2></h2>`
                console.log(row);
                device_two.innerHTML = row;
        
    }
    
    sessionStorage.clear();
}



    // querySnapshot.forEach(function(doc) {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //     var row = `<tr>
    //                 <td>${doc.data().id}</td>
    //                 <td>${doc.data().name}</td>
    //                 <td>${doc.data().contact}</td>
    //                 <td>${doc.data().arrears}</td>
    //                 <td>${doc.data().dpd}</td>
    //                 <!-- Trigger/Open The Modal -->
    //                 <td><button id="myBtn" onclick="btn_click()">Open Campaign</button></td>         

    //                 <!-- The Modal -->
    //                 <div id="myModal" class="modal">
    //                     <!-- Modal content -->
    //                     <div class="modal-content">
    //                         <p>Person</p>
                            
    //                     </div>
    //                 </div>
    //                </tr>`
    //     table.innerHTML += row;
    // });

