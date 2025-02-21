import {Tree} from "./tree.mjs"

// Create an array of random numbers
function generateRandomArray(size, maxValue = 100) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * maxValue));
  }
  return arr;
}

// Driver script
const tree = new Tree();

// Create a tree from a random array
let randomNumbers = generateRandomArray(15);
tree.build(randomNumbers);

// Check if the tree is balanced
console.log("Is the tree balanced?", tree.isBalanced());

// Print the elements in different traversal orders using callbacks
let arr = [];
console.log("Level Order:");
tree.levelOrder((node) => arr.push(node.data));
console.log(arr);

arr = [];
console.log("Pre Order:");
tree.preOrder((node) => arr.push(node.data));
console.log(arr);

arr = [];
console.log("Post Order:");
tree.postOrder((node) => arr.push(node.data));
console.log(arr);

arr = [];
console.log("In Order:");
tree.inOrder((node) => arr.push(node.data));
console.log(arr);

// Unbalance the tree by adding several numbers > 100
console.log("Unbalancing the tree by adding numbers > 100...");
tree.insert(150);
tree.insert(200);
tree.insert(120);
tree.insert(250);

// Check if the tree is unbalanced
console.log("Is the tree balanced after unbalancing?", tree.isBalanced());

// Balance the tree by calling rebalance
console.log("Balancing the tree...");
tree.rebalance();

// Check if the tree is balanced again
console.log("Is the tree balanced after rebalancing?", tree.isBalanced());

// Print the elements again in all traversal orders
arr = [];
console.log("Level Order after balancing:");
tree.levelOrder((node) => arr.push(node.data));
console.log(arr);

arr = [];
console.log("Pre Order after balancing:");
tree.preOrder((node) => arr.push(node.data));
console.log(arr);

arr = [];
console.log("Post Order after balancing:");
tree.postOrder((node) => arr.push(node.data));
console.log(arr);

arr = [];
console.log("In Order after balancing:");
tree.inOrder((node) => arr.push(node.data));
console.log(arr);
