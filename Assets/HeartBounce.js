var hitCount:GUIText; 
var numHits:int = 0; 
var hasLost:boolean = false;
var bestScore:int = 0; 
var lastBest:int = 0;
var velocityWasStored = false; 
var storedVelocity : Vector3;

function Start () {

}

function Update () {
	var str:String = "";
	if(!hasLost){ 
		str = numHits.ToString();
	} 
	else {
		str = "Hits:" + numHits.ToString() + "\nYour best:" + bestScore;
	
		if(bestScore > lastBest) str += "\nNEW RECORD!"; 
	}
	
	hitCount.text = str;
	
	if(transform.position.y < -3){
		if(!hasLost) {
			hasLost = true;
			lastBest = bestScore;
			if(numHits > bestScore) {
				bestScore = numHits;
			}
		}	
	}
}

function OnCollisionEnter(col : Collision) { 
	if(col.gameObject.tag == "tray") {
		//Debug.Log("yes! hit tray!");
		if (!velocityWasStored) {
			storedVelocity = rigidbody.velocity; 
			velocityWasStored = true;
		}
		if(rigidbody.velocity.y > 1) { 
			numHits ++; 
		}
		rigidbody.velocity.y = storedVelocity.y;
	}
}

function OnGUI(){ 
	if(hasLost){
		var buttonW:int = 100; // button width 
		var buttonH:int = 50; // button height
		var halfScreenW:float = Screen.width/2; // half of the Screen width
		var halfButtonW:float = buttonW/2; // Half of the button width
		if(GUI.Button(Rect(halfScreenW-halfButtonW, Screen.height*.8, buttonW, buttonH), "Play Again")){
			numHits = 0;
			hasLost = false; 
			transform.position = Vector3(0.5,2,-0.05); 
			rigidbody.velocity = Vector3(0,0,0);
		}
	}
}
