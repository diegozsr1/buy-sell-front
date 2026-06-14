import {  ButtonIconVariant } from  './button-icon.config'

/** Bootstrap Styles */

/** Component Configuration Interface */
// Describe la forma que tiene la configuración de cada variante.
// Se crearán las interfaces que necesitemos según e
// Todas las propiedades son opcionales (?) porque no todas las variantes
// usan todos los campos: p.ej. un "profile" no tiene `icon` ni `label`,
// y solo los "check" tienen `bgShadow`.
//
// Justificación: tener una interfaz explícita evita "objetos mágicos" sin tipo.
interface HtmlIconStates {
    default?:    string;
    actived?:   string;
    hover?:     string;
    inactived?: string;
}

// Estructura agrupadora con varios mapas
interface HtmlElements {
  btn:  Object;
  icon: HtmlIconStates;
  label: string;
}


type ButtonVariantMap = Record<ButtonIconVariant, HtmlElements>;


const BOOTSTRAP_STYLE_BTN_CIRCLE = "btn d-flex align-items-center justify-content-center rounded-circle border-0";

export const BOOTSTRAP_STYLES: ButtonVariantMap = {
  like: {
    btn: BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: {
        actived: "bi bi-heart-fill",
        inactived: "bi bi-heart"
    },
    label: "",
  },
  home:  {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        default: "bi bi-house-fill",
    }, 
    label: "INICIO",
  },
  search: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        default: "bi bi-search",
    }, 
    label: "BUSCAR",
  },
  sell: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon:{ 
        default: "bi bi-plus-lg",
    },
    label: "VENDER",
  },
  message: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon:{ 
        default: "bi bi-plus-lg",
    },  
    label: "MENSAJES",
  },
  profile: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon:{ 
        default: "bi bi-person-fill",
    },
    label: "PERFIL",
  },
  star: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-star-fill",
        inactived: "bi bi-star",
    }, 
    label: "",
  },
  pencil: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        default: "bi bi-pen",
    }, 
    label: "",
  },
  trash: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        default: "bi bi-trash3",
    }, 
    label: "",
  },
  clip: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        default: "bi bi-paperclip",
    }, 
    label: "",
  },
  bell: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-bell-fill",
        inactived: "bi bi-bell",
    }, 
    label: "",
  },
  microphone: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        default: "bi bi-mic",
    }, 
    label: "",
  },
  photo: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        default: "bi bi-camera",
    }, 
    label: "",
  },
  'arrow-left': {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        default: "bi bi-arrow-left",
    }, 
    label: "",
  },
  'arrow-right': {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        default: "bi bi-arrow-right",
    }, 
    label: "",
  },
  'arrow-left-circle': {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        default: "bi bi-arrow-left",
    }, 
    label: "",
  },
  'arrow-right-circle': {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        default: "bi bi-arrow-right",
    }, 
    label: "",
  }
}