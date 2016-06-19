export default {
  processCommand: function(cmd) {
    var tokens = cmd.split(' ');
    var command = tokens.shift();
    var args = tokens;
    switch (command) {
      case 'HELP': return this.help();

      case 'ABOUT': return this.about();

      case 'SOURCE': return this.openLink('https://github.com/zbuttram/buttram.net');

      case 'TWITTER': return this.openLink('https://twitter.com/zbuttram');

      case 'LINKEDIN': return this.openLink('https://www.linkedin.com/in/zbuttram');

      case 'GITHUB': return this.openLink('https://github.com/zbuttram');

      case 'ECHO': return args.reduce((p, c) => p+' '+c);

      default: return command+": command not found";
    }
  },
  help: function() {
    return `
This website is made to resemble a command line interface. Type commands and arguments with spaces in between them.
&nbsp;
Commands:
HELP - This help screen
ABOUT - About me, and this site
SOURCE - View the source code for this site on GitHub
TWITTER - Open my Twitter profile
GITHUB - Open my GitHub profile
LINKEDIN - Open my LinkedIn profile
CLS - Clears the screen if you're feeling overwhelmed by text
&nbsp;
Other undocumented commands may be found.
    `;
  },
  about: function() {
    return `
Hello! I'm Zach Buttram and this is my personal homepage. It's always a work in progress, I add new commands from time to time.
I am a full-stack web developer in Southern California.
You can visit my social sites by typing in the corresponding service's name, use the 'HELP' command for more info, or just type in 'SOCIAL' for a quick list.
&nbsp;
This site is built with Facebook's React UI library. It is a static site (HTML/CSS/JavaScript) that may occasionally make HTTP requests to public APIs.
The site is currently hosted with [surge.sh](https://surge.sh) who provide an amazing service. You can check out the code on GitHub: https://github.com/zbuttram/buttram.net
`;
  },
  openLink: function(url) {
    window.open(url, '_blank');
    return "Opening link: "+url;
  }
};
