import { Directive, ElementRef, OnInit, HostListener, Input, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Directive({
  selector: '[pvToggle]'
})
export class PvToggleDirective implements OnInit {

  ref: HTMLIonIconElement = this.elementRef.nativeElement;
  inputReference: HTMLIonInputElement = undefined;
  
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    // GET PREVIOUS INPUT ELEMENT, VERIFY POSITION & TYPE 
    if((this.ref.previousSibling as HTMLIonInputElement).type == "password") {
      this.inputReference = this.ref.previousSibling as HTMLIonInputElement;
    } else {
      throw "Input must be the previous sibling and be the password type"
    }
    
    this.ref.name = 'eye';
    this.ref.slot = 'end';
  }

  @HostListener('click') onClick() {
    if(this.ref.name == "eye") {
      this.ref.name = 'eye-off';
      (this.inputReference != undefined)? this.inputReference.type = 'text': this.inputReference.type = this.inputReference.type;
    } else {
      this.ref.name = 'eye';
      (this.inputReference != undefined)? this.inputReference.type = 'password': this.inputReference.type = this.inputReference.type;
    } 
  }

}
