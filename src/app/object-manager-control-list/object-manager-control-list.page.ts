import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-manager-control-list',
  templateUrl: './object-manager-control-list.page.html',
  styleUrls: ['./object-manager-control-list.page.scss'],
})
export class ObjectManagerControlListPage implements OnInit {

  searchResults =   {
      controlobject: [
        {
          city: 'Görlitz',
          street: 'Brückenstr 1',
          controllist: [
            {
              name: 'Gehweg',
              description: 'eine Beschreibung',
              tasks: [
                {
                  name: 'Sauber',
                  description: 'txt'
                },
                {
                  name: 'Unkraut',
                  description: 'txt'
                },
                {
                  name: 'Mängel',
                  description: 'txt'
                }
              ]
            },
            {
              name: 'Vorgarten',
              description: 'eine Beschreibung',
              tasks: [
                {
                  name: 'Sauber',
                  description: 'txt'
                },
                {
                  name: 'Gartenpflege',
                  description: 'txt'
                },
                {
                  name: 'Mängel',
                  description: 'txt'
                }
              ]
            },
            {
              name: 'Fassade',
              description: 'eine Beschreibung',
              tasks: [
                {
                  name: 'Sauber',
                  description: 'txt'
                },
                {
                  name: 'Spinnweben',
                  description: 'txt'
                },
                {
                  name: 'Mängel',
                  description: 'txt'
                }
              ]
            },
            {
              name: 'Klingelanlage',
              description: 'eine Beschreibung',
              tasks: [
                {
                  name: 'Sauber',
                  description: 'txt'
                },
                {
                  name: 'Beschriftung',
                  description: 'txt'
                },
                {
                  name: 'Mängel',
                  description: 'txt'
                }
              ]
            }
          ]
        }
      ]
  };

  ngOnInit() {
  }
}
