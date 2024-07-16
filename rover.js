class OutResult{
  constructor(messageName){
    this.messageName = messageName;
  }

}

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

      //main loop for iterating over commands
      for (let i = 0; i < message.commands.length; i++){
        

        if(message.commands[i].commandType == 'STATUS_CHECK'){
          outResults.push({
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            }
          })
        }

        //catch all for wrong output
        else{
          outResults.push("junk");
        }



      }
      
      return {
        message: message.name,
        results: outResults
      }
    }

}

module.exports = Rover;