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
  build(arr){
    if (!this.checkSorted(arr)){
      const newArray = [...new Set(this.mergeSort(arr))]
      return this.buildTree(newArray, 0, newArray.length - 1);
    }
    else {
      return this.buildTree(arr, 0, arr.length - 1)
    }
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

  insert(value, root = this.root){
    if (root === null){
      root = new Node(value);
      return root;
    };
    if (root.data === value){
      return root;
    };
    if (root.data > value){
      root.left = this.insert(value, root.left);
    }
    else if (root.data < value){
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  delete(value, root = this.root){
    if (root.data === null){
      return root;
    }
    if (root.data > value){
      root.left = this.delete(value, root.left);
    }
    else if (root.data < value){
      root.right = this.delete(value, root.right);
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
      root.right = this.delete(temp.data, root.right);
    }
    return root;
  };

  find(value, root = this.root){
    if (root === null){
      return null;
    }
    if (root.data === value){
      return root;
    }
    else {
      let found = this.find(value, root.left);
      if (found === null){
        found = this.find(value, root.right);
      }
      return found;
    }
  }

  levelOrder(collectNodes){
    let queue = [];
    if (this.root === null) {
      return;
    }
    if (collectNodes === undefined){
      throw new Error ("Callback is needed")
    }
    queue.push(this.root);
    while (queue.length > 0){
      let current = queue[0]
      collectNodes(current);
      if (current.left !== null){queue.push(current.left)};
      if (current.right !== null){queue.push(current.right)};
      queue.shift();
    }
  }

  inOrder(collectNodes, root = this.root){
    if (root === null){
      return;
    }
    if (collectNodes === undefined){
      throw new Error ("Callback is needed")
    }
    this.inOrder(collectNodes, root.left)
    collectNodes(root);
    this.inOrder(collectNodes, root.right)
  }

  preOrder(collectNodes, root = this.root){
    if (root === null){
      return;
    }
    if (collectNodes === undefined){
      throw new Error ("Callback is needed")
    }
    collectNodes(root);
    this.postOrder(collectNodes, root.left)
    this.postOrder(collectNodes, root.right)
  }

  postOrder(collectNodes, root = this.root){
    if (root === null){
      return;
    }
    if (collectNodes === undefined){
      throw new Error ("Callback is needed")
    }
    this.postOrder(collectNodes, root.left)
    this.postOrder(collectNodes, root.right)
    collectNodes(root);
  }
  depth(node, root = this.root, depth = 0){
    if (root === null){
      return -1;
    };
    if (root.data === node){
      return depth;
    }
    else {
    let left = this.depth(node, root.left, depth + 1);
    let right = this.depth(node, root.right, depth + 1);
    if (left === -1){
      return right;
    }
    else{
      return left;
    };
  };
  };

  #postOrderHeight(root){
    if (root === null){
      return -1;
    }
    let left = this.#postOrderHeight(root.left);
    let right = this.#postOrderHeight(root.right);
    return Math.max(left, right) + 1;
  };
  height(node){
    let found = this.find(node);
    let height = this.#postOrderHeight(found);
    return height;
  };

  isBalanced(){
    let left = this.#postOrderHeight(this.root.left);
    let right = this.#postOrderHeight(this.root.right);
    if (Math.abs(left - right) <= 1){
      return true;
    }
    else{
      return false;
    }
  }
  checkSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
  }
  rebalance(){
    let array = []
    this.inOrder((node) => array.push(node.data));
    this.build(array);
  }
};