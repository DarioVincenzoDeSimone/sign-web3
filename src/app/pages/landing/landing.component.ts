import { Component, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  // currentPosition: any;

  // constructor(private _sanitizer: DomSanitizer) { }

  // getSVGImage(image) {
  //   return this._sanitizer.bypassSecurityTrustHtml(`${image}`);
  // }

  // @HostListener('window:scroll', ['$event'])
  // onScroll(event) {
  //   // let scroll = window.scrollY;
  //   // console.log(event)
  //   // document.getElementById('wallpaper-container').scrollBy({ top: scroll / 35 })
  //   let scroll = window.scrollY;
  //   let el = document.getElementById('wallpaper-container') as HTMLElement;
  //   if (scroll > this.currentPosition && el.getBoundingClientRect().bottom >= 0) {
  //     // console.log('scrollDown');
  //     el.scrollBy({ top: scroll / 35 })
  //   } else if (scroll <= this.currentPosition && el.getBoundingClientRect().bottom >= 0) {
  //     // console.log('scrollUp');
  //     el.scrollBy({ top: -scroll / 35 })
  //   } else if (el.getBoundingClientRect().bottom < 0) {
  //     el.scrollTo({ top: el.getBoundingClientRect().height });
  //   }
  //   this.currentPosition = scroll;
  // }

}
