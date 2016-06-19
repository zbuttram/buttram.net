export default {
  processCommand: function(cmd) {
    var args = cmd.split(' ');
    switch (args[0]) {
      case 'HELP':
        return [
          "Hello! I'm still making the site right now.",
          "Feel free to check out the code at https://github.com/zbuttram/buttram.net"
        ];
      default:
        return "Unrecognized command.";
    }
  },
  help: function() {

  }
};
