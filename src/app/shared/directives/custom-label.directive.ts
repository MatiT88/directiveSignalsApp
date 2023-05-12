import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit{

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color( value: string ) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors( errores: ValidationErrors | null | undefined) {
    this._errors = errores;
    this.setErrorMessage();
  }



  // @Input()
  // pepito!: string;

  // set pepito2( pepitoParam: any) {
  //   console.log(pepitoParam);
  // }

  // get pepito3() {
  //   return this.pepito;
  // }

  // private _pepito4 = 'hola'
  // @Input()
  // set pepito4( pepitoParam: string) {
  //   this._pepito4 = pepitoParam;
  // }

  // get pepito4() {
  //   return this._pepito4;
  // }


  constructor( private element: ElementRef<HTMLElement>) {
      // console.log(element);
      this.htmlElement = element
  }
  ngOnInit(): void {
    console.log('OnInit de mi directiva');
  }

  setStyle() {
    if (!this.htmlElement) return
    this.htmlElement!.nativeElement.style.color = this._color
  }

  setErrorMessage(): void {
    if( !this.htmlElement ) {
      return
    }
     if( this._errors == null ) {
      this.htmlElement.nativeElement.innerText = '';
      return;
     }

    const errors = Object.keys(this._errors);

    if( errors.includes('required') ) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido!.'
      return;
      }

    if( errors.includes('minlength') ) {
      const min= this._errors!["minlength"]["requiredLength"];
      const currentValue = this._errors!["minlength"]["actualLength"]
      this.htmlElement.nativeElement.innerText = `El minimo es ${min} caracteres y usted tiene solo ${currentValue}.`
      return;
      }



    if( errors.includes('email') ) {
      this.htmlElement.nativeElement.innerText = 'Debe ser un e-mail valido.'
      return;
      }
  }
}
