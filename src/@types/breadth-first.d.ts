import Konva from "konva"

export interface IBreadthFirstState {
  stage: Konva.Stage | null
  timer: NodeJS.Timer
}

export interface IRectangle {
  x: number
  y: number
  parent?: string
}

export interface IPathMap {
  [k: string]: IRectangle
}

export interface IGridMap {
  [k: string]: Konva.Node<Konva.NodeConfig>
}