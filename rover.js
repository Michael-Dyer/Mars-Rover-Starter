class Rover {
   constructor(position) {
      this.position = position;
      if (!position) {
        throw Error("Rover position required.");
      }
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
    }

   receiveMessage(message) {
    
      let outResults = [];

      for (let i = 0; i < message.commands.length; i++){
        outResults.push("dummy");
      }
        
      let output ={
        message: message.name,
        results: outResults
      }
      
      return output;
    }

}

module.exports = Rover;