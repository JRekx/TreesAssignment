/** 
 * Represents a node in a binary tree. 
 * Generally, binary trees can have a maximum of two children.
 */
class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left; 
    this.right = right;
  }
}

/**
 * Represents a binary tree data structure.
 */
class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /**
   * Calculates the minimum depth of the tree (length of the shortest root-to-leaf path).
   */
  minDepth() {
    if (!this.root) return 0;

    function minDepthHelper(node) {
      if (node.left === null && node.right === null) return 1; // Base case: leaf node

      // Handle cases with only one child (optimization)
      if (node.left === null) return minDepthHelper(node.right) + 1; 
      if (node.right === null) return minDepthHelper(node.left) + 1;

      return Math.min(minDepthHelper(node.left), minDepthHelper(node.right)) + 1;
    }

    return minDepthHelper(this.root);
  }

  /**
   * Calculates the maximum depth of the tree (length of the longest root-to-leaf path).
   */
  maxDepth() { 
    if (!this.root) return 0;

    function maxDepthHelper(node) {
      if (node.left === null && node.right === null) return 1;

      // Handle cases with only one child (optimization)
      if (node.left === null) return maxDepthHelper(node.right) + 1;
      if (node.right === null) return maxDepthHelper(node.left) + 1;

      return Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right)) + 1;
    }

    return maxDepthHelper(this.root);
  }

  /**
   * Finds the maximum sum path within the tree (not necessarily starting from the root).
   */
  maxSum() {
    let result = 0; 

    function maxSumHelper(node) {
      if (!node) return 0; // Corrected: node === null -> !node

      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);

      // Update the global result
      result = Math.max(result, node.val + leftSum + rightSum);

      // Return the best possible sum extending from the current node
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSumHelper(this.root);
    return result;
  }

  /**
   * Finds the smallest value in the tree larger than the given lowerBound.
   */
  nextLarger(lowerBound) {
    if (!this.root) return null;

    // Use BFS for better efficiency in most cases
    let queue = [this.root];
    let closest = null;

    while (queue.length) {
      let currentNode = queue.shift();
      let currentVal = currentNode.val;

      if (currentVal > lowerBound && (currentVal < closest || closest === null)) {
        closest = currentVal;
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return closest;
  }

  /**
   * Determines if two nodes are cousins (same level, different parents).
   */
  areCousins(node1, node2) {
    if (!this.root) return false; // Handle empty tree case

    function findLevelParent(nodeToFind, currentNode, level = 0, data = { level: 0, parent: null }) {
      if (data.parent) return data; 

      if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }

      if (currentNode.left) {
        findLevelParent(nodeToFind, currentNode.left, level + 1, data);
      } 

      if (currentNode.right) { // Search the right subtree as well
        findLevelParent(nodeToFind, currentNode.right, level + 1, data);
      }

      return data; 
    }

    let node1Info = findLevelParent(node1, this.root);
    let node2Info = findLevelParent(node2, this.root);

    return (
      node1Info &&
      node2Info &&
      node1Info.level === node2Info.level &&
      node1Info.parent !== node2Info.parent
    );
  }

  /**
   * Serializes the tree into a string representation.
   */
  static serialize(tree) {
    const values = [];

    function traverse(node) {
      if (node) {
        values.push(node.val);
        traverse(node.left);
        traverse(node.right);
      } else {
        values.push("#"); 
      }
    }

    traverse(tree.root);
    return values.join(",");
  }

  /**
   * Deserializes a string representation into a BinaryTree object.
   */
  static deserialize(stringTree) {
    if (!stringTree) return null;

    const values = stringTree.split(",");

    function buildTree() {
      if (values.length) {
        const currentVal = values.shift();

        if (currentVal === "#") return null;

        let currentNode = new BinaryTreeNode(+currentVal);
        currentNode.left = buildTree();
        currentNode.right = buildTree();

        return currentNode;
      }
    }

    const root = buildTree();
    return new BinaryTree(root);
  }

  /**
   * Finds the lowest common ancestor (LCA) of two given nodes.
   */
  lowestCommonAncestor(node1, node2, currentNode = this.root) {
    if (!currentNode) return null; 

    if (currentNode === node1 || currentNode === node2) return currentNode;

    const left = this.lowestCommonAncestor(node1, node2, currentNode.left);
    const right = this.lowestCommonAncestor(node1, node2, currentNode.right);

    if (left && right) return currentNode; // LCA found
    return left || right; // Return the side where a node is found
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
