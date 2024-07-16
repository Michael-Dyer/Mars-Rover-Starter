const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

/*   
    1)constructor(position)
        position is a number representing the rover’s position.
        Sets this.position to position
        Sets this.mode to 'NORMAL'
        Sets the default value for generatorWatts to 110

    2) receiveMessage(message)
        message is a Message object
        Returns an object containing at least two properties:
            message: the name of the original Message object
            results: an array of results. Each element in the array is an object that corresponds to one Command in message.commands.
        Updates certain properties of the rover object
            Details about how to respond to different commands are in the Command Types table .           

*/

describe("Rover class", function() {

  //7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let testRover = new Rover(1);
    expect(testRover.position).toBe(1);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.generatorWatts).toBe(110);
  });

  //8
  it("response returned by receiveMessage contains the name of the message", function() {
    let testRover = new Rover(1);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);

    expect(testRover.receiveMessage(message).message).toBe('Test message with two commands');

  });

  //9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let testRover = new Rover(1);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);

    expect(testRover.receiveMessage(message).results.length).toBe(2);

  });

  //10
  it("responds correctly to the status check command", function() {
    let testRover = new Rover(1);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test STATUS_CHECK', commands);

    expect(testRover.receiveMessage(message).results).toStrictEqual([{completed: true, roverStatus: {mode: testRover.mode, generatorWatts: testRover.generatorWatts, position: testRover.position}}]);
  
  });

  //11
  it("responds correctly to the mode change command", function() {
    let testRover = new Rover(1);
    expect(testRover.mode).toBe("NORMAL");

    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test MODE_CHANGE', commands);
    testRover.receiveMessage(message);
    expect(testRover.mode).toBe("LOW_POWER");
    expect(testRover.receiveMessage(message).results).toStrictEqual([{completed: true}])


    commands = [new Command('MODE_CHANGE', 'NORMAL')];
    message = new Message('Test MODE_CHANGE', commands);
    testRover.receiveMessage(message);
    expect(testRover.mode).toBe("NORMAL");
    expect(testRover.receiveMessage(message).results).toStrictEqual([{completed: true}])

    commands = [new Command('MODE_CHANGE', 'NOT_A_VALID_STATUS')];
    message = new Message('Test MODE_CHANGE to invalid status', commands);
    testRover.receiveMessage(message);
    expect(testRover.mode).toBe("NORMAL");
    expect(testRover.receiveMessage(message).results).toStrictEqual([{completed: false}])
  });

  //12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let testRover = new Rover(1);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 254)];
    let message = new Message('Test MOVE in LOW_POWER mode', commands);
    testRover.receiveMessage(message);
    //this will allow me to take only the last element to check for the completed status
    let lastMessage = testRover.receiveMessage(message).results.pop()
    expect(lastMessage).toStrictEqual({completed: false})
    expect(testRover.position).toBe(1);


  });

  //13
  it("responds with the position for the move command", function() {
    let testRover = new Rover(1);
    expect(testRover.position).toBe(1);

    let commands = [new Command('MOVE', 245)];
    let message = new Message('Test MOVE change position', commands);
    testRover.receiveMessage(message);
    expect(testRover.position).toBe(245);
  });


});
