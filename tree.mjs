import { Node } from "./node.mjs";

export class Tree{
  constructor(){
    this.root = null;
  }
  buildTree(arr, start, end){
    if (start > end) return null;
    let middle = start + Math.floor((end - start)/ 2);
    let root = new Node(arr[middle]);
    root.left = this.buildTree(arr, start, middle - 1);
    root.right = this.buildTree(arr, middle + 1, end);
    this.root = root;
    return root;
  };
  build(array){
    const newArray = [...new Set(this.mergeSort(array))]
    return this.buildTree(newArray, 0, newArray.length - 1)
  };
  prettyPrint(node, prefix = "", isLeft = true){
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  mergeSort(array, mergedArray = []){
    if (array.length <= 1) {
        return array;
    };
    const midPoint = Math.ceil(array.length / 2);
    const leftArray = this.mergeSort(array.slice(0, midPoint));
    const rightArray = this.mergeSort(array.slice(midPoint, array.length));
    while (leftArray.length > 0 || rightArray.length > 0){
        if (leftArray.length === 0){
            mergedArray.push(...rightArray);
            break;
        }
        else if (rightArray.length === 0){
            mergedArray.push(...leftArray);
            break;
        };
        if (leftArray[0] < rightArray[0]) {
            mergedArray.push(leftArray[0]);
            leftArray.shift();
        }
        else if (leftArray[0] > rightArray[0]){
            mergedArray.push(rightArray[0]);
            rightArray.shift();
        }
        else if (leftArray[0] === rightArray[0]){
          leftArray.shift();
        };
    }
    return mergedArray;
  };
}