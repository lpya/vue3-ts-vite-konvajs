import { IComponentShape, IComponentShapeTypeMap } from "../@types/index"

export const componentShapeType: IComponentShapeTypeMap = {
  RECT: "rect",
  PARALLELOGRAM: "parallelogram",
  RHOMBUS: "rhombus",
  LINE: "line",
  ARROWS: "arrows",
  TEXT: "text",
  CIRCLEL: "circle",
  OVAL: "oval",
  ANNULAR: "annular",
  PENTAGON: "pentagon",
  HEXAGON: "hexagon",
  FIVESTAR: "fivestar",
  TRAPEZIUM: "trapezium",
  FAN: "fan",
  HEART: "heart",
  CANVAS: "canvas",
  BOARD: "board"
}

export const componentShapeList: IComponentShape[] = [
  { name: "矩形", icon: "icon-juxing", type: componentShapeType.RECT },
  { name: "平行四边形", icon: "icon-tx-pinghangsibianxing", type: componentShapeType.PARALLELOGRAM },
  { name: "菱形", icon: "icon-tubiao", type: componentShapeType.RHOMBUS },
  { name: "直线", icon: "icon-line", type: componentShapeType.LINE },
  { name: "箭头", icon: "icon-xiaoyoujiantou", type: componentShapeType.ARROWS },
  { name: "文本", icon: "icon-wenben", type: componentShapeType.TEXT },
  { name: "圆形", icon: "icon-yuanxingweixuanzhong", type: componentShapeType.CIRCLEL },
  { name: "椭圆", icon: "icon-tuoyuanxing", type: componentShapeType.OVAL },
  { name: "环形", icon: "icon-huanxingtu", type: componentShapeType.ANNULAR },
  { name: "五边形", icon: "icon-pentagon", type: componentShapeType.PENTAGON },
  { name: "六边形", icon: "icon-tx-liubianxing", type: componentShapeType.HEXAGON },
  { name: "五角星", icon: "icon-wujiaoxing", type: componentShapeType.FIVESTAR },
  { name: "梯形", icon: "icon-tx-tixing", type: componentShapeType.TRAPEZIUM },
  { name: "扇形", icon: "icon-shanxing", type: componentShapeType.FAN },
  { name: "心形", icon: "icon-heart", type: componentShapeType.HEART },
]