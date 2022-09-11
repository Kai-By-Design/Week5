class Worker {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }

  describe() {
    return `${this.name} is a ${this.position}.`;
  }
}

class CateringEventRoster {
  constructor(name) {
    this.name = name;
    this.workers = [];
  }

  addWorker(worker) {
    if (worker instanceof Worker) {
      this.worker.push(worker);
    } else {
      throw Error (`You can only add an instance of Worker. Argument is not a worker: ${worker}`);
    }
  }

  describe() {
    return `${this.name} has ${this.workers.length} workers.`;
  }
}

class Menu {
  constructor() {
    this.cateringEventRoster = [];
    this.selectedRoster = null;
  }

  start(){
    let selection = this.showMainMenuOptions();

    while (selection != 0) {
      switch (selection){
        case '1':
          this.createRoster();
          break;
        case '2':
          this.viewRoster();
          break;
        case '3':
          this.deleteRoster();
            break;
          case '4':
            this.displayEventRosters();
            break;
          default:
            selection = 0;
      }
      selection = this.showMainMenuOptions();
    }

    alert('Goodbye');
  }

  showMainMenuOptions(){
    return prompt(`
    0) exit
    1) create new catering event roster
    2) view catering event roster
    3) delete catering event roster
    4) display all catering event rosters
    `);
  }

  showRosterMenuOptions(rosterInfo){
    return prompt(`
    0) back
    1) create worker
    2) delete worker
    ---------------------------

    ${rosterInfo}
    `)
  }

  displayEventRosters() {
    let rosterString = '';
    for (let i = 0; i < this.cateringEventRoster.length; i++){
      rosterString += i + ') ' + this.cateringEventRoster[i].name + '\n'
    }
    alert(rosterString);
  }

  createRoster() {
    let name = prompt('Enter name for new Event Roster:')
    this.cateringEventRoster.push(new CateringEventRoster(name));

  }

  //Reusable code that displays the list of Events that have been created
  //and displays them to allow users to more easily select their options.
  //test change
  rosterListDisplay(){
    if(this.cateringEventRoster.length > 0) {
      let output = '';
      for (let i = 0; i < this.cateringEventRoster.length; i++){
        output += `${i} )  ${this.cateringEventRoster[i].name}\n`;
      }
      console.log(output);
      return output;
    }
    else {
      return `No Events Created Yet\nPress Any Button to Go Back to the Main Menu`;
    }
  }

  viewRoster() {
    //Created a localized placeholder variable to run the event name display helper method through
    let listEvents = this.rosterListDisplay();
    let index = prompt(`${listEvents} \n \n` + 'Enter the index of the Event Roster you wish to view:');
    //let index = prompt(`${this.rosterListDisplay()} \n Enter the index of the Event Roster you wish to view:`);
    if (index > -1 && index < this.cateringEventRoster.length) {
      this.selectedRoster = this.cateringEventRoster[index];
      let description = 'Event Roster: ' + this.selectedRoster.name + '\n';
      //console.log('line 99:  ', description);

      for (let i = 0; i < this.selectedRoster.workers.length; i++) {
        description += i + ') ' + this.selectedRoster.workers[i].name
        + ' - ' + this.selectedRoster.workers[i].position + '\n';
        }

        let selection = this.showRosterMenuOptions(description);
        switch (selection) {
          case '1':
            this.createWorker();
            break;
          case '2':
            this.deleteWorker();
        }
    }
  }

  deleteRoster(){
    let listEvents = this.rosterListDisplay();
    let index = prompt(`${listEvents} \n \n` + 'Enter the index of Event Roster you wish to delete:');
    if (index > -1 && index < this.cateringEventRoster.length) {
      this.cateringEventRoster.splice(index, 1);
    }
  }

  createWorker (){
    let name = prompt('Enter name for new worker:');
    let position = prompt('Enter position for new worker:');
    this.selectedRoster.workers.push(new Worker(name, position));
  }

  deleteWorker(){
    let index = prompt('Enter index of worker you wish to delete:');
    if (index > -1 && index < this.selectedRoster.workers.length) {
      this.selectedRoster.workers.splice(index, 1);
    }
  }

}

let menu = new Menu();
menu.start();