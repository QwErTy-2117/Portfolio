declare module "poly-decomp" {
  export function decomp(polygon: number[][]): number[][][]
  export function quickDecomp(polygon: number[][]): number[][][]
  export function isSimple(polygon: number[][]): boolean
  export function removeCollinearPoints(polygon: number[][], thresholdAngle?: number): number
  export function removeDuplicatePoints(polygon: number[][], tolerance?: number): number
  export function makeCCW(polygon: number[][]): void
  const polyDecomp: {
    decomp: typeof decomp
    quickDecomp: typeof quickDecomp
    isSimple: typeof isSimple
    removeCollinearPoints: typeof removeCollinearPoints
    removeDuplicatePoints: typeof removeDuplicatePoints
    makeCCW: typeof makeCCW
  }
  export default polyDecomp
}
