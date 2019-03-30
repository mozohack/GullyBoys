var selectedFile;

var config = {
		apiKey: "AIzaSyAlkTeBTBPtnVAaOnNmwiwsFVDIWKhfp5M",
		authDomain: "hackathon-mozofest-2019.firebaseapp.com",
		databaseURL: "https://hackathon-mozofest-2019.firebaseio.com",
		storageBucket: 'gs://hackathon-mozofest-2019.appspot.com/'
};
firebase.initializeApp(config);
var database = firebase.database();

function logOut(){
	console.log("Attempting Sign Out");
	firebase.auth().signOut().then(function() {
			console.log("Sign out successful");
			document.location.href = "facultyLogin.html";
		}).catch(function(error) {
			console.log("Error singing out");
		});
}

function uploadFile(){
	var filename = selectedFile.name;
	var regno = document.getElementById('studentregno').value;
	var sName = document.getElementById('studentname').value;
		var storageRef = firebase.storage().ref('/' + regno + '/' + filename); 
		var uploadTask = storageRef.put(selectedFile);
		

		uploadTask.on('state_changed', function(snapshot){
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log('Upload is ' + progress + '% done');
		document.getElementById("bar").style.width=progress+100;
				switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
							console.log('Upload is paused');
							break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
							console.log('Upload is running');
							break;
					}
				}, function(error) {
				// Handle unsuccessful uploads
				}, function() {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
				console.log('File available at', downloadURL);
				document.getElementById("bar").style.width="100%";
				writeUserData(regno,sName);
				M.toast({html:'Connecting to the network.'});
				});
		});
		
		
};

function writeUserData(studregno, studname) {
	firebase.database().ref('Students/' + studregno).set({
		RegNo: studregno,
			name: studname,
		hours_conducted: 0,
		hours_present:0,
		dayorder:{
			DO1:0,
			DO2:0,
			DO3:0,
		},
	
	});
	console.log("All Data Sent Successfully");
	M.toast({html:'Data has been uploaded to the server! You can continue adding more'});
}

$("#file").on("change",function(event){
		selectedFile = event.target.files[0];   
});

