import { Models, Ages, Mind, EyesShape, HairSize, Genital, GenitalSize, Skin, Figure, FigureSize, Period, Times, Weathers } from "./cons_reqEnum";
import { ModelsTypes, AgesTypes, MindTypes, EyesShapeTypes, HairSizeTypes, GenitalTypes, GenitalSizeTypes, SkinTypes, FigureTypes, FigureSizeTypes, PeriodTypes, TimesTypes, WeathersTypes } from "./cons_requestTypes";
// =========+=========+=========+=========+=========+=========+=========+=========+=========+=========+
// constants request data
// +~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~+~~~~~~~~~


// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
// Cons:Index
// +=========+=========+=========+=========+=========+=========+=========+=========+=========+=========
export const getModelsType       = (enums:number) => Object.values(Models     ).includes(enums as ModelsTypes     ) ? enums as ModelsTypes      : Models     .Undefined
export const getAgesTypes        = (enums:number) => Object.values(Ages       ).includes(enums as AgesTypes       ) ? enums as AgesTypes        : Ages       .Undefined
export const getMindTypes        = (enums:number) => Object.values(Mind       ).includes(enums as MindTypes       ) ? enums as MindTypes        : Mind       .Undefined
export const getEyesShapeTypes   = (enums:number) => Object.values(EyesShape  ).includes(enums as EyesShapeTypes  ) ? enums as EyesShapeTypes   : EyesShape  .Undefined
export const getHairSizeTypes    = (enums:number) => Object.values(HairSize   ).includes(enums as HairSizeTypes   ) ? enums as HairSizeTypes    : HairSize   .Undefined
export const getSkinTypes        = (enums:number) => Object.values(Skin       ).includes(enums as SkinTypes       ) ? enums as SkinTypes        : Skin       .Undefined
export const getFigureTypes      = (enums:number) => Object.values(Figure     ).includes(enums as FigureTypes     ) ? enums as FigureTypes      : Figure     .Undefined
export const getFigureSizeTypes  = (enums:number) => Object.values(FigureSize ).includes(enums as FigureSizeTypes ) ? enums as FigureSizeTypes  : FigureSize .Undefined
export const getGenitalTypes     = (enums:number) => Object.values(Genital    ).includes(enums as GenitalTypes    ) ? enums as GenitalTypes     : Genital    .Undefined
export const getGenitalSizeTypes = (enums:number) => Object.values(GenitalSize).includes(enums as GenitalSizeTypes) ? enums as GenitalSizeTypes : GenitalSize.Undefined
export const getPeriodTypes      = (enums:number) => Object.values(Period     ).includes(enums as PeriodTypes     ) ? enums as PeriodTypes      : Period     .Undefined
export const getTimesTypes       = (enums:number) => Object.values(Times      ).includes(enums as TimesTypes      ) ? enums as TimesTypes       : Times      .Undefined
export const getWeathersTypes    = (enums:number) => Object.values(Weathers   ).includes(enums as WeathersTypes   ) ? enums as WeathersTypes    : Weathers   .Undefined
