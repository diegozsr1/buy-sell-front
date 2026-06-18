
import { ButtonIconVariant, ButtonIconConfig } from './button-icon.config';

/** Bootstrap Styles Configuration */
/** HTML Dinamic Elements*/
interface HtmlElements {
  btn: string;
  icon: ButtonIconConfig;
  iconText?: string;
  label?: string;
}

/** Bootstrap Style Component Configuration*/
type ButtonVariantMap = Record<ButtonIconVariant, HtmlElements>;

const STYLE_BTN = "btn d-flex flex-column align-items-center justify-content-center"
const STYLE_BTN_CIRCLE = STYLE_BTN + " rounded-circle border-0";
const STYLE_BTN_SQUARE = STYLE_BTN + " rounded-square border-0";
const STYLE_BTN_SQUARE_ROUNDED = STYLE_BTN + " rounded-square rounded-4 border-3";

export const STYLES: ButtonVariantMap = {
  like: {
    btn: STYLE_BTN_CIRCLE,
    icon: {
        actived: "bi bi-heart-fill",
        inactived: "bi bi-heart"
    }
  },
  star: {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-star-fill",
        inactived: "bi bi-star",
    }, 
    label: "",
  },
  'trash-button': {
    btn:  STYLE_BTN_SQUARE,
    icon: { 
        actived: "bi bi-trash3",
    }, 
    label: "",
  },
  'add-photo': {
    btn:  STYLE_BTN_SQUARE_ROUNDED,
    icon: { 
        actived: "bi bi-arrow-right",
    }, 
    label: "",
  },
  'add-photo-icon': {
    btn:  STYLE_BTN_SQUARE_ROUNDED,
    icon: { 
        actived: "bi bi-camera",
    }, 
    iconText: "SUBIR",
  },
  'profile-img': {
    btn:  STYLE_BTN_CIRCLE,
    icon: { }, 
  }
}