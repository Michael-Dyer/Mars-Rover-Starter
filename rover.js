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
        //output status
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
        //change mode
        else if (message.commands[i].commandType == "MODE_CHANGE"){
         
          if (message.commands[i].value == "NORMAL" || message.commands[i].value == "LOW_POWER"){
            this.mode = message.commands[i].value;

            outResults.push({
              completed: true
            })
          }
          else {
            outResults.push({
              completed: false
            })
          }
        }//
        //move comand
        else if (message.commands[i].commandType == "MOVE"){

          if (this.mode == "LOW_POWER"){
            outResults.push({
              completed: false
            })
          }
          else{
            this.position = message.commands[i].value;
            outResults.push({
              completed: true
            })
          }
        }
        //catch all for wrong output
        else{
          outResults.push({
            completed: false
          })
        }



      }
      
      return {
        message: message.name,
        results: outResults
      }
    }

}

module.exports = Rover;