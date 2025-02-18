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
  insert(value){
    return this.#insert(this.root, value);
  }
  #insert(root, value){
    if (root === null){
      root = new Node(value);
      return root;
    };
    if (root.data === value){
      return root;
    };
    if (root.data > value){
      root.left = this.#insert(root.left,value);
    }
    else if (root.data < value){
      root.right = this.#insert(root.right, value);
    }
    return root;
  }
  delete(value){
    return this.#delete(this.root, value);
  }
  #delete(root, value){
    if (root.data === null){
      return root;
    }
    if (root.data > value){
      root.left = this.#delete(root.left,value);
    }
    else if (root.data < value){
      root.right = this.#delete(root.right, value);
    }
    else {
      if (root.left === null){
        return root.right
      }
      if (root.right === null){
        return root.left;
      }
      let temp = root.right;
      while (temp !== null && temp.left !== null){
        temp = temp.left 
      }
      root.data = temp.data; 
      root.right = this.#delete(root.right, temp.data);
    }
    return root;
  };
  find(value){
    return this.#find(this.root, value);
  }
  #find(root, value){
    if (root === null){
      return null;
    }
    if (root.data === value){
      return root;
    }
    else {
      let found = this.#find(root.left, value);
      if (found === null){
        found = this.#find(root.right, value);
      }
      return found;
    }
  }
}