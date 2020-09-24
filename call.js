// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
sessionStorage.clear();

document.getElementById("demo").innerHTML = display();
function display(){
    Caller();
    return ""
} 

setInterval(Caller, 10000); //calls the function every 10 seconds
function Caller(){
    if(sessionStorage.getItem("test")==null)
    console.log("test is not a var");
    
    db.collection("caller").onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(function(change){
            //if(change.type === "added"){
                if(change.doc.data().device == "device1"){
                    //dialing usig device 1
                    sessionStorage.setItem("device1", change.doc.data().id);
                }if(change.doc.data().device == "device2"){
                    //dialing using device 2
                    sessionStorage.setItem("device2", change.doc.data().id);
                }
            // if (change.type === "modified") {
            //     console.log("Modified city: ", change.doc.data());
            // }
                    
            //}
        });
    });
    console.log("device 1 ");
    console.log(sessionStorage.getItem("device1"));
    console.log("device 2 ");
    console.log(sessionStorage.getItem("device2"));
    var device_one = document.getElementById("device_one");
    var device_two = document.getElementById("device_two");
    // // Display
    if((sessionStorage.getItem("device1") == null)||(sessionStorage.getItem("device2") == null)){

        db.collection("caller").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.data().status);
                if(doc.data().status == 'new'){
                    if((sessionStorage.getItem("device1") == null)&&(sessionStorage.getItem("device2") != doc.data().id)&&(parseInt(doc.data().count)<4)){
                        console.log("first if");
                        console.log(doc.data().id);
                        axios({
                            url:`https://6410b3e03109.ngrok.io/call?name=${doc.data().name}&arrears=${doc.data().arrears}&number=${doc.data().contact}&dpd=${doc.data().dpd}&index=${doc.data().id}`,
                            method:`GET`
                            })
                        var row = `<h3 style="color:blue">Currently Dialing</h3><h3> &nbsp;&nbsp;&nbsp;&nbsp; ${doc.data().name}</h3>
                                    &nbsp;&nbsp;&nbsp;&nbsp; ${doc.data().contact}<br>`
                        device_one.innerHTML = row;          
                        sessionStorage.setItem("device1",doc.data().id);
                        
                        calCount = parseInt(doc.data().count);
                        calCount = calCount + 1 ;

                        var docRef = db.collection("caller").doc(doc.data().id);
                        docRef.get().then(function(doc) {
                            return docRef.update({
                                device: 'device1',
                                count: calCount 
                            }).then(function() {
                                console.log("Document successfully updated!");
                            })
                            .catch(function(error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });

                        });

                        var docRef = db.collection("caller").doc(doc.data().id);
                        docRef.get().then(function(doc) {
                            return docRef.update({
                                status: 'inprogress'
                            }).then(function() {
                                console.log("Document successfully updated!");
                            })
                            .catch(function(error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });

                        });
                        

                    }
                    
                    setTimeout(() => {  console.log("2sec delay"); }, 2000); 
                }
            if(doc.data().status == 'new'){
                if((sessionStorage.getItem("device2") == null)&&(sessionStorage.getItem("device1") != doc.data().id)&&(parseInt(doc.data().count)<4)){
                    console.log("2nd if");
                    console.log(doc.data().id);
                    axios({
                        url:`https://230639d09b00.ngrok.io/call?name=${doc.data().name}&arrears=${doc.data().arrears}&number=${doc.data().contact}&dpd=${doc.data().dpd}&index=${doc.data().id}`,
                        method:`GET`
                        })
                    var row = `<h3 style="color:blue">Currently Dialing</h3><h3> &nbsp;&nbsp;&nbsp;&nbsp; ${doc.data().name}</h3>
                                &nbsp;&nbsp;&nbsp;&nbsp; ${doc.data().contact}<br>`
                    device_two.innerHTML = row;          
                    sessionStorage.setItem("device2",doc.data().id);

                    calCount = parseInt(doc.data().count);
                    calCount = calCount + 1 ;

                    var docRef = db.collection("caller").doc(doc.data().id);
                    docRef.get().then(function(doc) {
                        return docRef.update({
                            device: 'device2',
                            count: calCount
                        }).then(function() {
                            console.log("Document successfully updated!");
                        })
                        .catch(function(error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });

                        

                    });
                    var docRef = db.collection("caller").doc(doc.data().id);
                        docRef.get().then(function(doc) {
                            return docRef.update({
                                status: 'inprogress'
                            }).then(function() {
                                console.log("Document successfully updated!");
                            })
                            .catch(function(error) {
                                // The document probably doesn't exist.
                                console.error("Error updating document: ", error);
                            });

                        });
                }
                        //}
                    //}
                    // if (change.type === "modified") {
                    //     console.log("Modified city: ", change.doc.data());
                    // }
                    // Clear Screen
                
                            
            }  
            setTimeout(() => {  console.log("2sec delay"); }, 2000); 

            });
        });
    }
    //     db.collection("caller").onSnapshot(function(querySnapshot) {
    //         querySnapshot.docChanges().forEach(function(change){
    //             //if(change.type === "added"){
    //                 //if(change.doc.data().status=="new"){
                        
    //                     if((sessionStorage.getItem("device1") == null) && (change.doc.data().status == "new")){
    //                         console.log("first if");
    //                         console.log(change.doc.data().id);
    //                         axios({
    //                             url:`https://bb593c96287a.ngrok.io/call?name=${change.doc.data().name}&arrears=${change.doc.data().arrears}&number=${change.doc.data().contact}&dpd=${change.doc.data().dpd}&index=${change.doc.data().id}`,
    //                             method:`GET`
    //                             })
    //                         var row = `<h3 style="color:blue">Currently Dialing</h3><h3> &nbsp;&nbsp;&nbsp;&nbsp; ${change.doc.data().name}</h3>
    //                                     &nbsp;&nbsp;&nbsp;&nbsp; ${change.doc.data().contact}<br>`
    //                         device_one.innerHTML = row;          
    //                         sessionStorage.setItem("device1",change.doc.data().id);
                            
    //                         var docRef = db.collection("caller").doc(change.doc.data().id);
    //                         docRef.get().then(function(doc) {
    //                             return docRef.update({
    //                                 device: 'device1'
    //                             }).then(function() {
    //                                 console.log("Document successfully updated!");
    //                             })
    //                             .catch(function(error) {
    //                                 // The document probably doesn't exist.
    //                                 console.error("Error updating document: ", error);
    //                             });
    
    //                         });
                        
                            
    //                     }
    //                     if((sessionStorage.getItem("device2") == null) && (change.doc.data().status == "new")){
    //                         console.log("2nd if");
    //                         console.log(change.doc.data().id);
    //                         axios({
    //                             url:`https://bb593c96287a.ngrok.io/call?name=${change.doc.data().name}&arrears=${change.doc.data().arrears}&number=${change.doc.data().contact}&dpd=${change.doc.data().dpd}&index=${change.doc.data().id}`,
    //                             method:`GET`
    //                             })
    //                         var row = `<h3 style="color:blue">Currently Dialing</h3><h3> &nbsp;&nbsp;&nbsp;&nbsp; ${change.doc.data().name}</h3>
    //                                     &nbsp;&nbsp;&nbsp;&nbsp; ${change.doc.data().contact}<br>`
    //                         device_two.innerHTML = row;          
    //                         sessionStorage.setItem("device2",change.doc.data().id);

    //                         var docRef = db.collection("caller").doc(change.doc.data().id);
    //                         docRef.get().then(function(doc) {
    //                             return docRef.update({
    //                                 device: 'device2'
    //                             }).then(function() {
    //                                 console.log("Document successfully updated!");
    //                             })
    //                             .catch(function(error) {
    //                                 // The document probably doesn't exist.
    //                                 console.error("Error updating document: ", error);
    //                             });
    
    //                         });
    //                     }
    //                 //}
    //             //}
    //             // if (change.type === "modified") {
    //             //     console.log("Modified city: ", change.doc.data());
    //             // }
    //             // Clear Screen
               
                        
                
    //         });
    //     });

    // }
    


    // console.log(sessionStorage.getItem("device1"));
    // if(sessionStorage.getItem("device1") != null){
    //     var docRef = db.collection("caller").doc(sessionStorage.getItem("device1"));
    //     docRef.get().then(function(doc) {
            
    //         var row = `<h3 style="color:blue">Currently Dialing</h3><h3> &nbsp;&nbsp;&nbsp;&nbsp; ${doc.data().name}</h3>
    //                     &nbsp;&nbsp;&nbsp;&nbsp; ${doc.data().contact}<br>`
    //         device_one.innerHTML = row;
    //         if(doc.data().status == "new"){
    //             axios({
    //                 url:`https://bb593c96287a.ngrok.io/call?name=${doc.data().name}&arrears=${doc.data().arrears}&number=${doc.data().contact}&dpd=${doc.data().dpd}&index=${doc.data().id}`,
    //                 method:`GET`
    //               })
                
    //             return docRef.update({
    //                 device: 'device1'
    //             }).then(function() {
    //                 console.log("Document successfully updated!");
    //             })
    //             .catch(function(error) {
    //                 // The document probably doesn't exist.
    //                 console.error("Error updating document: ", error);
    //             });

    //             sessionStorage.removeItem("device1")
    //         }
            
    //     });
    //     console.log("device 1 triggered");
    // }if(sessionStorage.getItem("device2") != null){
    //     var docRef = db.collection("caller").doc(sessionStorage.getItem("device2"));
    //     docRef.get().then(function(doc) {
            
    //         var row = `<h3 style="color:blue">Currently Dialing </h3><h3>&nbsp;&nbsp;&nbsp;&nbsp; ${doc.data().name}</h3>
    //                    &nbsp;&nbsp;&nbsp;&nbsp; ${doc.data().contact}<br>`
    //         device_two.innerHTML = row;
    //         if(doc.data().status == "new"){
    //             axios({
    //                 url:`https://ed1572733e7d.ngrok.io/call?name=${doc.data().name}&arrears=${doc.data().arrears}&number=${doc.data().contact}&dpd=${doc.data().dpd}&index=${doc.data().id}`,
    //                 method:`GET`
    //             })
    //             return docRef.update({
    //                 device: 'device2'
    //             }).then(function() {
    //                 console.log("Document successfully updated!");
    //             })
    //             .catch(function(error) {
    //                 // The document probably doesn't exist.
    //                 console.error("Error updating document: ", error);
    //             });
    //             sessionStorage.removeItem("device2")
    //         }
            
    //     });//dial using device 1
        
    //     console.log("device 2 triggered");
    // }

    // Clear Screen
    if(sessionStorage.getItem("device1") == null){
        var row = `<h3 style="color:green">Connecting</h3>`
                console.log(row);
                device_one.innerHTML = row;
        
    }if(sessionStorage.getItem("device2") == null){
        var row = `<h3 style="color:green">Connecting</h3>`
                console.log(row);
                device_two.innerHTML = row;
        
    }
    
    sessionStorage.clear();
}



    
