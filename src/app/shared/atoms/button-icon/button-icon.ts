import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { ButtonIconVariant, ButtonIconStates} from  './button-icon.config'
import { BOOTSTRAP_STYLES } from './button-icon.styles'

/**
 * Átomo de Boton tipo Icono.
 *
 * ## Descripción
 * Renderiza un botón con un icono Bootstrap en tres modos según la variante:
 * 
 * ## Uso
 * El input `variant` selecciona la variante de botón icono (like, home, etc).
 * El input `size` controla el tamaño del botón.
 * 
 * @example
 * ```html
 * <!-- Icono corazón" -->
 * <atom-icon variant="like" size="48px" />
 * ```
 */

@Component({
  selector: 'atom-button-icon',
  imports: [],
  templateUrl: './button-icon.html',
  styleUrl: './button-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIcon {
  /* Public inputs */
  variant   = input<ButtonIconVariant>('like');
  size      = input<string>('400px');
  text_icon = input<string>('');

  
  /* Public outputs */
  clicked   = output<boolean>();
  
  /* Component State*/
  private state = signal<ButtonIconStates>(ButtonIconStates.INACTIVED);
  
  /* Component Styles */
  protected btnClass = computed(() =>  {
    const variant = BOOTSTRAP_STYLES[this.variant()].btn;
    const style = `${variant} btn-icon btn--${this.variant()} ${this.state()}`
    return style;
  });

  protected iconClass = computed(() => {
    const variant = BOOTSTRAP_STYLES[this.variant()].icon;
    const style = `${variant?.[this.state()] ?? variant?.['default']} icon--${this.variant()} ${this.state()}`
    return style;
  });

  protected labelClass = computed(() =>  {
    const variant = BOOTSTRAP_STYLES[this.variant()].label;
    const style = `${variant} label--${this.variant()} ${this.state()}`
    return style;
  });

  protected label_text  = computed(() => {  
    const text = BOOTSTRAP_STYLES[this.variant()].label;
    return text;
  });

  
  /** Methods */
  protected onClick(): void {
    this.state.update(state => (state === ButtonIconStates.ACTIVED) ? ButtonIconStates.INACTIVED:ButtonIconStates.ACTIVED );
    console.log(this.state());
  }
}