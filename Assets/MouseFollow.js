var smooth = 2.0;
var tiltAngle = 30.0;

function Start () {

}

function Update () {
	var halfW : float = Screen.width;
	transform.position.x = 15 * ((Input.mousePosition.x - (0.5 * halfW)) / halfW);
	var halfH : float = Screen.height;
	transform.position.y = 15 * ((Input.mousePosition.y - (0.5 * halfH)) / halfH);
	
	var tiltAroundZ = Input.GetAxis("Mouse X") * tiltAngle * -2;
	var tiltAroundX = Input.GetAxis("Mouse Y") * tiltAngle;
	var target = Quaternion.Euler(tiltAroundX, 0, tiltAroundZ);
	transform.rotation = Quaternion.Slerp(transform.rotation, target, Time.deltaTime * smooth);
}