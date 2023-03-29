export type IComponentShapeType =
  "rect" |
  "parallelogram" |
  "rhombus" |
  "line" |
  "arrows" |
  "text" |
  "circle" |
  "oval" |
  "annular" |
  "pentagon" |
  "hexagon" |
  "fivestar" |
  "trapezium" |
  "fan" |
  "heart" |
  "canvas" |
  "board" |
  ""

export interface IComponentShape {
  name: string
  icon: string
  type: IComponentShapeType
}


export type IComponentShapeTypeMap = {
  [k: string]: IComponentShapeType
}