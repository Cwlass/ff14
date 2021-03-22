import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ApiGetService } from '../services/api-get.service';
import { FormsModule } from '@angular/forms'



@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.css']
})
export class CharacterPageComponent implements OnInit {

  fName = "";
  lName = "";
  serverList = [];
  selectedServer = "";
  charID = "";
  charName = "Character Name"
  nameDay = "Name Day"
  fc = "Free Company"
  portrait = ""
  fcMembers = [];
  gear = [];
  constructor(private ff14S: ApiGetService) { }

  ngOnInit(): void {
    this.getServers();
  }
  async getServers() {
    const servers = await this.ff14S.getServer();
    this.serverList = servers;
  }
  async getFc() {
    const fcDate = await this.ff14S.getCharFC(this.charID);
    this.fcMembers = fcDate.FreeCompanyMembers;
  }
  async getGear() {
    const gear = await this.ff14S.getGear(this.charID);
    this.gear = gear.Character.GearSet.Gear;
    console.log(this.gear);

  }

  async fcClick(event) {
    const name = event.target.innerText;
    name.replace(" ", "+");
    const newChar = await this.ff14S.getfcMember(name, this.selectedServer);
    this.charID = newChar.Results[0].ID;

    const charSheet = await this.ff14S.findCharById(this.charID);
    this.charName = charSheet.Character.Name;
    this.nameDay = charSheet.Character.NameDay;
    console.log(this.nameDay);

    this.fc = charSheet.Character.FreeCompanyName;
    this.portrait = charSheet.Character.Portrait;
    this.getFc();
  }
  async clickHandler() {

    const char = await this.ff14S.findID(this.fName, this.lName, this.selectedServer);
    this.charID = char.Results[0].ID;

    const charSheet = await this.ff14S.findCharById(this.charID);
    this.charName = charSheet.Character.Name;
    this.nameDay = charSheet.Character.NameDay;
    console.log(this.nameDay);

    this.fc = charSheet.Character.FreeCompanyName;
    this.portrait = charSheet.Character.Portrait;
    this.getFc();
    this.getGear();
  }

}
