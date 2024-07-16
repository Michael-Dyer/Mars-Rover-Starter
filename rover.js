class Rover {
   constructor(position) {
      this.position = position;
      if (!position) {
        throw Error("Rover position required.");
      }
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
    }

}

module.exports = Rover;