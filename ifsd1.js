class Player {
    constructor(name, score) {
      this.name = name;
      this.score = score;
    }
  }
  
  class Team {
    constructor() {
      this.players = [];
    }
  
    addPlayer(player) {
      this.players.push(player);
    }
  
    getAverageScore() {
      let totalScore = 0;
      for (let player of this.players) {
        totalScore += player.score;
      }
      return totalScore / this.players.length;
    }
  
    getMinimumScore() {
      let minScore = Infinity;
      for (let player of this.players) {
        if (player.score < minScore) {
          minScore = player.score;
        }
      }
      return minScore;
    }
  
    getMaximumScore() {
      let maxScore = -Infinity;
      for (let player of this.players) {
        if (player.score > maxScore) {
          maxScore = player.score;
        }
      }
      return maxScore;
    }
  }
  
  function main() {
    const team = new Team();
  
    // Get inputs from the user for two players
    for (let i = 1; i <= 2; i++) {
      const name = prompt(`Enter name for player ${i}:`);
      const score = parseInt(prompt(`Enter score for player ${i}:`));
  
      const player = new Player(name, score);
      team.addPlayer(player);
    }
  
    const averageScore = team.getAverageScore();
    const minimumScore = team.getMinimumScore();
    const maximumScore = team.getMaximumScore();
  
    console.log('Average Score:', averageScore);
    console.log('Minimum Score:', minimumScore);
    console.log('Maximum Score:', maximumScore);
  }
  
  main();
  