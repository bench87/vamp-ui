import { Component, OnInit } from '@angular/core';
import { OnActivate , Router , ROUTER_DIRECTIVES , RouteSegment } from '@angular/router';

import { ArtifactsService } from '../artifacts.service';

@Component({
  moduleId: module.id,
  selector: 'app-artifacts-detail',
  templateUrl: 'artifacts-detail.component.html',
  styleUrls: ['artifacts-detail.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class ArtifactsDetailComponent implements OnInit {

  content = '';
  resource;
  selectedName;
  selectedResource;

  protected _interval;
  protected _intervalTime = 10000;

  constructor(
    private _artifacts : ArtifactsService,
    private _router    : Router
  ) {}

  routerOnActivate( current: RouteSegment ) {
    this.selectedResource = current.getParam( 'resource' );
    this.selectedName     = decodeURIComponent( current.getParam( 'name' ) );

    this.load();
    this.initPolling();
  }

  load() {
    if ( this.selectedName && this.selectedName != 'undefined' )
      this._artifacts[ this.selectedResource ].get( this.selectedName , { headers : { 'Accept' : 'application/x-yaml' } } )
        .subscribe(
          res => this.content = res
        );
  }

  initPolling() {
    this._interval = setInterval( () => this.load() , this._intervalTime );
  }

  ngOnInit() {
  }

}
